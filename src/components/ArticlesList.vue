<template>
    <div class="articles-list">
      <h2>Articles List</h2>
      <form @submit.prevent="searchArticles">
        <div>
          <label for="pcId">PC ID:</label>
          <input type="text" id="pcId" v-model="pcId" placeholder="e.g., 12472" />
        </div>
        <div>
          <label for="ptId">PT ID:</label>
          <input type="text" id="ptId" v-model="ptId" placeholder="e.g., 8" />
        </div>
        <button type="submit">Get Articles</button>
      </form>
  
      <div v-if="articles.length">
        <h3>Results</h3>
        <ul>
          <li v-for="(article, index) in articles" :key="index">{{ article }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '../services/api';
  
  export default {
    name: 'ArticlesList',
    data() {
      return {
        pcId: '',
        ptId: '',
        articles: []
      };
    },
    methods: {
      async searchArticles() {
        try {
          const response = await apiClient.get('/articles', {
            params: {
              pc_id: this.pcId,
              pt_id: this.ptId
            }
          });
          this.articles = response.data;
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .articles-list {
    margin: 1rem;
  }
  </style>
  