import {
  createStore
} from 'vuex';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/';

function processError(context, error) {
  if (error.response && (error.response.status == 401 || error.response.status == 403)) {
    context.commit("setUser", null);
    context.commit('setAuthError', true);
  } else {
    context.commit("setError", ["Something went wrong"]);
  }
}

const store = createStore({
  state: {
    email: null,
    token: null,
    id: null,
    errors: [],
    usersPets: [],
    pets: [],
    authError: null,
    newPetId: null,
    petSaved: null,
    petDeleted: null
  },
  mutations: {
    setUser(state, user) {
      state.email = user ? user.email : null;
      state.token = user ? user.token : null;
      state.id = user ? user.id : null;
    },
    setPetDeleted(state, val) {
      state.petDeleted = val;
    },
    setPetSaved(state, val) {
      state.petSaved = val;
    },
    setNewPetId(state, val) {
      state.newPetId = val;
    },
    setError(state, arr) {
      state.errors = arr;
    },
    setAuthError(state, v) {
      state.authError = v;
    },
    clearErrors(state) {
      state.errors = [];
    },
    setUserPets(state, pets) {
      state.usersPets = pets;
    },
    setPets(state, pets) {
      state.pets = pets;
    },
    initialiseStore(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        );
      }
    }
  },
  actions: {
    async uploadAvatar(context, data) {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/pet/${data.id}/image`, data.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${context.state.token}`
          },
        });

        if (response.data) {
          context.commit("setPetSaved", true);
        } else {
          context.commit("setError", ["Something went wrong"]);
        }
      } catch (error) {
        processError(error);
      };
    },
    async savePet(context, pet) {
      context.commit("clearErrors");
      try {
        const response = await axios
          .post(`${baseUrl}pet`, {
            name: pet.name,
            type: pet.type
          }, {
            headers: {
              Authorization: `Bearer ${context.state.token}`
            }
          });
        if (response.data) {
          context.commit('setNewPetId', response.data.id);
        } else {
          context.commit("setError", ["Something went wrong"]);
        }
      } catch (error) {
        processError(context, error);
      }
    },
    async getPets(context, paging) {
      context.commit("clearErrors");
      try {
        const response = await axios
          .post(`${baseUrl}pets`, {});
        if (response.data) {
          context.commit("setPets", response.data, {
            headers: {
              Authorization: `Bearer ${context.state.token}`
            }
          });
        } else {
          context.commit("setError", ["Something went wrong"]);
        }
      } catch (error) {
        context.commit("setError", ["Something went wrong"]);
      };
    },
    async getUsersPets(context) {
      context.commit("clearErrors");
      try {
        const response = await axios
          .post(`${baseUrl}pets`, {
            user_id: context.state.id
          }, {
            headers: {
              Authorization: `Bearer ${context.state.token}`
            }
          });
        if (response.data) {
          context.commit("setUserPets", response.data);
        } else {
          context.commit("setError", ["Something went wrong"]);
        }
      } catch (error) {
        processError(context, error);
      }
    },
    async deletePet(context, id) {
      context.commit("clearErrors");
      try {
        await axios
          .delete(`${baseUrl}pet/${id}`, {
            headers: {
              Authorization: `Bearer ${context.state.token}`
            }
          });
        context.dispatch('getUsersPets');
        context.commit('setPetDeleted', true);
      } catch (error) {
        processError(context, error);
      }
    },
    async login(context, data) {
      context.commit("clearErrors");
      try {
        const response = await axios
          .post(`${baseUrl}login`, data);
        if (response.data) {
          context.commit('setUser', {
            email: response.data.email,
            token: response.data.token,
            id: response.data.id
          });
        } else {
          context.commit("setError", ["Something went wrong"]);
        }
      } catch (error) {
        processError(context, error);
      }
    }
  },
  getters: {
    user(state) {
      return state.token && state.id ? {
        email: state.email,
        token: state.token,
        id: state.id
      } : null;
    }
  },
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('store', JSON.stringify(state));
});

export default store