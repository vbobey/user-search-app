import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      user: {},
      theme: 'light'
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async getUser(context, username) {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const responseData = await response.json();
      context.commit('setUser', responseData);
    }
  }
});

export default store;
