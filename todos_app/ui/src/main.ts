import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'
import { router } from './routes';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);

// Create a Pinia instance
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

// Tell Vue to use Pinia
app.use(pinia);

app.use(router)
app.mount('#app');