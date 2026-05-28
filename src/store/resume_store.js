const BASEURL = import.meta.env.VITE_API_URL
const API_KEY_NAME = import.meta.env.VITE_API_NAME
const API_KEY_VALUE = import.meta.env.VITE_API_KEY

// Создаем общий объект заголовков
const headers = new Headers()
headers.append(API_KEY_NAME, API_KEY_VALUE)

// Общая функция для запросов
const fetchData = async (url) => {
  const response = await fetch(url, { headers })
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
  return response.json()
}

export default {
  namespaced: true,
  state: () => ({
    work_places: [],
    users: [],
    education_places: [],
    products: [],
    backend_skills: [],
    frontend_skills: [],
    main_skills: [],
    error: null,
  }),

  getters: {
    work_places_all: (state) => state.work_places,
    work_places_one: (state) => (id) => state.work_places.find((item) => item.id === id),

    users_all: (state) => state.users,
    users_one: (state) => (id) => state.users.find((item) => item.id === id),

    education_places_all: (state) => state.education_places,
    education_places_one: (state) => (id) => state.education_places.find((item) => item.id === id),

    products_all: (state) => state.products,
    products_one: (state) => (id) => state.products.find((item) => item.id === id),

    backend_skills_all: (state) => state.backend_skills,
    backend_skills_one: (state) => (id) => state.backend_skills.find((item) => item.id === id),

    frontend_skills_all: (state) => state.frontend_skills,
    frontend_skills_one: (state) => (id) => state.frontend_skills.find((item) => item.id === id),

    main_skills_all: (state) => state.main_skills,
    main_skills_one: (state) => (id) => state.main_skills.find((item) => item.id === id),
  },

  mutations: {
    setData(state, { prop, data }) {
      state[prop] = data
    },
    setError(state, error) {
      state.error = error
    },
  },

  actions: {
    async fetchData({ commit }, { endpoint, prop }) {
      try {
        const data = await fetchData(`${BASEURL}/${endpoint}`)
        commit('setData', { prop, data })
      } catch (error) {
        commit('setError', error.message)
        console.error('Request failed:', error)
      }
    },

    // Инициализаторы для разных конечных точек
    async loadWorkPlaces({ dispatch }) {
      await dispatch('fetchData', { endpoint: 'works', prop: 'work_places' })
    },
    async loadUsers({ dispatch }) {
      await dispatch('fetchData', { endpoint: 'users', prop: 'users' })
    },
    async loadEducationPlaces({ dispatch }) {
      await dispatch('fetchData', { endpoint: 'educations', prop: 'education_places' })
    },
    async loadProducts({ dispatch }) {
      await dispatch('fetchData', { endpoint: 'products', prop: 'products' })
    },
    async loadBackendSkills({ dispatch }) {
      await dispatch('fetchData', { endpoint: 'back/skills', prop: 'backend_skills' })
    },
    async loadFrontendSkills({ dispatch }) {
      await dispatch('fetchData', { endpoint: 'front/skills', prop: 'frontend_skills' })
    },
    async loadMainSkills({ dispatch }) {
      await dispatch('fetchData', { endpoint: 'main/skills', prop: 'main_skills' })
    },
  },
}
