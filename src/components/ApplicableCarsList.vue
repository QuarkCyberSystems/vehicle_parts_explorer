<template>
    <div class="applicable-cars-list">
      <h2>Applicable Cars</h2>
      <form @submit.prevent="searchApplicableCars">
        <div>
          <label for="arlSearchNumber">ARL Search Number:</label>
          <input type="text" id="arlSearchNumber" v-model="arlSearchNumber" placeholder="e.g., 13718511668" />
        </div>
        <button type="submit">Get Applicable Cars</button>
      </form>
  
      <div v-if="applicableCars.length">
        <h3>Results</h3>
        <ul>
          <li v-for="(car, index) in applicableCars" :key="index">{{ car }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '../services/api';
  
  export default {
    name: 'ApplicableCarsList',
    data() {
      return {
        arlSearchNumber: '',
        applicableCars: []
      };
    },
    methods: {
      async searchApplicableCars() {
        try {
          const response = await apiClient.get('/applicable_cars', {
            params: {
              arl_search_number: this.arlSearchNumber,
            }
          });
          this.applicableCars = response.data;
        } catch (error) {
          console.error('Error fetching applicable cars:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .applicable-cars-list {
    margin: 1rem;
  }
  </style>
  