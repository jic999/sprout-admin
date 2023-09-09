import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import { setupRouter } from './router'
import 'uno.css'
import '@/styles/index.scss'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(App)

async function setupApp() {
  app.use(VueCookies, { expires: '7d' })
  app.use(createPinia())
  await setupRouter(app)
  app.mount('#app')
}

setupApp()
