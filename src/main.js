import { registerPlugins } from '@/plugins'
import App from './App.vue'
import MdiIcon from '@/components/MdiIcon.vue'
import { createApp } from 'vue'

import '@mdi/font/css/materialdesignicons.css'
import '@/styles/theme.css'
import 'unfonts.css'

const app = createApp(App)

app.component('MdiIcon', MdiIcon)

registerPlugins(app)

app.mount('#app')
