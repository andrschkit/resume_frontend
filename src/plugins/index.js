import store from './store.js'
import router from '@/router'

export function registerPlugins(app) {
  app.use(store).use(router)
}
