import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'vue-loading-overlay/dist/css/index.css';

createApp(App)
    .use(createPinia())
    .mount('#app')
