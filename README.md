# PyGo Admin

Advanced admin panel components for the PyGo framework — DataTable, FormBuilder, and Dashboard widgets.

## 🚀 Quick Start

```bash
# Install from registry
pygo module install pygo-admin

# Or install pygo-ui (required dependency) too
pygo module install pygo-ui
```

## 🏗️ Installation

This module **requires** `pygo-ui >=0.1.0`. Install both:

```bash
pygo module install pygo-ui pygo-admin
```

## 📦 Components

| Category | Component | Status |
|----------|-----------|--------|
| **Layout** | Admin layout (sidebar + topbar) | v0.1.0 |
| **Data Table** | DataTable (sorting, pagination) | v0.1.0 |
| **Forms** | FormBuilder (auto-generated) | v0.1.0 |
| **Dashboard** | StatWidget (KPIs) | v0.1.0 |
| **Feedback** | Alert, Toast (inherited from pygo-ui) | v0.1.0 |

## 🎨 Philosophy

- **High information density** — Optimized for data-heavy admin panels
- **Zero complex JS** — HTMX + Alpine.js only
- **Inherited from PyGo UI** — Uses all base components from pygo-ui

## 📚 Documentation

See [docs.pygo.dev/admin](https://docs.pygo.dev/admin)

## 🪪 License

AGPL-3.0 — PyGo Labs
