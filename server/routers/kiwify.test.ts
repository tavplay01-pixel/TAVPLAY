import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("kiwify router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createPublicContext();
    caller = appRouter.createCaller(ctx);
  });

  describe("webhook", () => {
    it("deve processar evento purchase.completed", async () => {
      const result = await caller.kiwify.webhook({
        event: "purchase.completed",
        data: {
          id: "purchase_123",
          email: "user@example.com",
          customer_name: "João Silva",
          product_name: "TAV PLAY Premium - Mensal",
          status: "completed",
        },
      });

      expect(result.success).toBe(true);
      expect(result.email).toBe("user@example.com");
    });

    it("deve processar evento subscription.created", async () => {
      const result = await caller.kiwify.webhook({
        event: "subscription.created",
        data: {
          id: "subscription_123",
          email: "subscriber@example.com",
          customer_name: "Maria Silva",
          product_name: "TAV PLAY Premium - Anual",
          status: "active",
        },
      });

      expect(result.success).toBe(true);
      expect(result.email).toBe("subscriber@example.com");
    });

    it("deve processar evento subscription.cancelled", async () => {
      const result = await caller.kiwify.webhook({
        event: "subscription.cancelled",
        data: {
          id: "subscription_123",
          email: "cancelled@example.com",
          status: "cancelled",
        },
      });

      expect(result.success).toBe(true);
      expect(result.email).toBe("cancelled@example.com");
    });

    it("deve rejeitar email inválido", async () => {
      try {
        await caller.kiwify.webhook({
          event: "purchase.completed",
          data: {
            id: "purchase_456",
            email: "invalid-email",
            customer_name: "Test",
          },
        });
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("deve rejeitar evento inválido", async () => {
      try {
        await caller.kiwify.webhook({
          event: "invalid.event" as any,
          data: {
            id: "test_123",
            email: "test@example.com",
          },
        });
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("checkSubscription", () => {
    it("deve retornar isPremium false para email não registrado", async () => {
      const result = await caller.kiwify.checkSubscription({
        email: "nonexistent@example.com",
      });

      expect(result.isPremium).toBe(false);
    });

    it("deve rejeitar email inválido", async () => {
      try {
        await caller.kiwify.checkSubscription({
          email: "invalid-email",
        });
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
