# React Todo-app

En enkel Todo-app med React, Vite och JSON Server. Appen visar även väder för Stockholm från Open-Meteo.

## Funktioner

- Hämta uppgifter från ett lokalt API
- Lägga till uppgifter
- Markera uppgifter som slutförda
- Ta bort uppgifter
- Filtrera mellan alla, aktiva och slutförda uppgifter
- Visa antal uppgifter
- Visa loading-, error- och empty-lägen
- Växla knapptext med en enkel A/B-variant
- Visa aktuellt väder för Stockholm
- Visa ett enkelt klädtips utifrån temperatur och väder

## Installera och starta

```bash
npm install
```

Starta JSON Server i den första terminalen:

```bash
npm run server
```

Starta React-appen i en andra terminal:

```bash
npm run dev
```

Öppna adressen som Vite visar, vanligtvis `http://localhost:5173`.

## Tester

```bash
npm test              # alla Vitest-tester (unit, component, MSW)
npm run test:coverage # täckningsrapport → coverage/index.html
npm run test:e2e      # Playwright E2E (startar JSON Server + Vite automatiskt)
npm run lint          # ESLint
```

För E2E, installera Chromium en gång:

```bash
npx playwright install chromium
```

### Senaste resultat (2026-09-13)

| Kommando | Resultat |
|---|---|
| `npm test` | 8 filer, **46 tester** — alla gröna |
| `npm run test:e2e` | 3 E2E-tester (create, filter, live väder) |
| `npm run lint` | Inga fel |

Testnivåer:

- **Unit:** `taskUtils`, `weatherUtils` (23 tester)
- **Component (RTL):** `TodoForm`, `TodoItem`, `TodoList` (10 tester)
- **Integration (MSW):** `taskApi`, `weatherApi`, `WeatherSection` (13 tester)
- **E2E (Playwright):** `e2e/*.spec.js` — samma flöden som manuella testfall 1–3

Mer dokumentation finns i [`Documentation/`](Documentation/):

- [`Test-Plan.md`](Documentation/Test-Plan.md)
- [`Manual-Test-Cases.md`](Documentation/Manual-Test-Cases.md)
- [`Test-Analysis-Report.md`](Documentation/Test-Analysis-Report.md)

## A/B-variant

Kopiera `.env.example` och döp kopian till `.env`.

```env
VITE_BUTTON_VARIANT=A
```

- `A` visar **Lägg till**.
- `B` visar **Skapa uppgift**.

Starta om React-appen efter att du har ändrat `.env`.
