import './styles/common.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import { getCategory }  from '@/apis/testAPI'

getCategory()
  .then(res =>console.log(res))
  .catch(error => console.error(error))

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)


app.mount('#app')
