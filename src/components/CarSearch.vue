<template>
    <div class="car-search">
      <h2>Search Cars</h2>
      <form @submit.prevent="searchCars">
        <div>
          <label for="brand">Brand:</label>
          <input type="text" id="brand" v-model="brand" placeholder="e.g., BMW" />
        </div>
        <div>
          <label for="modelSeries">Model Series:</label>
          <input
            type="text"
            id="modelSeries"
            v-model="modelSeries"
            placeholder="e.g., 3"
          />
        </div>
        <div>
          <label for="modelYear">Model Year:</label>
          <input
            type="number"
            id="modelYear"
            v-model="modelYear"
            placeholder="e.g., 2010"
          />
        </div>
        <div>
          <label for="skip">Skip:</label>
          <input
            type="number"
            id="skip"
            v-model="skip"
            placeholder="Number of items to skip"
          />
        </div>
        <div>
          <label for="limit">Limit:</label>
          <input
            type="number"
            id="limit"
            v-model="limit"
            placeholder="Number of items to fetch"
          />
        </div>
        <button type="submit">Search</button>
      </form>
  
      <div class="car-results">
        <h3>Car Results</h3>
        <!-- Example of displaying skip & limit from the response (optional) -->
        <p>Skip: {{ skip }}, Limit: {{ limit }}</p>
  
        <ul>
          <li v-for="(car, index) in cars" :key="index">
            <!-- 
              Use the fields from your response 
              e.g., mfa_brand, model, model_series, etc.
            -->
            {{ car.mfa_brand }} - {{ car.model }} - {{ car.model_series }}
            ({{ car.construction_interval_start_year }} - {{ car.construction_interval_end_year }})
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '../services/api';
  
  export default {
    name: 'CarSearch',
    data() {
      return {
        brand: '',
        modelSeries: '',
        modelYear: '',
        skip: 0,
        limit: 10,
        cars: []
      };
    },
    methods: {
      async searchCars() {
        try {
          const response = await apiClient.get('/cars', {
            params: {
              brand: this.brand || undefined,
              model_series: this.modelSeries || undefined,
              model_year: this.modelYear || undefined,
              skip: this.skip || 0,
              limit: this.limit || 10
            }
          });
  
          // Your server response format: 
          // { 
          //   "data": [...array of cars...], 
          //   "skip": <number>, 
          //   "limit": <number> 
          // }
          // So we need to assign cars from response.data.data:
          this.cars = response.data.data || [];  // fallback to empty array
          // And also update skip/limit (in case the server modifies them):
          this.skip = response.data.skip;
          this.limit = response.data.limit;
  
        } catch (error) {
          console.error('Error fetching cars:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .car-search {
    margin: 1rem;
  }
  
  .car-search form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin-bottom: 1rem;
  }
  
  .car-search label {
    font-weight: bold;
    margin-top: 1rem;
  }
  
  .car-search button {
    margin-top: 1rem;
    padding: 0.5rem;
    cursor: pointer;
  }
  
  .car-results {
    margin-top: 1rem;
  }
  </style>
  