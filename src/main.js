import './styles/common.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { lazyPlugin } from './directives'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia();
pinia.use(piniaPersist);

app.use(pinia)
app.use(router)
app.use(lazyPlugin);

app.mount('#app')
