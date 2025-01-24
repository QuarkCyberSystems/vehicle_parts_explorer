<template>
    <div class="bg-gray-50 p-4">
      <!-- Title & Subtitle -->
      <div class="text-center mb-4">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
          Search by Part Number
        </h1>
        <p class="text-gray-600">
          Enter a part number to find all applicable vehicles
        </p>
      </div>
  
      <!-- Search Bar for Part No -->
      <div
        class="max-w-3xl mx-auto mb-4 bg-white shadow-md rounded-lg p-3 flex flex-wrap items-center gap-2"
      >
        <!-- Part Number -->
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1">Part No (OE Number)</label>
          <input
            v-model="partNo"
            type="text"
            placeholder="e.g. 13718511668"
            class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
  
        <!-- Skip -->
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1">Skip</label>
          <input
            v-model.number="skipParts"
            type="number"
            min="0"
            class="border border-gray-300 rounded px-2 py-1 w-16 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
  
        <!-- Limit -->
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1">Limit</label>
          <input
            v-model.number="limitParts"
            type="number"
            min="1"
            class="border border-gray-300 rounded px-2 py-1 w-16 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
  
        <!-- Search Button -->
        <button
          @click="searchByPartNo"
          class="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded text-sm transition-colors"
        >
          Search
        </button>
      </div>
  
      <!-- 1-Column Layout for results (like a "column"): h-[600px], scrollable -->
      <div class="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-3 flex flex-col h-[600px]">
        <h2 class="text-base font-semibold mb-2 border-b pb-1 text-gray-800">
          Applicable Vehicles
        </h2>
  
        <!-- Local filter for brand / model if desired -->
        <div class="mb-2 text-xs">
          <label class="font-medium text-gray-700">Filter brand/model:</label>
          <input
            v-model="applicableFilter"
            type="text"
            placeholder="Search brand or model..."
            class="border border-gray-300 rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
  
        <ul class="flex-1 overflow-y-auto pr-2 space-y-1">
          <li
            v-if="filteredApplicableCars.length === 0 && loadedParts"
            class="text-sm text-gray-500 text-center py-2"
          >
            No matching vehicles found
          </li>
          <li
            v-for="(item, idx) in filteredApplicableCars"
            :key="idx"
            class="p-1 border-b last:border-b-0 hover:bg-blue-50 transition-colors text-sm"
          >
            <!-- brand, model_series, model -->
            <div class="font-medium text-gray-700">
              {{ item.mfa_brand }} - {{ item.model }}
            </div>
            <div class="text-xs text-gray-600">
              Model Series: {{ item.model_series }}
            </div>
          </li>
        </ul>
  
        <!-- Pagination Controls -->
        <div
          v-if="applicableCars.length"
          class="mt-2 flex items-center justify-between text-xs"
        >
          <button
            @click="prevPartsPage"
            :disabled="skipParts === 0"
            class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <div v-if="totalParts > 0" class="text-gray-600">
            Page {{ currentPartsPage }} of {{ partsPageCount }}
          </div>
          <button
            @click="nextPartsPage"
            :disabled="disableNextParts"
            class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '../services/api';
  
  export default {
    name: 'PartsExplorer',
    data() {
      return {
        // For the reverse search
        partNo: '',
        skipParts: 0,
        limitParts: 10, // or 500 if you expect large data
        totalParts: 0,
        applicableCars: [],
        loadedParts: false,
  
        // local filter
        applicableFilter: ''
      };
    },
    computed: {
      /* Filter the loaded chunk by brand or model */
      filteredApplicableCars() {
        if (!this.applicableCars.length) return [];
        const text = this.applicableFilter.toLowerCase().trim();
        if (!text) return this.applicableCars;
        return this.applicableCars.filter(item =>
          item.mfa_brand.toLowerCase().includes(text) ||
          item.model.toLowerCase().includes(text)
        );
      },
      currentPartsPage() {
        return Math.floor(this.skipParts / this.limitParts) + 1;
      },
      partsPageCount() {
        return Math.ceil(this.totalParts / this.limitParts) || 1;
      },
      disableNextParts() {
        if (this.totalParts) {
          return this.skipParts + this.limitParts >= this.totalParts;
        }
        return this.applicableCars.length < this.limitParts;
      }
    },
    methods: {
      /* Search by part no -> calls /applicable_cars?arl_search_number=... */
      async searchByPartNo() {
        this.skipParts = 0; // reset to first page
        this.fetchApplicableCars();
      },
  
      async fetchApplicableCars() {
        this.loadedParts = false;
        this.applicableCars = [];
        try {
          const response = await apiClient.get('/applicable_cars', {
            params: {
              arl_search_number: this.partNo || undefined,
              skip: this.skipParts,
              limit: this.limitParts
            }
          });
          const res = response.data;
          this.applicableCars = res.data || [];
          this.totalParts = res.total || 0; // if 'total' is returned
        } catch (err) {
          console.error('Error fetching applicable cars:', err);
        } finally {
          this.loadedParts = true;
        }
      },
  
      nextPartsPage() {
        this.skipParts += this.limitParts;
        this.fetchApplicableCars();
      },
      prevPartsPage() {
        this.skipParts = Math.max(0, this.skipParts - this.limitParts);
        this.fetchApplicableCars();
      }
    }
  };
  </script>
  
  <style scoped>
  /*
   Similar design pattern: a container .flex.flex-col.h-[600px]
   Then .flex-1.overflow-y-auto for the list.
  
   Here, we used a single column approach (max-w-3xl) 
   but the pattern is consistent with the 600px height, 
   local filter, chunk-based pagination, etc.
  */
  </style>
  