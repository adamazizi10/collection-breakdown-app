# Collection Breakdown – Take-Home Assessment

A small frontend application for recording daily collection breakdowns by payment method.  
Built with React and Redux Toolkit, focusing on clean architecture, validation, and future scalability.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/adamazizi10/collection-breakdown-app.git

# Navigate into the project directory
cd collection-breakdown-app

# Install dependencies
npm install

# Start the development server
npm run dev
````

The app will be available at:

```
http://localhost:5173
```

---

## 🧠 Architecture Overview

### Tech Stack

* **React (Vite)** – UI framework
* **Redux Toolkit** – Centralized state management
* **Plain CSS** – Lightweight, dependency-free styling

### Folder Structure (High-Level)

```
src/
├── app/                 # Store setup and root reducer
├── features/            # Domain logic (Redux slices, selectors, validation)
├── pages/               # Route-level UI composition
├── components/          # Shared UI components (Toast, Button, etc)
├── hooks/               # Shared hooks (useToast.js)
```

This structure separates **domain logic**, **UI**, and **shared utilities**, and is designed to scale as features grow.

---

## 🧩 State Management Choice

**Redux Toolkit** was chosen because:

* It provides a single source of truth for collection entries.
* It cleanly separates read logic (selectors) from write logic (reducers).
* It scales well as the app grows (additional slices, async logic, persistence, etc.).
* Redux Toolkit reduces boilerplate while keeping Redux’s predictability.

Selectors are derived and kept alongside domain logic to avoid unnecessary global state.

---

## ✅ Features Implemented

* Create, view, and edit collection breakdown entries
* Inline field validation with clear error messages
* Derived UI state (edit index, row numbering) without polluting global state
* Semantic table layout for recorded entries
* Lightweight toast notifications for success and error feedback
* Clean, accessible form layout inspired by the provided sample

---

## ⚖️ Assumptions & Tradeoffs

### Assumptions

* The **clinic field** was specified as a string/text input, so no additional validation was applied to restrict it to alphabetic characters. This aligns with the provided example (ON_C_CWL), which includes non-letter characters such as underscores.
* The **selected date** is assumed to fall within a valid range between the years **2020 and 2030**.
* Although the application currently uses a single `collectionSlice`, a **root reducer** is included to support future expansion and scalability as additional slices and features are introduced.
* Currency values are assumed to be in the same unit and locale.


### Tradeoffs

* No external UI libraries were used to keep the solution lightweight and dependency-free.
* Toast system is custom-built instead of using a library to avoid unnecessary overhead.
* No delete functionality was implemented, as it was not required.

---

## 📝 Notes

The project is intentionally structured for future expansion (additional pages, slices, async flows) while remaining simple and readable for the scope of a take-home assessment.

---
