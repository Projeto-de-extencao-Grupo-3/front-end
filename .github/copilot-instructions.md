# GROTrack Frontend - Copilot Instructions

## Project Overview

**GROTrack** is a React + Vite management system for Geosmar (bus reformatory). The frontend tracks vehicle workflow through multiple stages (entry, quotation, authorization, parking, production, completion) with role-based dashboards and real-time status monitoring.

## Architecture & Key Patterns

### Component Structure
- **Pages** ([src/pages](src/pages)): Full-screen views with business logic (PainelControle, AnaliseFinanceira, Login)
- **Components** ([src/components](src/components)): Reusable UI pieces with minimal logic
- **Layout wrapper** ([src/components/Layout/Layout.jsx](src/components/Layout/Layout.jsx)): Provides Sidebar + content area; passes `ativo` prop for menu highlighting

### State Management
- **Local state only** (no Redux/Zustand yet) - use `useState` for all state
- **Modal pattern**: Parent page manages `isOpen` and `onClose` callback; modals receive these as props
- **KPI state**: PainelControle uses `kpiAtiva` state to filter and highlight status cards

### API Integration
- **Centralized axios instance** ([src/service/api.js](src/service/api.js)): Base URL `http://localhost:8080`
- **Auth token injection**: Request interceptor automatically adds `Authorization: Bearer {token}` from localStorage
- **Token flow**: Login saves token to localStorage; Backend validates on each request

## Critical Development Workflows

### Build & Run
```bash
npm run dev      # Start Vite dev server (HMR enabled)
npm run build    # Production build to dist/
npm run lint     # Check ESLint rules
npm run preview  # Preview production build locally
```

### Backend Integration
- Backend runs on `http://localhost:8080` - must be running for API calls
- API changes: Update endpoints in components, ensure token is fresh in localStorage

### Routing & Navigation
- Routes defined in [App.jsx](src/App.jsx) using react-router-dom v7
- Page navigation via `useNavigate()` (see [Sidebar.jsx](src/components/Sidebar/Sidebar.jsx#L5))
- Active page highlighting: Pass `ativo` prop to Layout (string must match sidebar menu item key)

## Conventions & Patterns

### Component Naming & Structure
- **Reusable components**: Named components in [src/components](src/components) with `.jsx` + matching `.css` file
- **Page components**: In [src/pages](src/pages) subdirectories, manage full-screen logic
- **Prop naming**: Use Portuguese terms (e.g., `ativo`, `kpiAtiva`, `mostrarModal*`) to match codebase style

### Modal Implementation
- **Controlled modals**: Accept `isOpen` (boolean) and `onClose` (callback) props
- **Backdrop click**: Dismisses modal via `onClose()` callback
- **Step management**: Use internal `useState` for multi-step wizards (see [ModalEntradaVeiculo.jsx](src/components/ModalEntradaVeiculo/ModalEntradaVeiculo.jsx#L5))

### Color System (KPI Cards)
- **Predefined palette** in [KpiStatus.jsx](src/components/KpiStatus/KpiStatus.jsx#L3): `verde`, `vermelho`, `amarelo`, `azul`
- **CSS Custom Properties**: Pass color values via `--cor1`, `--cor2`, `--cor-borda`, `--cor-texto` to component CSS
- **Active state**: Add `ativo` class for highlighting

### Styling
- **Bootstrap classes**: Flex utilities (`d-flex`, `justify-content-*`, `gap-*`), sizing (`col-*`, `fs-*`), spacing (`mb-4`, `p-3`)
- **Boxicons**: Icon library included in HTML (`<i class='bx bx-*'></i>`)
- **Component CSS files**: Co-locate `.css` with `.jsx` (e.g., [KpiStatus.css](src/components/KpiStatus/KpiStatus.css))

### State & Event Flow
- Parent pages manage state for modals/filters; pass `setState` callbacks to children
- Event naming: `onClick`, `onClose` for modal/button handlers
- No prop drilling beyond 1-2 levels - keep components shallow

## Key Files Reference

| File | Purpose |
|------|---------|
| [App.jsx](src/App.jsx) | Route definitions |
| [src/service/api.js](src/service/api.js) | Axios instance + auth interceptor |
| [src/components/Layout/Layout.jsx](src/components/Layout/Layout.jsx) | Page wrapper (Sidebar + content) |
| [src/pages/PainelControle/PainelControle.jsx](src/pages/PainelControle/PainelControle.jsx) | Main dashboard (KPIs, vehicle entry modals) |
| [KpiStatus.jsx](src/components/KpiStatus/KpiStatus.jsx) | Reusable status card component |

## Linting & Quality

- **ESLint config** ([eslint.config.js](eslint.config.js)): React Hooks rules + React Refresh plugin
- **Unused var rule**: Capital-letter variables ignored (e.g., `const MY_CONST = ...` is allowed but unused)
- Always run `npm run lint` before committing

## External Dependencies

- **react@^19.2.0**: Ensure hooks compatibility when updating
- **react-router-dom@^7.9.6**: v7 syntax; use `useNavigate()` not older navigation patterns
- **axios**: HTTP client (installed as transitive dependency)
- **Vite@^7.2.2**: Build tool with Fast Refresh enabled
