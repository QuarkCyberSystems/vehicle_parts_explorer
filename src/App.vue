<template>
  <!-- Use a vertical flex layout to place Header at top, Footer at bottom -->
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Global Header -->
    <Header />

    <!-- Main content: router-view to show whichever route is active -->
    <main class="flex-1 p-4">
      <router-view />
    </main>

    <!-- Global Footer -->
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,   // Your global header (with the cog icon & dropdown)
    Footer    // Your global footer ("Powered by QCS" linking to quacks.com)
  }
};
</script>

<style>
/* 
  .min-h-screen flex flex-col:
    - min-h-screen ensures it fills the full browser height
    - flex flex-col organizes header at the top, main in the middle, footer at the bottom
  .bg-gray-50 is a Tailwind class for a subtle gray background
*/
</style>
