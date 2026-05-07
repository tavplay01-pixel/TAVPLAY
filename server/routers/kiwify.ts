import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Webhook do Kiwify para processar compras
 * 
 * Fluxo:
 * 1. Usuário compra na Kiwify
 * 2. Kiwify envia POST para /api/trpc/kiwify.webhook
 * 3. Sistema marca usuário como premium
 * 4. Email é enviado com instruções
 */

export const kiwifyRouter = router({
  /**
   * Webhook para processar eventos do Kiwify
   * 
   * Eventos esperados:
   * - purchase.completed: Compra realizada
   * - subscription.created: Assinatura criada
   * - subscription.updated: Assinatura atualizada
   * - subscription.cancelled: Assinatura cancelada
   */
  webhook: publicProcedure
    .input(
      z.object({
        event: z.enum([
          "purchase.completed",
          "subscription.created",
          "subscription.updated",
          "subscription.cancelled",
        ]),
        data: z.object({
          id: z.string(),
          email: z.string().email(),
          customer_name: z.string().optional(),
          product_name: z.string().optional(),
          status: z.string().optional(),
          created_at: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const { event, data } = input;
      const { email, customer_name, id: kiwifyId } = data;

      try {
        // Verificar se usuário existe
        let user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (event === "purchase.completed" || event === "subscription.created") {
          // Marcar como premium
          if (user.length > 0) {
            // Usuário existe, atualizar para premium
            await db
              .update(users)
              .set({
                name: customer_name || user[0].name,
                updatedAt: new Date(),
              })
              .where(eq(users.id, user[0].id));

            // TODO: Enviar email de boas-vindas premium
            console.log(
              `[Kiwify] Usuário ${email} marcado como premium (ID: ${kiwifyId})`
            );
          } else {
            // Usuário não existe, criar novo com status premium
            // Gerar um openId temporário baseado no email
            const tempOpenId = `kiwify_${email.replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}`;

            await db.insert(users).values({
              openId: tempOpenId,
              email,
              name: customer_name || email.split("@")[0],
              loginMethod: "kiwify",
              role: "user",
              createdAt: new Date(),
              updatedAt: new Date(),
              lastSignedIn: new Date(),
            });

            // TODO: Enviar email com link de ativação
            console.log(
              `[Kiwify] Novo usuário criado: ${email} (ID: ${kiwifyId})`
            );
          }
        } else if (event === "subscription.cancelled") {
          // Remover status premium
          if (user.length > 0) {
            await db
              .update(users)
              .set({
                updatedAt: new Date(),
              })
              .where(eq(users.id, user[0].id));

            console.log(`[Kiwify] Assinatura cancelada para ${email}`);
          }
        }

        return {
          success: true,
          message: `Evento ${event} processado com sucesso`,
          email,
        };
      } catch (error) {
        console.error("[Kiwify] Erro ao processar webhook:", error);
        throw new Error(`Erro ao processar webhook: ${error}`);
      }
    }),

  /**
   * Verificar status de assinatura do usuário
   */
  checkSubscription: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        return { isPremium: false };
      }

      try {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, input.email))
          .limit(1);

        if (user.length === 0) {
          return { isPremium: false };
        }

        // TODO: Verificar com Kiwify se a assinatura está ativa
        // Por enquanto, retornar baseado no loginMethod
        const isPremium = user[0].loginMethod === "kiwify";

        return {
          isPremium,
          user: {
            id: user[0].id,
            email: user[0].email,
            name: user[0].name,
          },
        };
      } catch (error) {
        console.error("[Kiwify] Erro ao verificar assinatura:", error);
        return { isPremium: false };
      }
    }),
});
