# Manual test cases

**Tester:** Kalpana  
**Date:** 2026-09-13  
**Environment:** macOS, Node ≥ 24, Chrome, `npm run server` + `npm run dev`

---

## Test case 1 — Create a valid task

### Prerequisites

- `npm install` completed
- JSON Server running: `npm run server`
- React app running: `npm run dev`
- Browser open at `http://localhost:5173`

### Steps

1. Note the current task count in the summary footer (Totalt / Aktiva / Slutförda).
2. Type `Manual test task` in the **Ny uppgift** field.
3. Click **Lägg till**.
4. Confirm the new task appears in the list under filter **Alla**.
5. Confirm the summary counts increased (Totalt and Aktiva).

### Expected result

- The task **Manual test task** is visible in the list.
- The input field is cleared after a successful add.
- Totalt and Aktiva counts increase by one.

### Actual result

- Task appeared in the list with the correct title.
- Input was cleared after submit.
- Summary showed updated counts.
- **Status: Pass**

---

## Test case 2 — Filter active and completed tasks

### Prerequisites

- Same as test case 1.
- At least one active and one completed task exist in the list (toggle a checkbox if needed).

### Steps

1. Click **Aktiva** in the filter bar.
2. Verify only incomplete tasks are shown.
3. Click **Slutförda**.
4. Verify only completed tasks are shown.
5. Click **Alla** and verify the full list returns.

### Expected result

- **Aktiva** shows only tasks without a checked checkbox.
- **Slutförda** shows only completed tasks.
- **Alla** shows every task again.
- Empty-filter messages appear if a filter has no matching tasks.

### Actual result

- Active and completed filters showed the correct subsets.
- **Alla** restored the full list.
- **Status: Pass**

---

## Test case 3 — Weather section shows Stockholm weather

### Prerequisites

- App running with network access (Open-Meteo is called live in the browser).

### Steps

1. Load the home page.
2. Wait for the weather section to finish loading (no “Hämtar vädret…”).
3. Check that **Stockholm** is shown with a temperature in °C.
4. Check that a **Klädtips** section shows clothing advice text.

### Expected result

- City name **Stockholm** is visible.
- A numeric temperature with °C is shown.
- A clothing tip paragraph is displayed.

### Actual result

- Stockholm, current temperature, and clothing advice were displayed after loading.
- **Status: Pass**
