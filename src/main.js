import Vue from 'vue'
import {createApp} from 'vue'
import App from '@/App.vue'
import mitt from 'mitt'
import router from '@/router'
import store from '@/store'
import axios from '@/plugins/axios'
import VueClipboard from 'vue-clipboard2'

import 'boxicons/css/boxicons.min.css'
import '@/assets/scss/style.scss'

const emitter = mitt();
const app = createApp(App)
app.config.globalProperties.emitter = emitter
app
  .use(router)
  .use(store)
  .use(axios)
  .use(VueClipboard)
  .mount('#app')
