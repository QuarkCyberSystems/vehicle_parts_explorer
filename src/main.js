import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // import our router setup
import './assets/tailwind.css';

const app = createApp(App);

// Tell Vue to use the router
app.use(router);

app.mount('#app');
