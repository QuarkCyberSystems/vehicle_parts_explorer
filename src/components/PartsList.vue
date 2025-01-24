<template>
    <div class="parts-list">
      <h2>Parts List</h2>
      <form @submit.prevent="searchParts">
        <div>
          <label for="pcId">PC ID:</label>
          <input type="text" id="pcId" v-model="pcId" placeholder="e.g., 12472" />
        </div>
        <button type="submit">Get Parts</button>
      </form>
  
      <div v-if="parts.length">
        <h3>Results</h3>
        <ul>
          <li v-for="(part, index) in parts" :key="index">{{ part }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '../services/api';
  
  export default {
    name: 'PartsList',
    data() {
      return {
        pcId: '',
        parts: []
      };
    },
    methods: {
      async searchParts() {
        try {
          const response = await apiClient.get('/parts', {
            params: {
              pc_id: this.pcId
            }
          });
          this.parts = response.data; 
          // Adjust based on actual API response structure
        } catch (error) {
          console.error('Error fetching parts:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .parts-list {
    margin: 1rem;
  }
  
  .parts-list label {
    font-weight: bold;
  }
  </style>
  