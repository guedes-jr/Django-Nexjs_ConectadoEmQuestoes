# Django + Next.js — ConectadoEmQuestoes

Projeto fullstack com backend Django (DRF + dj-rest-auth + allauth) e frontend Next.js (App Router). Este README descreve como rodar e configurar localmente, incluindo Google OAuth.

## Estrutura principal
- backend/ — Django project
- frontend/ — Next.js (app router)
- docs/ — instruções (ex: Google_Oauth.md)
- backend/db.sqlite3 — banco SQLite (dev)
- backend/keys/ — chaves locais (não versionar)

## Pré-requisitos
- Python 3.10+
- Node.js 16+
- npm / yarn
- Google Cloud Console (para OAuth)

## Arquivos importantes de configuração
- backend/config/settings/base.py — settings (SITE_ID, CORS, JWT cookies)
- frontend/lib/http.ts (ou /lib/api.ts) — cliente axios com withCredentials
- .env / .env.local — variáveis locais (não commitar)

## Variáveis de ambiente (exemplos)
- DJANGO_SECRET_KEY
- DJANGO_DEBUG=1
- DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
- CORS_ALLOWED_ORIGINS=http://localhost:3000
- CSRF_TRUSTED_ORIGINS=http://localhost:3000
- NEXT_PUBLIC_API_URL=http://localhost:8000

## Setup — Backend
```bash
# filepath: /home/junior/Projects/Django-Nexjs_ConectadoEmQuestoes/readme.md
# entrar na pasta backend e criar venv (se precisar)
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# migrar e criar superuser
python manage.py migrate
python manage.py createsuperuser
```

## Setup — Frontend
```bash
# filepath: /home/junior/Projects/Django-Nexjs_ConectadoEmQuestoes/readme.md
cd frontend
npm install
# ou
yarn
```

## Rodando localmente
- Backend:
```bash
# filepath: /home/junior/Projects/Django-Nexjs_ConectadoEmQuestoes/readme.md
cd backend
source venv/bin/activate
python manage.py runserver
```
- Frontend:
```bash
# filepath: /home/junior/Projects/Django-Nexjs_ConectadoEmQuestoes/readme.md
cd frontend
npm run dev
# ou yarn dev
```

## Google OAuth (passos resumidos)
1. No Google Cloud Console → APIs & Services → Credentials → Create OAuth client (Web application).
2. Authorized JavaScript origins:
   - http://localhost:8000
   - http://localhost:3000
3. Authorized redirect URIs (adicionar exatamente):
   - http://localhost:8000/accounts/google/login/callback/
   - (opcional) http://localhost:8000/api/auth/google/callback/
4. Copiar Client ID/Secret.
5. No Django admin → Social applications:
   - Provider: Google
   - Adicionar Client ID e Secret
   - Associar ao Site (domain `localhost:8000`, id=1)

Erro comum: `redirect_uri_mismatch` — significa que o redirect_uri enviado não está cadastrado exatamente no OAuth client. Copie o redirect_uri exibido no erro e adicione-o à lista de Authorized redirect URIs.

## Cookies, CORS e autenticação
- O backend já tem:
  - CORS_ALLOW_CREDENTIALS = True
  - CORS_ALLOWED_ORIGINS deve incluir `http://localhost:3000`
  - CSRF_TRUSTED_ORIGINS incluir `http://localhost:3000`
- Frontend deve usar axios/fetch com credenciais:
  - axios: withCredentials: true
  - fetch: credentials: "include"
- Recomenda-se checar /api/auth/user/ do backend para validar sessão.

## Frontend — exemplo rápido (autenticação)
- Cliente axios com cookies:
```ts
// filepath: /home/junior/Projects/Django-Nexjs_ConectadoEmQuestoes/readme.md
import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export { http };
```

## Endpoints úteis
- Iniciar OAuth Google (allauth): `/accounts/google/login/` ou `/api/auth/google/`
- Callback: `/accounts/google/login/callback/` ou `/api/auth/google/callback/`
- Usuário autenticado (drf + dj-rest-auth): `/api/auth/user/`
- Logout: `/accounts/logout/`

## Troubleshooting rápido
- SocialApp.DoesNotExist: criar Social Application no Admin e associar Site id=1.
- redirect_uri_mismatch: adicionar redirect_uri exato no Google Console.
- Cookies não enviados: verificar withCredentials, CORS_ALLOW_CREDENTIALS e SameSite/secure dos cookies.
- Se usar SameSite=None, o cookie precisa Secure (HTTPS) — em dev prefira Lax.

## Git
- Há um .gitignore na raiz com entradas para venv, db.sqlite3, keys e node_modules. Não versionar secrets.

## Contribuição / testes
- Executar migrations antes de testar.
- Para testes unitários (backend): python manage.py test

Contato / observações
- Documentação adicional: docs/Google_Oauth.md
- Se persistir erro após essas etapas, cole saídas do terminal e headers da requisição (DevTools → Network) para análise.

## Arquitetura (diagrama Mermaid)

```mermaid
flowchart LR
  A[Usuário<br/>(browser)] -->|acessa| B[Next.js<br/>(frontend: localhost:3000)]
  B -->|redirect para OAuth| C[Backend Django<br/>(allauth / dj-rest-auth)<br/>(localhost:8000)]
  C -->|inicia fluxo OAuth| D[Google OAuth]
  D -->|redirect com code| C
  C -->|cria/valida sessão / cookies (JWT)| A
  C -->|lê/escreve| E[DB SQLite / Users]
  C -->|admin config| F[Django Admin<br/>(SocialApp, Sites)]
  B -->|chama API (withCredentials)| C
  style A fill:#f9f,stroke:#333,stroke-width:1px
  style B fill:#bbf,stroke:#333,stroke-width:1px
  style C fill:#bfb,stroke:#333,stroke-width:1px
  style D fill:#ffd,stroke:#333,stroke-width:1px
  style E fill:#eee,stroke:#333,stroke-width:1px
  style F fill:#fcc,stroke:#333,stroke-width:1px
```

Observações rápidas:
- Frontend deve usar requests com credentials (axios withCredentials ou fetch credentials: "include").
- Backend deve ter CORS_ALLOW_CREDENTIALS = True e redirect URIs exatos no Google Cloud Console.

