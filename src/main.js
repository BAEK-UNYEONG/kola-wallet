import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import VueClipboard from 'vue-clipboard2'

import './assets/scss/style.scss'

createApp(App)
  .use(router)
  .use(VueClipboard)
  .mount('#app')
