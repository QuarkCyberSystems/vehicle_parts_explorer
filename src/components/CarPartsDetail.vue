<template>
    <div v-if="parts.length > 0" class="bg-white shadow rounded-lg p-4 mb-6">
      <h3 class="text-xl font-semibold mb-2">Parts for PC ID: {{ pcId }}</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-200">
          <thead class="bg-gray-100 border-b border-gray-200">
            <tr>
              <th class="py-2 px-4 text-left">Part Description</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(part, idx) in parts"
              :key="idx"
              class="border-b border-gray-200 hover:bg-gray-50"
            >
              <!-- Show pt_des and keep track of pt_id if needed -->
              <td class="py-2 px-4">
                {{ part.pt_des }}
                <span class="text-gray-500 text-sm">(pt_id: {{ part.pt_id }})</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
    <!-- If we've fetched but got no parts, show a message -->
    <div v-else-if="fetched" class="bg-white shadow rounded-lg p-4 mb-6">
      <p class="text-gray-700">No parts found for PC ID: {{ pcId }}</p>
    </div>
  </template>
  
  <script>
  import apiClient from '../services/api';
  
  export default {
    name: 'CarPartsDetail',
    props: {
      pcId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        parts: [],
        fetched: false // to know when we've fetched (so we can show "No parts" if empty)
      };
    },
    async mounted() {
      // Fetch parts when the component mounts
      await this.fetchParts();
    },
    methods: {
      async fetchParts() {
        try {
          const response = await apiClient.get('/parts', {
            params: {
              pc_id: this.pcId
            }
          });
          // According to your sample data, response might look like:
          // { "data": [...], "skip": 0, "limit": 20 }
          this.parts = response.data.data || [];
          this.fetched = true;
        } catch (error) {
          console.error('Error fetching parts:', error);
          this.fetched = true;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  