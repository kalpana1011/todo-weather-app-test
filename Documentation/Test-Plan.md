# Test plan — React Todo + Weather app

## Goal

Verify that the Todo app and Stockholm weather section work as intended without changing product behaviour. Tests are automated (Vitest, RTL, MSW) plus manual checks against the running app.

## Test levels

| Level | Tool | What is tested |
|---|---|---|
| Unit | Vitest | Pure helpers in `taskUtils.js` and `weatherUtils.js` |
| Component | Vitest + React Testing Library | Todo form, list, item — user-visible behaviour with mocked callbacks |
| Integration (MSW) | Vitest + MSW | `taskApi`, `weatherApi`, and `WeatherSection` with mocked JSON Server / Open-Meteo |
| E2E | Playwright | Browser flows with JSON Server + Vite (auto-started); live Open-Meteo for weather smoke test |
| Manual | Browser + JSON Server | Same flows as E2E; documented in `Manual-Test-Cases.md` |

## Automated test files

| File | Type | Tests |
|---|---|---|
| `src/utils/__tests__/taskUtils.test.js` | Unit | 10 |
| `src/utils/__tests__/weatherUtils.test.js` | Unit | 13 |
| `src/components/__tests__/TodoForm.test.jsx` | Component | 4 |
| `src/components/__tests__/TodoItem.test.jsx` | Component | 2 |
| `src/components/__tests__/TodoList.test.jsx` | Component | 4 |
| `src/services/__tests__/taskApi.integration.test.js` | MSW integration | 8 |
| `src/services/__tests__/weatherApi.integration.test.js` | MSW integration | 2 |
| `src/components/__tests__/WeatherSection.integration.test.jsx` | MSW integration | 3 |

| `e2e/create-task.spec.js` | E2E | 1 |
| `e2e/filters.spec.js` | E2E | 1 |
| `e2e/weather.spec.js` | E2E | 1 |

**Total:** 46 Vitest tests (8 files) + 3 Playwright E2E tests.

## Commands

```bash
npm test              # run all Vitest tests once
npm run test:coverage # coverage report (see coverage/index.html)
npm run test:e2e      # Playwright E2E (starts JSON Server + Vite via config)
npm run lint          # ESLint on app and test code
```

E2E uses an isolated `db.e2e.json` (reset from `e2e/fixtures/db.seed.json` before each run). First time on a machine:

```bash
npx playwright install chromium
```

Manual tests (without Playwright) require:

```bash
npm run server   # terminal 1 — JSON Server on port 3001
npm run dev      # terminal 2 — Vite dev server
```

## Out of scope (documented risks)

- Playwright E2E in CI without a browser install step (local runs use `test:e2e`)
- Stable weather assertions in Vitest (Open-Meteo is mocked via MSW; E2E weather uses the live API and may flake on network issues)
- `App.jsx`, `FilterButtons`, `TodoSummary` component tests

## Pass criteria (G / VG)

- G: ≥ 6 unit tests, ≥ 1 RTL component test, 2 manual cases, app unchanged
- VG: ≥ 10 distinct unit tests, MSW weather integration test, analysis report, documentation in `Documentation/`
