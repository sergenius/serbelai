# Node 22 & Modernization Report — serbelai

**Date:** 2026-07-17  
**Repo:** `sergenius/serbelai`  
**Current stack snapshot:** Vite 5.4 + React 18.3 + Express 4 + TypeScript 5.5 (Bolt Vite React TS starter)  
**Analysis environment:** Node.js `v22.14.0`, npm `10.9.7`

---

## Executive summary

The project has **no pinned Node version** (`engines`, `.nvmrc`, or `.node-version` are missing). The tooling is several major versions behind current npm releases. Moving to **Node 22 LTS** is low-risk for this codebase and is a prerequisite for current Vite (8.x requires `^20.19.0 || >=22.12.0`).

Beyond Node, the highest-impact work is: **pin Node 22**, **stop exposing the Anthropic API key in the browser**, **remove duplicate/legacy EmailJS usage**, **replace the broken `ts-node` server script**, and then **upgrade the frontend toolchain in phases**.

---

## 1. Node.js: current state → Node 22

| Item | Status |
|------|--------|
| `package.json` `engines` | Missing |
| `.nvmrc` / `.node-version` | Missing |
| CI / Docker Node pin | Missing (no `.github/`, no Dockerfile) |
| Runtime compatibility | App code is standard ESM + Express; Node 22 is fine |

### Recommendation

1. Pin Node **22** (Active LTS line; use latest patch, e.g. `22.14+`; Vite 8 wants `>=22.12.0`).
2. Add:
   ```json
   "engines": {
     "node": ">=22.12.0"
   }
   ```
3. Add `.nvmrc` with `22`.
4. Prefer `npm ci` in CI once Node is pinned.
5. Optionally enable `"engineStrict": true` via `.npmrc` (`engine-strict=true`) so installs fail on the wrong Node.

### Risk

**Low.** No native addons, no `node:` polyfill hacks, and Express/Anthropic/EmailJS all support Node 18+. Main follow-on risk is upgrading Vite/ESLint majors that *require* Node 20.19+/22.12+.

---

## 2. Dependency gap analysis

Versions below compare `package.json` ranges (resolved “wanted” / declared) against **latest on npm as of 2026-07-17**.

### Runtime dependencies

| Package | Declared | Latest | Notes |
|---------|----------|--------|-------|
| `react` / `react-dom` | `^18.3.1` | `19.2.7` | Major upgrade; plan separately |
| `@anthropic-ai/sdk` | `^0.18.0` | `0.112.1` | Very stale; API/models likely outdated |
| `express` | `^4.21.1` | `5.2.1` | Express 5 has breaking changes |
| `framer-motion` | `^11.0.8` | `12.42.2` | Major |
| `i18next` | `^23.10.1` | `26.3.6` | Major |
| `i18next-browser-languagedetector` | `^7.2.0` | `8.2.1` | Major |
| `react-i18next` | `^14.1.0` | `17.0.10` | Major; keep in sync with i18next |
| `lucide-react` | `^0.344.0` | `1.25.0` | Major (icon API may change) |
| `dotenv` | `^16.4.5` | `17.4.2` | Major |
| `cors` | `^2.8.5` | `2.8.6` | Patch only |
| `@emailjs/browser` | `^4.4.1` | `4.4.1` | Current |
| `emailjs-com` | `^3.2.0` | `3.2.0` | **Legacy duplicate — remove** |

### Dev / toolchain

| Package | Declared | Latest | Notes |
|---------|----------|--------|-------|
| `vite` | `^5.4.2` | `8.1.5` | Needs Node `^20.19 \|\| >=22.12` |
| `@vitejs/plugin-react` | `^4.3.1` | `6.0.3` | Must track Vite major |
| `typescript` | `^5.5.3` | `7.0.2` | Large jump; validate `tsc` + IDE |
| `tailwindcss` | `^3.4.1` | `4.3.3` | Tailwind v4 is a config/CSS rewrite |
| `eslint` | `^9.9.1` | `10.7.0` | Major |
| `typescript-eslint` | `^8.3.0` | `8.64.0` | Compatible line; bump within major first |
| `eslint-plugin-react-hooks` | `^5.1.0-rc.0` | `7.1.1` | Still on RC pin — replace |
| `tsx` | **not installed** | `4.23.1` | Needed to replace broken `ts-node` script |

### Critical packaging bug

`package.json` script:

```json
"server": "ts-node server/index.ts"
```

**`ts-node` is not a dependency.** The server script is broken as declared. On Node 22 + `"type": "module"`, prefer **`tsx`** (or compile with `tsc` and run `node`).

---

## 3. Security & architecture issues (higher priority than version bumps)

### 3.1 Anthropic API key exposed to the browser (critical)

`src/utils/chatbot.ts` calls Anthropic **from the client** using:

```ts
import.meta.env.VITE_ANTHROPIC_API_KEY
```

Any `VITE_*` variable is bundled into the frontend. That leaks the API key.

There is already a backend route in `server/index.ts` (`POST /api/chat`), but:

- The UI does **not** call it (`Chatbot` → `getChatbotResponse` → browser SDK).
- The server reads `process.env.VITE_ANTHROPIC_API_KEY` instead of a server-only `ANTHROPIC_API_KEY` (`.env.example` already documents `ANTHROPIC_API_KEY`).
- CORS is hardcoded to `http://localhost:5173`.

**Fix direction:**

1. Move all Anthropic calls to `server/`.
2. Frontend calls `VITE_API_URL/api/chat` only.
3. Use `ANTHROPIC_API_KEY` (never `VITE_`) on the server.
4. Update models (current code uses `claude-3-haiku-20240307` / `claude-3-sonnet-20240229` — likely retired or suboptimal).

### 3.2 Duplicate EmailJS stacks

| Location | Library | Env vars |
|----------|---------|----------|
| `App.tsx`, `Contact.tsx` | `@emailjs/browser` | `VITE_EMAILJS_PUBLIC_KEY` |
| `src/utils/email.ts` | `emailjs-com` (legacy) | `VITE_EMAILJS_USER_ID` |

`.env.example` documents `VITE_EMAILJS_PUBLIC_KEY`, not `USER_ID`. `email.ts` looks unused by `Contact.tsx`.

**Fix:** keep `@emailjs/browser`, delete `emailjs-com` + unused `email.ts` (or consolidate), align env names.

### 3.3 Debug leftovers in production UI

`App.tsx` still has:

- `console.log('App component rendering')`
- `<h1>Test Header</h1>`

Remove before any release polish.

### 3.4 Deprecated React DOM API

`Chatbot.tsx` uses `onKeyPress` (deprecated). Prefer `onKeyDown` and check `e.key === 'Enter'`.

---

## 4. Recommended upgrade plan (phased)

### Phase A — Foundation (do first)

1. Pin **Node 22** (`engines`, `.nvmrc`).
2. Add `tsx`; change `"server"` to `tsx server/index.ts`.
3. Fix Anthropic key leakage (proxy via Express).
4. Remove `emailjs-com` + dead email util; unify EmailJS.
5. Remove debug `Test Header` / stray logs.
6. Align `.env.example` with real usage (`ANTHROPIC_API_KEY`, EmailJS public key, `VITE_API_URL`, `PORT`).
7. Refresh lockfile with `npm install` under Node 22.

### Phase B — Toolchain on Node 22 (compatible majors)

Conservative path that stays closer to current patterns:

| Step | Target |
|------|--------|
| Vite | `6.x` or jump to `8.x` if you accept the larger migration |
| `@vitejs/plugin-react` | Match Vite major (`5.x` for Vite 6/7, `6.x` for Vite 8) |
| TypeScript | `5.9.x` first, then evaluate `7.x` |
| ESLint plugins | Replace `eslint-plugin-react-hooks` RC with stable |
| `typescript-eslint` | Latest `8.x` |

**Vite 8 note:** engines require Node `^20.19.0 || >=22.12.0` — another reason to pin Node 22 now.

### Phase C — Framework majors (separate PRs)

1. **React 18 → 19** (+ `@types/react` 19).
2. **i18next / react-i18next / language detector** majors together.
3. **framer-motion** 11 → 12.
4. **lucide-react** 0.x → 1.x (audit icon imports).
5. **Express** 4 → 5 (type updates, middleware/`req`/`res` behavior).
6. **Tailwind** 3 → 4 (config format, PostCSS setup, class changes).
7. **@anthropic-ai/sdk** 0.18 → current + current Claude model IDs.

Do not combine Tailwind 4 + React 19 + Vite 8 + Express 5 in one PR.

### Phase D — Project hygiene

- Add README with Node 22 requirement and `dev` / `server` scripts.
- Add GitHub Actions: `node-version: 22`, `npm ci`, `npm run lint`, `npm run build`.
- Add `engines` check in CI.
- Consider splitting frontend/backend packages if the Express API grows.
- Add typecheck script: `"typecheck": "tsc -b --noEmit"`.

---

## 5. Suggested target `package.json` pins (Phase A + B sketch)

```json
{
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "server": "tsx server/index.ts",
    "typecheck": "tsc -b --noEmit"
  }
}
```

Add as `devDependency`: `tsx`, `@types/node`.  
Remove: `emailjs-com`.  
Move `@anthropic-ai/sdk` usage to server-only (can remain a root dependency, but must not be imported from `src/`).

---

## 6. Verification checklist (after upgrades)

- [ ] `node -v` ≥ 22.12
- [ ] `npm ci` succeeds
- [ ] `npm run lint` passes
- [ ] `npm run build` produces `dist/`
- [ ] `npm run server` starts Express without `ts-node`
- [ ] Chatbot works via `/api/chat` with **no** Anthropic key in client bundle (`grep` `dist` for key material)
- [ ] Contact form sends via `@emailjs/browser`
- [ ] i18n (en/es/pt) still switches correctly
- [ ] No `Test Header` in UI

---

## 7. Priority matrix

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| P0 | Stop browser Anthropic key usage | Small–medium | Security |
| P0 | Pin Node 22 + fix `server` script (`tsx`) | Small | Correctness / DX |
| P0 | Remove EmailJS duplicate / env mismatch | Small | Reliability |
| P1 | Remove debug UI leftovers | Tiny | Polish |
| P1 | Upgrade Vite (+ plugin) under Node 22 | Medium | Tooling / security |
| P2 | React 19 + i18n majors | Medium | Currency |
| P2 | Anthropic SDK + model IDs | Medium | API longevity |
| P3 | Express 5, Tailwind 4, TypeScript 7 | Medium–large | Currency / migration cost |
| P3 | CI + README + engines enforcement | Small | Team hygiene |

---

## 8. Conclusion

**Moving to Node 22 is recommended and should be done first** — it is required by modern Vite and unblocks the rest of the modernization path. The project is not blocked by Node itself; it is blocked by missing version pins, a broken server runner, a critical API-key exposure, and multi-major dependency lag from the original Bolt starter.

Suggested sequence: **Node 22 pin → security/API proxy fix → cleanup duplicates → Vite/TS toolchain → framework majors in isolated PRs.**

---

## 9. Implementation status (this PR)

Completed in this branch:

- [x] Pin Node 22 via `engines` + `.nvmrc`
- [x] Replace broken `ts-node` server script with `tsx`
- [x] Proxy Anthropic through Express (`ANTHROPIC_API_KEY`); client uses `VITE_API_URL/api/chat`
- [x] Remove legacy `emailjs-com` + unused `src/utils/email.ts`
- [x] Align `.env.example`
- [x] Remove debug `Test Header` / console noise from `App.tsx`
- [x] Replace deprecated `onKeyPress` with `onKeyDown` in Chatbot
- [x] Upgrade Vite 5 → 6, TypeScript → 5.9, Anthropic SDK → current, ESLint hooks off RC
- [x] Add `typecheck` script

Deferred (separate PRs):

- [ ] React 19
- [ ] Tailwind 4
- [ ] Express 5
- [ ] i18next / framer-motion / lucide majors
- [ ] Vite 8 + TypeScript 7
- [ ] CI workflow
