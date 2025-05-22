// Plugins
import vuetify from './vuetify'
import store from './store.js'
import router from '@/router'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(store)
    .use(router)
}
