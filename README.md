# React Todo-app

En enkel Todo-app med React, Vite och JSON Server. Appen innehåller inga tester eller testverktyg.

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

## Starta appen

Installera först paketen:

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

Öppna adressen som Vite visar, vanligtvis:

```text
http://localhost:5173
```

## A/B-variant

Kopiera `.env.example` och döp kopian till `.env`.

```env
VITE_BUTTON_VARIANT=A
```

- `A` visar **Lägg till**.
- `B` visar **Skapa uppgift**.

Starta om React-appen efter att du har ändrat `.env`.
