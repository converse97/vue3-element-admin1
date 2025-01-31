import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
    };
  },
  getters: {
    getToken: (state) => {
      return state.token;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    logout() {
      this.token = '';
    },
  },
});
