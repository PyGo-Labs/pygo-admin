# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.2.0] - 2026-08-02

### Added — Advanced DataTable

- **Global search** con debounce y highlight
- **Column filters** (text, select, date, range) con panel colapsable
- **Bulk actions** (select all, bulk delete, bulk operations)
- **Column visibility** toggle (show/hide columns)
- **Inline editing** with per-row edit/delete buttons
- **Advanced pagination** (page size selector, first/last buttons)
- **Empty states** con reset de filtros
- **Loading states** animados
- Export formats: CSV, Excel

### Added — Advanced FormBuilder

- **Schema-driven forms** from JSON schema
- **Field types**: text, email, password, number, textarea, select, relation, date, file, boolean, json, markdown
- **Relation fields** (ForeignKey/ManyToMany) with async loading
- **Real-time validation** with live error feedback
- **Field help tooltips** and disabled states
- **JSON/array editors** with syntax formatting
- **Markdown editor** field type
- **Form reset + submit** with loading states

### Added — Dashboard Widgets

- **Chart widgets** (line, bar, area) with Chart.js integration
- **Stat grid** with trend indicators (up/down arrows)
- **Responsive layouts** (mobile-first grid)

### Added — Management Components

- **User table** with avatar, search, status badges
- **Role manager** with permission checkboxes
- **Audit log viewer** with filters (action, user, level), timeline view, details expansion
- **Change diff viewer** for audit trails
- **Report builder** with filters, preview, and multi-format export

### Added — Assets

- `admin.css` — Admin-specific overrides
- `admin.js` — Alpine.js plugins + DataTable/FormBuilder logic
- `chart-widget.html` — Chart.js charts

## [0.1.0] - 2026-08-01

### Added — Core Admin

- DataTable básico (sorting, pagination)
- FormBuilder básico (dynamic fields)
- StatWidget (KPI metrics)
- Alert, Toast (heredados de pygo-ui)
- Admin layout (sidebar + topbar, responsive)
- Sistema de temas (default + dark)
- Iconos integrados
