import { createStore } from 'vuex';

const store = createStore({
  state: {
    email: null,
    token: null,
    id: null
  },
  mutations: {
    setUser(state, user) {
      state.email = user.email;
      state.token = user.token;
      state.id = user.id;
    },
    initialiseStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
		}
  },
  actions: {},
  getters: {
    user(state) {
      return state.token && state.user? { user: state.user, token: state} :null;
    }
  },
});

store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem('store', JSON.stringify(state));
});

export default store