<template>
    <header class="bg-teal-600 text-white p-3 flex items-center relative">
      <!-- Cog / Settings button -->
      <button
        class="relative w-8 h-8 mr-2 flex items-center justify-center hover:text-orange-200"
        @click="toggleSettingsMenu"
      >
        <!-- Simple Cog Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          class="w-5 h-5"
        >
          <path
            d="M9.605 1.05c-.2-.58-1.01-.58-1.21 0l-.297.86a.5.5 0 01-.641.31l-.895-.336a.5.5 0 00-.614.194l-.358.621a.5.5 0 01-.515.206l-.967-.242c-.488-.122-.938.332-.796.816l.29.953a.5.5 0 01-.29.603l-.778.363c-.475.222-.475.928 0 1.15l.778.363a.5.5 0 01.29.603l-.29.954c-.142.483.308.938.796.816l.967-.242a.5.5 0 01.515.206l.358.621a.5.5 0 00.614.194l.895-.336a.5.5 0 01.641.31l.297.86c.2.58 1.01.58 1.21 0l.297-.86a.5.5 0 01.641-.31l.895.336a.5.5 0 00.614-.194l.358-.621a.5.5 0 01.515-.206l.967.242c.488.122.938-.332.796-.816l-.29-.954a.5.5 0 01.29-.603l.778-.363c.475-.222.475-.928 0-1.15l-.778-.363a.5.5 0 01-.29-.603l.29-.953c.142-.484-.308-.938-.796-.816l-.967.242a.5.5 0 01-.515-.206l-.358-.621a.5.5 0 00-.614-.194l-.895.336a.5.5 0 01-.641-.31l-.297-.86zM8 10a2 2 0 110-4 2 2 0 010 4z"
          />
        </svg>
  
        <!-- Dropdown -->
        <div
          v-if="showSettingsMenu"
          class="absolute top-full left-0 mt-2 w-40 bg-white text-gray-800 shadow-md border rounded z-10"
        >
          <div class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">
            ERPNext Settings
          </div>
          <div class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">
            User Settings
          </div>
        </div>
      </button>
  
      <!-- Title -->
      <h1 class="text-xl md:text-2xl font-bold flex-1 text-center">
        AGMC Parts Explorer
      </h1>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderBar',
    data() {
      return {
        showSettingsMenu: false
      };
    },
    methods: {
      toggleSettingsMenu() {
        this.showSettingsMenu = !this.showSettingsMenu;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Basic styling for the header. Using a teal background for example. */
  </style>
  