# Vue 3 demo

Transact in inline mode inside a Vue 3 app, using `@atomicfi/transact-javascript`.

## Setup

Node 20.19 or later (`.nvmrc` pins 24).

```
npm install
cp .env.sample .env.local
```

[Create an access token](https://docs.atomicfi.com/reference/api#access-token__create-access-token) and put its `publicToken` in `VITE_PUBLIC_TOKEN`. Public tokens expire, so mint a new one per session. For a sandbox token, also set `VITE_TRANSACT_URL=https://transact-sandbox.atomicfi.com`.

`VITE_COMPANY_ID` is optional. When set, Transact opens on that company's login page instead of search.

## Run

```
npm run dev
```

`npm run build` writes a production build to `dist/`.
