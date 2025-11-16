// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Application State
const app = {
    currentDisaster: 'flood',
    disasters: [],
    resources: [],
    capacity: 100,
    nextId: 1,

    // Initialize the application
    async init() {
        await this.loadDisasters();
        this.setupEventListeners();
    },

    // Load disasters from backend
    async loadDisasters() {
        try {
            const response = await fetch(`${API_BASE_URL}/disasters`);
            const data = await response.json();
            
            if (data.success) {
                this.disasters = data.data;
                this.renderDisasterSidebar();
                await this.selectDisaster('flood');
            }
        } catch (error) {
            console.error('Error loading disasters:', error);
            this.showError('Failed to load disaster types. Please ensure the backend server is running.');
        }
    },

    // Setup event listeners
    setupEventListeners() {
        document.getElementById('capacity').addEventListener('input', () => {
            this.capacity = parseFloat(document.getElementById('capacity').value) || 0;
            this.calculate();
        });
    },

    // Render disaster sidebar
    renderDisasterSidebar() {
        const list = document.getElementById('disasterList');
        list.innerHTML = '';

        this.disasters.forEach(disaster => {
            const div = document.createElement('div');
            div.className = `disaster-item ${disaster.id === this.currentDisaster ? 'active' : ''}`;
            div.innerHTML = `<span class="disaster-icon">${disaster.icon}</span> ${disaster.name}`;
            div.onclick = () => this.selectDisaster(disaster.id);
            list.appendChild(div);
        });
    },

    // Select disaster type
    async selectDisaster(type) {
        try {
            const response = await fetch(`${API_BASE_URL}/disasters/${type}`);
            const data = await response.json();
            
            if (data.success) {
                this.currentDisaster = type;
                this.resources = data.data.resources.map((r, i) => ({
                    id: ++this.nextId,
                    ...r
                }));
                this.renderDisasterSidebar();
                this.renderResources();
                await this.calculate();
            }
        } catch (error) {
            console.error('Error selecting disaster:', error);
            this.showError('Failed to load disaster resources.');
        }
    },

    // Render resources table
    renderResources() {
        const tbody = document.getElementById('resourceTable');
        tbody.innerHTML = '';

        this.resources.forEach(resource => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" value="${resource.name}" onchange="app.updateResource(${resource.id}, 'name', this.value)"></td>
                <td><input type="number" value="${resource.value}" min="0" onchange="app.updateResource(${resource.id}, 'value', parseFloat(this.value) || 0)"></td>
                <td><input type="number" value="${resource.weight}" min="0.1" step="0.1" onchange="app.updateResource(${resource.id}, 'weight', parseFloat(this.value) || 0.1)"></td>
                <td><button class="btn-delete" onclick="app.deleteResource(${resource.id})">🗑️</button></td>
            `;
            tbody.appendChild(tr);
        });
    },

    // Update resource
    updateResource(id, field, value) {
        const resource = this.resources.find(r => r.id === id);
        if (resource) {
            resource[field] = value;
            this.calculate();
        }
    },

    // Delete resource
    deleteResource(id) {
        this.resources = this.resources.filter(r => r.id !== id);
        this.renderResources();
        this.calculate();
    },

    // Add new resource
    addResource() {
        this.resources.push({
            id: ++this.nextId,
            name: 'New Resource',
            value: 100,
            weight: 5
        });
        this.renderResources();
        this.calculate();
    },

    // Calculate knapsack using backend API
    async calculate() {
        if (this.resources.length === 0 || this.capacity <= 0) {
            this.renderEmptyState();
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/knapsack/calculate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: this.resources.map(r => ({
                        name: r.name,
                        value: r.value,
                        weight: r.weight
                    })),
                    capacity: this.capacity
                })
            });

            const data = await response.json();

            if (data.success) {
                this.renderResults(data.result, data.metadata);
            } else {
                this.showError(data.error || 'Calculation failed');
            }
        } catch (error) {
            console.error('Error calculating:', error);
            this.showError('Failed to calculate. Please ensure the backend server is running on http://localhost:3000');
        }
    },

    // Render results
    renderResults(result, metadata) {
        // Update stats
        document.getElementById('totalValue').textContent = `$${result.maxValue.toFixed(2)}`;
        document.getElementById('totalWeight').textContent = `${result.totalWeight.toFixed(2)} kg`;
        document.getElementById('capacityUsed').textContent = `${result.capacityUsed.toFixed(1)}%`;

        // Show metadata
        const metadataDiv = document.getElementById('metadata');
        metadataDiv.innerHTML = `
            <strong>Algorithm:</strong> ${metadata.algorithm} | 
            <strong>Complexity:</strong> ${metadata.complexity} | 
            <strong>Execution Time:</strong> ${metadata.executionTime} | 
            <strong>Selected:</strong> ${result.selectedCount}/${result.itemsCount} items
        `;

        // Create set of selected item names for quick lookup
        const selectedNames = new Set(result.selectedItems.map(item => item.name));

        // Render results table
        const tbody = document.getElementById('resultsTable');
        tbody.innerHTML = '';

        this.resources.forEach(resource => {
            const isSelected = selectedNames.has(resource.name);
            const ratio = (resource.value / resource.weight).toFixed(2);
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="item-name">${resource.name}</div>
                    <div class="item-ratio">Ratio: $${ratio}/kg</div>
                </td>
                <td>${isSelected ? '<span class="badge">Selected</span>' : '<span class="badge not-selected">Not Selected</span>'}</td>
                <td>${isSelected ? resource.weight.toFixed(2) : '-'}</td>
                <td class="${isSelected ? 'value-highlight' : ''}">
                    ${isSelected ? '$' + resource.value.toFixed(2) : '-'}
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    // Render empty state
    renderEmptyState() {
        document.getElementById('totalValue').textContent = '$0.00';
        document.getElementById('totalWeight').textContent = '0 kg';
        document.getElementById('capacityUsed').textContent = '0%';
        document.getElementById('metadata').innerHTML = '';
        document.getElementById('resultsTable').innerHTML = '<tr><td colspan="4" class="empty-state">No resources to allocate</td></tr>';
    },

    // Show error message
    showError(message) {
        const metadataDiv = document.getElementById('metadata');
        metadataDiv.innerHTML = `<div class="error">⚠️ ${message}</div>`;
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
