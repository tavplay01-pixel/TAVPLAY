# Integração TAV PLAY com Kiwify

## Fluxo de Compra e Acesso

```
1. Usuário acessa TAV PLAY
   ↓
2. Clica em "Assinar Agora" na página Premium
   ↓
3. Redirecionado para Kiwify
   ↓
4. Completa a compra com email
   ↓
5. Kiwify envia webhook para TAV PLAY
   ↓
6. Sistema cria/atualiza usuário como premium
   ↓
7. Usuário faz login com o mesmo email
   ↓
8. Sistema detecta assinatura premium
   ↓
9. Acesso liberado aos jogos premium
```

## Configuração do Webhook Kiwify

### 1. Obter URL do Webhook

O webhook do TAV PLAY está em:
```
https://seu-dominio.com/api/trpc/kiwify.webhook
```

Exemplos:
- Produção: `https://tavplay-vhyuprbk.manus.space/api/trpc/kiwify.webhook`
- Vercel: `https://seu-projeto.vercel.app/api/trpc/kiwify.webhook`

### 2. Configurar no Painel Kiwify

1. Acesse https://kiwify.com/admin
2. Vá para **Configurações** → **Webhooks**
3. Clique em **Adicionar Webhook**
4. Cole a URL do webhook
5. Selecione os eventos:
   - ✅ `purchase.completed` - Compra realizada
   - ✅ `subscription.created` - Assinatura criada
   - ✅ `subscription.updated` - Assinatura atualizada
   - ✅ `subscription.cancelled` - Assinatura cancelada
6. Clique em **Salvar**

### 3. Testar o Webhook

Kiwify fornece um botão "Enviar Teste" para validar a integração.

## Estrutura do Webhook

### Request (Kiwify → TAV PLAY)

```json
{
  "event": "purchase.completed",
  "data": {
    "id": "kiwify_transaction_id",
    "email": "usuario@example.com",
    "customer_name": "João Silva",
    "product_name": "TAV PLAY Premium - Mensal",
    "status": "completed",
    "created_at": "2026-05-05T10:30:00Z"
  }
}
```

### Response (TAV PLAY → Kiwify)

```json
{
  "success": true,
  "message": "Evento purchase.completed processado com sucesso",
  "email": "usuario@example.com"
}
```

## Eventos Suportados

### purchase.completed
Disparado quando uma compra única é concluída.

```json
{
  "event": "purchase.completed",
  "data": {
    "id": "purchase_123",
    "email": "user@example.com",
    "customer_name": "João",
    "product_name": "TAV PLAY Premium - Anual",
    "status": "completed"
  }
}
```

**Ação:** Criar usuário premium ou marcar como premium

### subscription.created
Disparado quando uma assinatura é criada.

```json
{
  "event": "subscription.created",
  "data": {
    "id": "subscription_123",
    "email": "user@example.com",
    "customer_name": "João",
    "product_name": "TAV PLAY Premium - Mensal",
    "status": "active"
  }
}
```

**Ação:** Marcar usuário como premium ativo

### subscription.updated
Disparado quando uma assinatura é atualizada (ex: mudança de plano).

```json
{
  "event": "subscription.updated",
  "data": {
    "id": "subscription_123",
    "email": "user@example.com",
    "status": "active"
  }
}
```

**Ação:** Atualizar status da assinatura

### subscription.cancelled
Disparado quando uma assinatura é cancelada.

```json
{
  "event": "subscription.cancelled",
  "data": {
    "id": "subscription_123",
    "email": "user@example.com",
    "status": "cancelled"
  }
}
```

**Ação:** Remover status premium do usuário

## Fluxo de Acesso Premium

### 1. Usuário Compra

- Usuário clica em "Assinar Agora"
- Redirecionado para Kiwify
- Completa a compra com email: `usuario@example.com`

### 2. Webhook Processado

- Kiwify envia POST para `/api/trpc/kiwify.webhook`
- TAV PLAY recebe evento `purchase.completed`
- Sistema cria usuário com `loginMethod: "kiwify"`
- Email é armazenado no banco de dados

### 3. Usuário Faz Login

- Usuário volta ao TAV PLAY
- Clica em "Entrar"
- Faz login com Facebook/Google/Email: `usuario@example.com`
- Sistema cria conta Manus OAuth

### 4. Sistema Verifica Assinatura

- `PremiumGate` chama `trpc.kiwify.checkSubscription`
- Verifica se email tem `loginMethod: "kiwify"`
- Se sim, libera acesso aos jogos premium

## Banco de Dados

### Tabela users (atualizada)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),  -- 'manus' ou 'kiwify'
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Campos importantes

- `loginMethod = 'kiwify'` → Usuário é premium
- `loginMethod = 'manus'` → Usuário é gratuito
- `email` → Usado para verificar assinatura

## Segurança

### Validação de Webhook

O webhook atual não valida a origem da requisição. Para produção, implemente:

1. **Verificação de Assinatura**
   - Kiwify envia header `X-Kiwify-Signature`
   - Validar usando sua chave secreta

2. **Verificação de IP**
   - Whitelist IPs de Kiwify
   - Rejeitar requisições de outras origens

3. **Rate Limiting**
   - Limitar requisições por IP
   - Evitar duplicação de eventos

### Exemplo de Validação (TODO)

```typescript
import crypto from 'crypto';

function validateKiwifySignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  
  return hash === signature;
}
```

## Troubleshooting

### Webhook não é chamado

1. Verificar URL do webhook
2. Verificar se Kiwify consegue acessar a URL
3. Verificar logs do servidor
4. Usar ferramenta de teste como Postman

### Usuário não consegue acessar após comprar

1. Verificar se email está correto
2. Verificar se webhook foi processado
3. Verificar se usuário fez login com o mesmo email
4. Verificar logs do banco de dados

### Email não corresponde

- Usuário compra com `usuario@gmail.com`
- Faz login com `usuario@hotmail.com`
- Sistema não reconhece como premium

**Solução:** Pedir ao usuário para usar o mesmo email

## Próximos Passos

1. ✅ Implementar webhook
2. ✅ Verificar assinatura no PremiumGate
3. ⏳ Enviar email de boas-vindas
4. ⏳ Implementar validação de assinatura
5. ⏳ Adicionar suporte a múltiplos planos
6. ⏳ Implementar renovação de assinatura
7. ⏳ Adicionar página de gerenciamento de assinatura

## Contato Kiwify

- Documentação: https://kiwify.com/docs
- Suporte: https://kiwify.com/support
- Email: support@kiwify.com
