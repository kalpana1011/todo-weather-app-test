# Test plan — React Todo + Weather app

## Goal

Verify that the Todo app and Stockholm weather section work as intended without changing product behaviour. Tests are automated (Vitest, RTL, MSW) plus manual checks against the running app.

## Test levels

| Level | Tool | What is tested |
|---|---|---|
| Unit | Vitest | Pure helpers in `taskUtils.js` and `weatherUtils.js` |
| Component | Vitest + React Testing Library | Todo form, list, item — user-visible behaviour with mocked callbacks |
| Integration (MSW) | Vitest + MSW | `taskApi`, `weatherApi`, and `WeatherSection` with mocked JSON Server / Open-Meteo |
| Manual | Browser + JSON Server | End-to-end flows the assignment lists (create, filter, weather display) |

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

**Total:** 46 automated tests (8 files).

## Commands

```bash
npm test              # run all tests once
npm run test:coverage # coverage report (see coverage/index.html)
npm run lint          # ESLint on app and test code
```

Manual tests require:

```bash
npm run server   # terminal 1 — JSON Server on port 3001
npm run dev      # terminal 2 — Vite dev server
```

## Out of scope (documented risks)

- Full browser end-to-end tests with JSON Server and Vite together in CI
- Real Open-Meteo network in automated tests (mocked via MSW)
- `App.jsx`, `FilterButtons`, `TodoSummary` component tests

## Pass criteria (G / VG)

- G: ≥ 6 unit tests, ≥ 1 RTL component test, 2 manual cases, app unchanged
- VG: ≥ 10 distinct unit tests, MSW weather integration test, analysis report, documentation in `Documentation/`
