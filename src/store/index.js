import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    AuthToken: '',
    Error: null
  },
  mutations: {
    setAuthToken: (state, payload) => {
      state.AuthToken = payload
    },
    setError: (state, payload) => {
      state.Error = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
