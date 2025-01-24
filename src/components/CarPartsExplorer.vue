<template>
    <!-- Outer container, so header is top, footer is bottom -->
    <div class="min-h-screen flex flex-col bg-gray-50">
  
      <!-- HEADER -->
 
  
      <!-- MAIN CONTENT (cars, parts, articles) -->
      <main class="p-4 flex-1">
        <!-- Car Search (column 1) -->
        <div
          class="max-w-6xl mx-auto mb-4 bg-white shadow-md rounded-lg p-3 flex flex-wrap items-center gap-2"
        >
          <!-- Brand -->
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700 mb-1">Brand</label>
            <input
              v-model="brand"
              type="text"
              placeholder="e.g. BMW"
              class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
  
          <!-- Model Series -->
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700 mb-1">Model Series</label>
            <input
              v-model="modelSeries"
              type="text"
              placeholder="e.g. 3%"
              class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
  
          <!-- Model Year -->
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700 mb-1">Model Year</label>
            <input
              v-model="modelYear"
              type="number"
              placeholder="e.g. 2015"
              class="border border-gray-300 rounded px-2 py-1 w-20 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
  
          <!-- Skip -->
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700 mb-1">Skip</label>
            <input
              v-model.number="skipCars"
              type="number"
              min="0"
              class="border border-gray-300 rounded px-2 py-1 w-16 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
  
          <!-- Limit -->
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700 mb-1">Limit</label>
            <input
              v-model.number="limitCars"
              type="number"
              min="1"
              class="border border-gray-300 rounded px-2 py-1 w-16 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
  
          <!-- Search Button -->
          <button
            @click="searchCars"
            class="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded text-sm transition-colors"
          >
            Search
          </button>
        </div>
  
        <!-- 3-Column Layout -->
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- COLUMN 1: Cars -->
          <div class="bg-white shadow-md rounded-lg p-3 flex flex-col h-[600px]">
            <h2 class="text-base font-semibold mb-2 border-b pb-1 text-gray-800">
              Car Results
            </h2>
  
            <ul class="flex-1 overflow-y-auto pr-2 space-y-1">
              <!-- If no cars but user has searched, show message -->
              <li
                v-if="cars.length === 0 && hasSearched"
                class="text-sm text-gray-500 text-center py-2"
              >
                No cars found. Try adjusting your search.
              </li>
              <!-- Otherwise show each car -->
              <li
                v-for="(car, index) in cars"
                :key="index"
                class="p-1 rounded hover:bg-blue-50 cursor-pointer transition-colors text-sm"
                @click="selectCar(car)"
              >
                <div class="font-medium text-gray-700">
                  {{ car.mfa_brand }} - {{ car.model }}
                </div>
                <div class="text-xs text-gray-600">
                  {{ car.model_series }}
                  ({{ car.construction_interval_start_year }} - {{ car.construction_interval_end_year }})
                </div>
              </li>
            </ul>
  
            <!-- Pagination (Cars) -->
            <div v-if="cars.length" class="mt-2 flex items-center justify-between text-xs">
              <button
                @click="prevCarsPage"
                :disabled="skipCars === 0"
                class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <div v-if="totalCars > 0" class="text-gray-600">
                Page {{ currentCarPage }} of {{ carPageCount }}
              </div>
              <button
                @click="nextCarsPage"
                :disabled="disableNextCars"
                class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
  
          <!-- COLUMN 2: Parts (chunk-based, local text filter) -->
          <div class="bg-white shadow-md rounded-lg p-3 flex flex-col h-[600px]">
            <h2 class="text-base font-semibold mb-2 border-b pb-1 text-gray-800">
              Parts Categories
            </h2>
  
            <div class="text-xs text-gray-600 mb-2">
              <div v-if="selectedCar">
                Selected Car: {{ selectedCar.mfa_brand }} - {{ selectedCar.model }}
              </div>
              <div v-else>
                Selected Car: -
              </div>
            </div>
  
            <!-- local search if car is selected -->
            <div v-if="selectedCar" class="mb-2 text-xs">
              <label class="font-medium text-gray-700">Search in This Page:</label>
              <input
                v-model="partsFilter"
                type="text"
                placeholder="Filter loaded parts..."
                class="border border-gray-300 rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
  
            <!-- If no car selected -->
            <div
              v-if="!selectedCar"
              class="flex-1 text-sm text-gray-500 text-center py-2"
            >
              Select a car to see parts categories
            </div>
  
            <!-- Else show parts list -->
            <ul
              v-else
              class="flex-1 overflow-y-auto pr-2 space-y-1"
            >
              <li
                v-if="filteredParts.length === 0 && loadedParts"
                class="text-sm text-gray-500 text-center py-2"
              >
                No matching parts in this chunk
              </li>
              <li
                v-for="(part, idx) in filteredParts"
                :key="idx"
                class="p-1 rounded hover:bg-blue-50 cursor-pointer transition-colors text-sm"
                @click="selectPartCategory(part)"
              >
                <div class="font-medium text-gray-700">
                  {{ part.pt_des }}
                </div>
              </li>
            </ul>
  
            <!-- Pagination (Parts) -->
            <div v-if="parts.length" class="mt-2 flex items-center justify-between text-xs">
              <button
                @click="prevPartsPage"
                :disabled="skipParts === 0"
                class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <div v-if="totalParts > 0" class="text-gray-600">
                Page {{ currentPartPage }} of {{ partPageCount }}
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
  
          <!-- COLUMN 3: Articles (chunk-based, local filters: type + manufacturer) -->
          <div class="bg-white shadow-md rounded-lg p-3 flex flex-col h-[600px]">
            <h2 class="text-base font-semibold mb-2 border-b pb-1 text-gray-800">
              Articles
            </h2>
  
            <div class="text-xs text-gray-600 mb-2">
              <div v-if="selectedPart">
                Selected Part: {{ selectedPart.pt_des }}
              </div>
              <div v-else>
                Selected Part: -
              </div>
            </div>
  
            <!-- local filters if part is selected -->
            <div v-if="selectedPart" class="mb-2 text-xs space-y-1">
              <label class="font-medium text-gray-700">Type:</label>
              <select
                v-model="articleTypeFilter"
                class="border border-gray-300 rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="All">All</option>
                <option value="OE">OE</option>
                <option value="Aftermarket">Aftermarket</option>
              </select>
  
              <label class="font-medium text-gray-700">Manufacturer:</label>
              <input
                v-model="articleManufacturerFilter"
                type="text"
                placeholder="Search manufacturer..."
                class="border border-gray-300 rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
  
            <!-- If no part selected -->
            <div
              v-if="!selectedPart"
              class="flex-1 text-sm text-gray-500 text-center py-2"
            >
              Select a part category to see articles
            </div>
  
            <!-- Else show articles list -->
            <ul
              v-else
              class="flex-1 overflow-y-auto pr-2 space-y-1"
            >
              <li
                v-if="filteredArticles.length === 0 && loadedArticles"
                class="text-sm text-gray-500 text-center py-2"
              >
                No matching articles in this chunk
              </li>
              <li
                v-for="(article, i) in filteredArticles"
                :key="i"
                class="p-1 border-b last:border-b-0 hover:bg-blue-50 transition-colors text-sm"
              >
                <div class="font-medium text-gray-700">
                  {{ article.art_complete_des }}
                </div>
                <div class="text-xs text-gray-600">
                  <span class="font-semibold">OE No:</span> {{ article.arl_search_number }}
                </div>
                <div class="text-xs text-gray-600">
                  <span class="font-semibold">Article no:</span> {{ article.arl_display_nr }}
                </div>
                <div class="text-xs text-gray-600">
                  <span class="font-semibold">Type:</span> {{ getArticleType(article.arl_kind) }}
                </div>
                <div class="text-xs text-gray-600">
                  <span class="font-semibold">Brand:</span> {{ article.arl_bra_brand }}
                </div>
                <div class="text-xs text-gray-600">
                  <span class="font-semibold">Manufacturer:</span> {{ article.art_sup_brand }}
                </div>
              </li>
            </ul>
  
            <!-- Pagination (Articles) -->
            <div v-if="articles.length" class="mt-2 flex items-center justify-between text-xs">
              <button
                @click="prevArticlesPage"
                :disabled="skipArticles === 0"
                class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <div v-if="totalArticles > 0" class="text-gray-600">
                Page {{ currentArticlePage }} of {{ articlePageCount }}
              </div>
              <button
                @click="nextArticlesPage"
                :disabled="disableNextArticles"
                class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
  

    </div>
  </template>
  
  <script>
  import apiClient from '../services/api';
  
  export default {
    name: 'CarPartsExplorer',
    data() {
      return {
        // Settings dropdown
        showSettingsMenu: false,
  
        // Car search fields
        brand: '',
        modelSeries: '',
        modelYear: '',
        hasSearched: false,
        skipCars: 0,
        limitCars: 10,
        totalCars: 0,
        cars: [],
        selectedCar: null,
  
        // PARTS: chunk-based (limit=500) + local text filter
        skipParts: 0,
        limitParts: 500,
        totalParts: 0,
        parts: [],
        loadedParts: false,
        partsFilter: '',
        selectedPart: null,
  
        // ARTICLES: chunk-based (limit=500) + local filters (type & manufacturer)
        skipArticles: 0,
        limitArticles: 500,
        totalArticles: 0,
        articles: [],
        loadedArticles: false,
  
        // local filters for articles
        articleTypeFilter: 'All', // 'All' | 'OE' | 'Aftermarket'
        articleManufacturerFilter: ''
      };
    },
    computed: {
      /* --- Car Pagination --- */
      currentCarPage() {
        return Math.floor(this.skipCars / this.limitCars) + 1;
      },
      carPageCount() {
        return Math.ceil(this.totalCars / this.limitCars) || 1;
      },
      disableNextCars() {
        if (this.totalCars) {
          return this.skipCars + this.limitCars >= this.totalCars;
        }
        return this.cars.length < this.limitCars;
      },
  
      /* --- Filtered Parts (local text) --- */
      filteredParts() {
        if (!this.parts.length) return [];
        const text = this.partsFilter.toLowerCase().trim();
        if (!text) return this.parts;
        return this.parts.filter((p) =>
          p.pt_des.toLowerCase().includes(text)
        );
      },
      /* --- Parts Pagination --- */
      currentPartPage() {
        return Math.floor(this.skipParts / this.limitParts) + 1;
      },
      partPageCount() {
        return Math.ceil(this.totalParts / this.limitParts) || 1;
      },
      disableNextParts() {
        if (this.totalParts) {
          return this.skipParts + this.limitParts >= this.totalParts;
        }
        return this.parts.length < this.limitParts;
      },
  
      /* --- Filtered Articles (type + manufacturer) --- */
      filteredArticles() {
        if (!this.articles.length) return [];
        let filtered = this.articles;
  
        // 1) Filter by Type
        if (this.articleTypeFilter !== 'All') {
          filtered = filtered.filter(a => {
            const isOE = (a.arl_kind === 2);
            const isAftermarket = (a.arl_kind === 3);
            if (this.articleTypeFilter === 'OE') return isOE;
            if (this.articleTypeFilter === 'Aftermarket') return isAftermarket;
            return true;
          });
        }
  
        // 2) Filter by Manufacturer
        const manufText = this.articleManufacturerFilter.toLowerCase().trim();
        if (manufText) {
          filtered = filtered.filter(a =>
            a.art_sup_brand.toLowerCase().includes(manufText)
          );
        }
  
        return filtered;
      },
      /* --- Articles Pagination --- */
      currentArticlePage() {
        return Math.floor(this.skipArticles / this.limitArticles) + 1;
      },
      articlePageCount() {
        return Math.ceil(this.totalArticles / this.limitArticles) || 1;
      },
      disableNextArticles() {
        if (this.totalArticles) {
          return this.skipArticles + this.limitArticles >= this.totalArticles;
        }
        return this.articles.length < this.limitArticles;
      }
    },
    methods: {
      /* --- Toggle Settings Menu in Header --- */
      toggleSettingsMenu() {
        this.showSettingsMenu = !this.showSettingsMenu;
      },
  
      /* --- Cars --- */
      async searchCars() {
        this.hasSearched = false;
        this.cars = [];
        this.selectedCar = null;
        this.resetPartsState();
        this.resetArticlesState();
  
        try {
          const response = await apiClient.get('/cars', {
            params: {
              brand: this.brand || undefined,
              model_series: this.modelSeries || undefined,
              model_year: this.modelYear || undefined,
              skip: this.skipCars,
              limit: this.limitCars
            }
          });
          const res = response.data;
          this.cars = res.data || [];
          this.totalCars = res.total || 0;
          this.hasSearched = true;
        } catch (error) {
          console.error('Error fetching cars:', error);
        }
      },
      nextCarsPage() {
        this.skipCars += this.limitCars;
        this.searchCars();
      },
      prevCarsPage() {
        this.skipCars = Math.max(0, this.skipCars - this.limitCars);
        this.searchCars();
      },
  
      /* --- Select Car -> fetch parts chunk --- */
      async selectCar(car) {
        this.selectedCar = car;
        this.resetPartsState();
        this.resetArticlesState();
        await this.fetchPartsChunk();
      },
      async fetchPartsChunk() {
        try {
          const response = await apiClient.get('/parts', {
            params: {
              pc_id: this.selectedCar.pc_id,
              skip: this.skipParts,
              limit: this.limitParts
            }
          });
          const res = response.data;
          this.parts = res.data || [];
          this.totalParts = res.total || 0;
        } catch (error) {
          console.error('Error fetching parts:', error);
        } finally {
          this.loadedParts = true;
        }
      },
      nextPartsPage() {
        this.skipParts += this.limitParts;
        this.fetchPartsChunk();
      },
      prevPartsPage() {
        this.skipParts = Math.max(0, this.skipParts - this.limitParts);
        this.fetchPartsChunk();
      },
  
      /* --- Select Part -> fetch articles chunk --- */
      selectPartCategory(part) {
        this.selectedPart = part;
        this.resetArticlesState();
        this.fetchArticlesChunk();
      },
      async fetchArticlesChunk() {
        try {
          const response = await apiClient.get('/articles', {
            params: {
              pc_id: this.selectedCar.pc_id,
              pt_id: this.selectedPart.pt_id,
              skip: this.skipArticles,
              limit: this.limitArticles
            }
          });
          const res = response.data;
          this.articles = res.data || [];
          this.totalArticles = res.total || 0;
        } catch (error) {
          console.error('Error fetching articles:', error);
        } finally {
          this.loadedArticles = true;
        }
      },
      nextArticlesPage() {
        this.skipArticles += this.limitArticles;
        this.fetchArticlesChunk();
      },
      prevArticlesPage() {
        this.skipArticles = Math.max(0, this.skipArticles - this.limitArticles);
        this.fetchArticlesChunk();
      },
  
      /* --- Resets --- */
      resetPartsState() {
        this.skipParts = 0;
        this.parts = [];
        this.partsFilter = '';
        this.totalParts = 0;
        this.loadedParts = false;
        this.selectedPart = null;
      },
      resetArticlesState() {
        this.skipArticles = 0;
        this.articles = [];
        this.articleTypeFilter = 'All';
        this.articleManufacturerFilter = '';
        this.totalArticles = 0;
        this.loadedArticles = false;
      },
  
      /* --- Helper: Map arl_kind => "OE" or "Aftermarket" --- */
      getArticleType(kind) {
        if (kind === 2) return 'OE';
        if (kind === 3) return 'Aftermarket';
        return 'Unknown';
      }
    }
  };
  </script>
  
  <style scoped>
  /*
   Each column: 
    .bg-white.shadow-md.rounded-lg.p-3.flex.flex-col.h-[600px]
    Inside we have an <ul class="flex-1 overflow-y-auto"> for scrolling.
   
   The header includes a settings cog and toggles a small dropdown.
   The footer displays "Powered by QCS" linking to quacks.com.
   
   The search capabilities for columns 2 & 3 are fully restored 
   (chunk-based fetch, local filters).
  */
  </style>
  