import { createStore } from 'vuex';

const store = createStore({
  state: {
    email: null,
    token: null,
    id: null
  },
  mutations: {
    setUser(state, user) {
      state.email = user? user.email: null;
      state.token = user? user.token:null;
      state.id = user?user.id:null;
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
      return state.token && state.user? { user: state.user, token: state.token} :null;
    }
  },
});

store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem('store', JSON.stringify(state));
});

export default store