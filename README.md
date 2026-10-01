# appTemplate

Template full-stack para iniciar novos projetos rapidamente. Já vem com frontend e backend conectados e um login simulado (sem banco de dados), para você começar a prototipar na hora.

Criado por **Gabriel Goes**.

## O que tem dentro

| Pasta | Stack | Descrição |
|---|---|---|
| [`appTemplate-Front`](./appTemplate-Front) | React + Vite + [HeroUI v3](https://heroui.com/en/docs/react/components) | Interface com tema claro/escuro e layout responsivo |
| [`appTemplate-Back`](./appTemplate-Back) | Node + Express | API com health check e login simulado (JWT) |

## Rodando o projeto

Abra dois terminais, um para cada parte.

**Backend** (porta 3000):

```bash
cd appTemplate-Back
npm install
copy .env.example .env.development   # Windows (use "cp" no Linux/Mac)
npm run dev
```

**Frontend** (porta 5173):

```bash
cd appTemplate-Front
npm install
copy .env.example .env.local         # Windows (use "cp" no Linux/Mac)
npm run dev
```

Abra http://localhost:5173, faça login com qualquer e-mail/senha (ou clique em **"Entrar com conta de teste"** na tela de login) e a tela inicial mostra se o front está **conectado ao backend**.

## Como funciona a conexão

1. O front usa o Axios (`src/services/api.js`) apontando para `VITE_API_URL`
2. Ao abrir a tela inicial, ele chama `GET /health` no back
3. Se responder, aparece o status "Conectado ao backend"
4. O login (`POST /login`) é simulado: aceita qualquer credencial e devolve um JWT

## O backend precisa de algo a mais?

Não, para o login simulado funcionar **só precisa do `.env.development`** (passo acima), nada de banco de dados. A `DATABASE_URL` é opcional e só importa quando você for ligar o PostgreSQL de verdade (o pacote `pg` já vem como dependência opcional, pronto pra isso).

Se aparecer um aviso de `DATABASE_URL ausente` no console do back, pode ignorar: é só o log do pool do Postgres avisando que ninguém configurou o banco ainda, o login mockado não depende dele.

## Usando como base de um novo projeto

1. Copie a pasta `appTemplate` com o nome do seu projeto
2. Ajuste os `.env` de cada parte
3. Troque o login simulado por um real quando ligar o banco (ver README do back)

Mais detalhes em cada README: [frontend](./appTemplate-Front/README.md) · [backend](./appTemplate-Back/Readme.md).
