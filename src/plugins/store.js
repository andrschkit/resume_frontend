import { createStore } from 'vuex'

import resume_store from '@/store/resume_store.js'

const store = {
  modules: {
    resume_store,
  },
}
export default createStore(store)
