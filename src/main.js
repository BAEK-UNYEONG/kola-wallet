import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'
import VueClipboard from 'vue-clipboard2'

import './assets/scss/style.scss'

createApp(App)
  .use(router)
  .use(store)
  .use(axios)
  .use(VueClipboard)
  .mount('#app')
