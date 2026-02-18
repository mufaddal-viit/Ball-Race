# Ball Race API

Express backend for Ball Race using Prisma + MongoDB.

## Setup

1. Copy `.env.example` to `.env`.

2. Install dependencies:
```bash
npm install
```

3. Configure `.env`:
- `DATABASE_URL`
- `JWT_SECRET`
- optional: `PORT`, `JWT_EXPIRES_IN`

4. Generate Prisma client and sync schema:
```bash
npm run prisma:generate
npm run prisma:push
```

5. Start API:
```bash
npm run dev
```

## Endpoints

- `GET /health`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me` (Bearer token required)

## Example payloads

Register:
```json
{
  "username": "playerOne",
  "email": "player@example.com",
  "password": "strongpass123"
}
```

Login:
```json
{
  "email": "player@example.com",
  "password": "strongpass123"
}
```
