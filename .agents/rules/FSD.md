## 🏗️ Architecture Overview
Feature-Sliced Design (FSD) is a structural methodology for frontend applications. It organizes code into **Layers**, **Slices**, and **Segments**.



### 1. Layers (The Hierarchy)
Layers are strictly ordered. A layer may only depend on layers **below** it.
- **`app/`**: Global initialization (providers, global styles, routing).
- **`pages/`**: Full views/screens. Composition only, minimal logic.
- **`widgets/`**: Large, self-contained UI blocks (e.g., `Header`, `ProductList`).
- **`features/`**: User interactions that bring business value (e.g., `AddToCart`, `SearchUsers`).
- **`entities/`**: Business domains (e.g., `User`, `Product`, `Order`). Contains logic, state, and UI related to the entity.
- **`shared/`**: Reusable technical modules (UI Kit, API clients, `utils`, `hooks`).

---

## 📏 Core Rules

### 🚫 Rule 1: No Cross-Imports (Same Layer)
Slices within the same layer **cannot** import from each other.
* **Wrong:** `features/add-to-cart` importing from `features/remove-from-cart`.
* **Fix:** Move shared logic to `entities/` or `shared/`, or compose them in a `widget/` or `page/`.

### ⬇️ Rule 2: Unidirectional Flow
Imports must always point **downward** in the hierarchy.
* **Wrong:** `entities/user` importing from `features/auth`.
* **Fix:** A feature can use an entity, but an entity must be independent.

### 📦 Rule 3: Public API (Public Interface)
Every Slice and Segment must have an `index.ts` file. 
* **Requirement:** Always import from the `index.ts` of a slice, never from internal files.
* **Agent/Dev Rule:** Only export the minimum necessary components/functions to the `index.ts`.

---

## 📂 Folder Structure Example
Each **Slice** should generally contain these **Segments**:
- `ui/`: React components.
- `model/`: State management, hooks, and business logic.
- `api/`: Request logic and types.
- `lib/`: Helper functions specific to this slice.

```text
src/
├── app/          # Entry point, providers, global styles
├── pages/        # Composition of widgets/features
├── widgets/      # Composition of features/entities
├── features/     # Action-oriented slices (e.g. auth-by-email)
├── entities/     # Domain-oriented slices (e.g. user, product)
└── shared/       # UI Kit, API base, general utils
    ├── ui/       # (e.g. Button, Input)
    └── api/      # (e.g. Axios instance)
```

---

## 🤖 Instructions for AI Agents
1. **Placement:** Before creating a new file, determine its Layer based on business value vs. technical abstraction.
2. **Refactoring:** If you encounter a circular dependency, move the shared logic one layer down.
3. **Encapsulation:** Do not reach into a slice's internal folders (`ui/`, `model/`). Only use the `index.ts` exports.
4. **Consistency:** Keep logic in `model/` and view in `ui/` within each slice.
