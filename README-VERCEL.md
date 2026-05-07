# TAV PLAY - Deploy na Vercel

## Instruções de Deploy

### 1. Preparar o GitHub

```bash
# Criar um novo repositório no GitHub
# Ir para https://github.com/new

# No seu computador, faça:
git remote add origin https://github.com/SEU_USUARIO/tav-play.git
git branch -M main
git push -u origin main
```

### 2. Conectar à Vercel

1. Acesse https://vercel.com/new
2. Clique em "Import Git Repository"
3. Selecione o repositório `tav-play`
4. Clique em "Import"

### 3. Configurar Variáveis de Ambiente

Na página de configuração do Vercel, adicione as seguintes variáveis de ambiente:

```
DATABASE_URL=seu_banco_de_dados_mysql
JWT_SECRET=sua_chave_secreta
VITE_APP_ID=seu_app_id_manus
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OWNER_OPEN_ID=seu_owner_id
OWNER_NAME=seu_nome
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=sua_api_key
VITE_FRONTEND_FORGE_API_KEY=sua_frontend_key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_ANALYTICS_ENDPOINT=seu_analytics_endpoint
VITE_ANALYTICS_WEBSITE_ID=seu_website_id
VITE_APP_TITLE=TAV PLAY
VITE_APP_LOGO=sua_logo_url
```

### 4. Deploy

Clique em "Deploy" e aguarde o build completar.

### 5. Configurar Domínio Customizado (Opcional)

1. Na página do projeto no Vercel
2. Vá para "Settings" → "Domains"
3. Adicione seu domínio customizado
4. Configure os registros DNS conforme instruído

## Estrutura do Projeto

```
tav-play/
├── client/              # Frontend React + Vite
├── server/              # Backend Express + tRPC
├── drizzle/             # Schema e migrações do banco
├── scripts/             # Scripts de seed
├── shared/              # Tipos compartilhados
├── package.json         # Dependências
├── vercel.json          # Configuração Vercel
└── tsconfig.json        # Configuração TypeScript
```

## Variáveis de Ambiente Necessárias

### Database
- `DATABASE_URL` - String de conexão MySQL/TiDB

### Autenticação Manus
- `VITE_APP_ID` - ID da aplicação
- `OAUTH_SERVER_URL` - URL do servidor OAuth
- `VITE_OAUTH_PORTAL_URL` - URL do portal OAuth
- `JWT_SECRET` - Chave para assinar JWT

### Owner
- `OWNER_OPEN_ID` - OpenID do proprietário
- `OWNER_NAME` - Nome do proprietário

### APIs Manus
- `BUILT_IN_FORGE_API_URL` - URL da API
- `BUILT_IN_FORGE_API_KEY` - Chave da API (servidor)
- `VITE_FRONTEND_FORGE_API_KEY` - Chave da API (frontend)
- `VITE_FRONTEND_FORGE_API_URL` - URL da API (frontend)

### Analytics
- `VITE_ANALYTICS_ENDPOINT` - Endpoint de analytics
- `VITE_ANALYTICS_WEBSITE_ID` - ID do website

### Branding
- `VITE_APP_TITLE` - Título da aplicação
- `VITE_APP_LOGO` - URL da logo

## Troubleshooting

### Build falha com erro de TypeScript
- Verifique se todas as variáveis de ambiente estão configuradas
- Rode `pnpm check` localmente para verificar erros

### Banco de dados não conecta
- Verifique a string `DATABASE_URL`
- Certifique-se que o banco está acessível da Vercel
- Adicione o IP da Vercel ao whitelist do banco

### Autenticação não funciona
- Verifique os valores de `VITE_APP_ID` e `OAUTH_SERVER_URL`
- Certifique-se que o callback URL está registrado no Manus OAuth

## Suporte

Para mais informações sobre Vercel, visite: https://vercel.com/docs
