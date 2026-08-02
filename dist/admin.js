/* dist/admin.js — PyGo Admin JavaScript */

// Alpine.js plugin for DataTable
document.addEventListener('alpine:init', () => {
  Alpine.data('advancedDataTable', (config) => ({
    endpoint: config.endpoint || '/api/data',
    pageSize: config.pageSize || 25,
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    loading: false,
    searchQuery: '',
    sortField: '',
    sortDirection: 'asc',
    selectedRows: [],
    selectAll: false,
    activeFilters: {},
    visibleColumns: {},
    showColumnSettings: false,

    init() {
      this.initColumns();
    },

    initColumns() {
      if (config.columns) {
        config.columns.forEach(col => {
          this.visibleColumns[col.field] = true;
        });
      }
    },

    get visibleColumnsArray() {
      return config.columns.filter(c => this.visibleColumns[c.field]);
    },

    get allSelected() {
      return this.data.length > 0 && this.selectedRows.length === this.data.length;
    },

    toggleSelectAll() {
      if (this.allSelected) {
        this.selectedRows = [];
      } else {
        this.selectedRows = this.data.map(r => r.id);
      }
    },

    async loadData(page = 1) {
      this.loading = true;
      this.currentPage = page;

      const params = new URLSearchParams({
        page: page,
        page_size: this.pageSize,
        sort: this.sortField,
        direction: this.sortDirection,
        search: this.searchQuery
      });

      Object.entries(this.activeFilters).forEach(([k, v]) => {
        if (v) params.append(`filter[${k}]`, v);
      });

      try {
        const resp = await fetch(`${this.endpoint}?${params}`);
        const result = await resp.json();
        this.data = result.data || [];
        this.totalItems = result.meta?.total || 0;
        this.totalPages = result.meta?.total_pages || 1;
      } catch(e) {
        this.data = [];
        this.totalItems = 0;
        this.totalPages = 1;
      } finally {
        this.loading = false;
      }
    },

    sortBy(field) {
      this.sortField = field;
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.loadData(1);
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.loadData(page);
      }
    },

    get visiblePages() {
      const delta = 2;
      const range = [];
      const left = Math.max(2, this.currentPage - delta);
      const right = Math.min(this.totalPages - 1, this.currentPage + delta);

      for (let i = left; i <= right; i++) {
        range.push(i);
      }
      return [1, ...(left > 2 ? ['...'] : []), ...range, ...(right < this.totalPages - 1 ? ['...'] : []), this.totalPages]
        .flat().filter(p => typeof p === 'number');
    },

    clearFilters() {
      this.activeFilters = {};
      this.searchQuery = '';
      this.loadData(1);
    },

    clearSelection() {
      this.selectedRows = [];
      this.selectAll = false;
    },

    bulkAction(action) {
      const ids = this.selectedRows.join(',');
      alert(`${action} on items: ${ids}`);
      this.clearSelection();
    },

    formatValue(value, format, row) {
      if (format === 'date') {
        return new Date(value).toLocaleDateString('es-ES');
      }
      if (format === 'datetime') {
        return new Date(value).toLocaleString('es-ES');
      }
      if (format === 'currency') {
        return new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      }
      return value;
    },

    async exportData(format) {
      const params = new URLSearchParams({
        format,
        search: this.searchQuery
      });
      Object.entries(this.activeFilters).forEach(([k, v]) => {
        if (v) params.append(`filter[${k}]`, v);
      });
      window.location.href = `${this.endpoint}/export?${params}`;
    }
  }));
});

// Form Builder Alpine data
Alpine.data('advancedFormBuilder', (config) => ({
  endpoint: config.endpoint,
  schema: config.schema || [],
  initialData: config.initialData || {},
  values: {},
  errors: {},
  loading: false,

  init() {
    // Initialize values from schema
    this.schema.forEach(field => {
      this.values[field.name] = field.default || '';
      if (this.initialData && this.initialData[field.name] !== undefined) {
        this.values[field.name] = this.initialData[field.name];
      }
    });
  },

  hasError(fieldName) {
    return this.errors[fieldName] !== undefined;
  },

  get isValid() {
    let valid = true;
    this.schema.forEach(field => {
      if (field.required && !this.values[field.name]) {
        this.errors[field.name] = 'Este campo es requerido';
        valid = false;
      }
    });
    return valid;
  },

  async handleSubmit() {
    if (!this.isValid) return;

    this.loading = true;
    try {
      const resp = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || ''
        },
        body: JSON.stringify(this.values)
      });

      if (resp.ok) {
        window.location.reload();
      } else {
        const data = await resp.json();
        this.errors = data.errors || {};
      }
    } catch(e) {
      console.error('Error:', e);
    } finally {
      this.loading = false;
    }
  },

  resetForm() {
    this.init();
    this.errors = {};
  },

  async fetchRelations(url) {
    // Used for relation field async loading
  }
}));

// Audit Log Viewer
Alpine.data('auditLogViewer', (config) => ({
  endpoint: config.endpoint,
  logs: [],
  loading: true,
  currentPage: 1,
  totalItems: 0,
  filters: {
    search: '',
    action: '',
    user_id: '',
    level: ''
  },

  async loadLogs() {
    this.loading = true;
    const params = new URLSearchParams({
      page: this.currentPage,
      per_page: 20
    });

    if (this.filters.search) params.append('search', this.filters.search);
    if (this.filters.action) params.append('action', this.filters.action);
    if (this.filters.user_id) params.append('user_id', this.filters.user_id);
    if (this.filters.level) params.append('level', this.filters.level);

    try {
      const resp = await fetch(`${this.endpoint}?${params}`);
      const data = await resp.json();
      this.logs = data.results || [];
      this.totalItems = data.count || 0;
    } catch(e) {
      this.logs = [];
    } finally {
      this.loading = false;
    }
  }
}));

// Simple slug utility
window.slugify = function(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};
