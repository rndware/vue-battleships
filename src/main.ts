import './assets/css/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.config.errorHandler = (err, _, info) => {
  console.error('Vue error:', err, info)
  router.push({ name: 'error' })
}

app.mount('#app')
