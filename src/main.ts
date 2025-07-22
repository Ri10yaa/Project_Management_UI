import './assets/main.css'

import { SnackbarService, Vue3Snackbar,  } from "vue3-snackbar";

import "vue3-snackbar/styles";

import  Notifications  from '@kyvg/vue3-notification';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component("vue3-snackbar", Vue3Snackbar);
app.use(SnackbarService);

app.use(Notifications)

app.use(createPinia())
app.use(router)

app.mount('#app')
