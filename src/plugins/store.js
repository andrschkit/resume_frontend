import { createStore } from 'vuex'

import about_store from '@/store/about_store.js'

const store = {
  modules: {
    about_store,
  },
}
export default createStore(store);
