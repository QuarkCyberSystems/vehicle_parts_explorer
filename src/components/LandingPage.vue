<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">
        Welcome to the Parts Catalog
      </h1>
      <p class="text-gray-600 mb-8">Choose your search method:</p>
  
      <div class="flex flex-col space-y-4 w-full max-w-sm">
        <button
          class="bg-blue-600 text-white py-3 px-6 rounded text-lg font-semibold hover:bg-blue-700 transition-colors"
          @click="goToPartsExplorer"
        >
          Search by Part No.
        </button>
  
        <button
          class="bg-green-600 text-white py-3 px-6 rounded text-lg font-semibold hover:bg-green-700 transition-colors"
          @click="goToCarExplorer"
        >
          Search by Vehicle Make, Model & Year
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingPage',
    methods: {
      goToPartsExplorer() {
        // uses Vue Router push
        this.$router.push({ name: 'PartsExplorer' });
      },
      goToCarExplorer() {
        this.$router.push({ name: 'CarPartsExplorer' });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Basic styles for the landing page */
  </style>
  