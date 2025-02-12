import { createApp } from 'vue';
import '@/assets/style/index.scss';
import { router } from '@/router';

import pinia from '@/store';

import App from './App.vue';

// Create vue app
const app = createApp(App);

// Register plugins
app.use(router);
app.use(pinia);

// Mount vue app
app.mount('#app');
