import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      user: null,
      theme: 'light'
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    }
  },
  actions: {
    async getUser(context, username) {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        context.commit('setUser', null);
        throw new Error('User not found');
      }

      const responseData = await response.json();
      context.commit('setUser', responseData);
    },
    setTheme(context, theme) {
      context.commit('setTheme', theme);
    },
    toggleTheme(context) {
      context.commit('toggleTheme');
    }
  }
});

export default store;
