# Test analysis report

**Project:** React Todo + Weather app  
**Author:** Kalpana  
**Date:** 2026-09-10

## What was tested at each level

**Unit tests (23 cases)** cover small, deterministic helpers. `taskUtils` tests check title validation, filtering (All / Active / Completed), and task counts — the same rules used by the form and summary. `weatherUtils` tests map Open-Meteo weather codes to icons and generate clothing advice for different temperatures and rain. These tests run fast, need no DOM, and pin down Swedish error strings the UI relies on.

**Component tests (10 cases)** use React Testing Library to exercise TodoForm, TodoItem, and TodoList from the user's perspective: validation alerts, trimmed submit, toggle/delete actions, and empty-state messages. Callbacks are mocked so we do not need JSON Server. TodoForm alone satisfies the G requirement for at least one component test.

**MSW integration tests (13 cases)** mock HTTP APIs in `msw/handlers.js`. `taskApi.integration.test.js` covers GET, POST, PATCH, and DELETE against a fake JSON Server at `localhost:3001`, including Swedish error messages. `weatherApi.integration.test.js` and `WeatherSection.integration.test.jsx` cover Open-Meteo as before.

**Manual tests (3 cases)** in `Manual-Test-Cases.md` validate create-task flow, filters, and live weather display in the browser with JSON Server and Vite running.

## Remaining risks

- **JSON Server / `taskApi`:** CRUD is covered by MSW integration tests, not by a live `db.json` in CI.
- **App shell:** `App.jsx` wiring, retry button, and global error handling are untested.
- **FilterButtons / TodoSummary:** Small presentational components have no dedicated RTL tests.
- **Live weather:** Manual tests depend on Open-Meteo; automated weather tests use MSW only.
- **A/B button variant:** Env-based label swap is not tested.

These gaps are acceptable for the assignment scope; the highest-risk user flows (validation, list behaviour, weather fetch mapping) are covered.

## Why these tests were chosen

The assignment asks for the right test level per concern: pure logic in unit tests, UI interaction in RTL, and a mocked HTTP boundary for VG. Duplicating the same assertion with different numbers was avoided — each unit test targets a distinct branch (e.g. fog vs rain icons, cold vs mild clothing).

## Use of AI and verification

I planned the testing work before using AI. That included choosing test levels (unit, component, MSW integration, manual), splitting the work into sequential branches (tooling → utils → components → weather MSW → documentation), and deciding conventions such as `__tests__` folders and `.integration.test` filenames for MSW tests. I also wrote the initial branch plan and defined what each PR should contain.

Cursor was used **after** that plan existed, mainly to follow the flow I had already set: install and wire Vitest, RTL, MSW, and ESLint; add tests file by file according to the assignment; and draft documentation from my test results. The AI suggested code and wording, but I reviewed every change in the editor—especially Swedish validation messages, mock payloads, and which behaviours each test actually covers. I run `npm test` and `npm run lint` after changes, and I make all git commits locally (with conventional commit messages I choose).
