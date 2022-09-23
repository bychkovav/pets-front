import { createStore } from 'vuex';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/';

const store = createStore({
  state: {
    email: null,
    token: null,
    id: null,
    errors: [],
    usersPets: []
  },
  mutations: {
    setUser(state, user) {
      state.email = user ? user.email : null;
      state.token = user ? user.token : null;
      state.id = user ? user.id : null;
    },
    setError(state, arr) {
      state.errors = arr;
    },
    clearErrors(state) {
      state.errors = [];
    },
    setUserPets(state, pets) {
      state.usersPets = pets;
    },
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem('store')) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        );
      }
    }
  },
  actions: {
    async getUsersPets(context) {
      context.commit("clearErrors");
      try {
        const response = await axios
          .post(`${baseUrl}pets`, { user_id: context.state.id }, { headers: { Authorization: `Bearer ${context.state.token}` } });
        if (response.data) {
          context.commit("setUserPets", response.data);
        }
        else {
          context.commit("setError", ["Something went wrong"]);
        }
      }
      catch (error) {
        context.commit("setError", ["Something went wrong"]);
      }
    },
    async deletePet(context, id) {
      context.commit("clearErrors");
      try {
        await axios
          .delete(`${baseUrl}pet/${id}`, { headers: { Authorization: `Bearer ${context.state.token}` } });
        context.dispatch('getUsersPets');
      } catch (error) {
        context.commit("setError", ["Something went wrong"]);
      }
    },
    async login(context, data) {
      context.commit("clearErrors");
      try {
        const response = await axios
          .post(`${baseUrl}login`, data);
        if(response.data) {
          context.commit('setUser', { email: response.data.email, token: response.data.token, id: response.data.id });
        }
        else {
          context.commit("setError", ["Something went wrong"]);
        }
      }
      catch (error) {
        context.commit("setError", ["Something went wrong"]);
      }
    }
  },
  getters: {
    user(state) {
      return state.token && state.id ? { email: state.email, token: state.token, id: state.id } : null;
    }
  },
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('store', JSON.stringify(state));
});

export default store