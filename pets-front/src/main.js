import { createApp } from 'vue'

import App from './App.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Profile from './components/Profile.vue'
import Home from './components/Home.vue'
import Pet from './components/Pet.vue'
import Ava from './components/Ava.vue'
import PetEdit from './components/PetEdit.vue'
import PetContainer from './components/PetContainer.vue'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button'
import Menubar from 'primevue/menubar';
import {createRouter, createWebHashHistory} from 'vue-router'

import 'primevue/resources/themes/saga-blue/theme.css'      //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import store from './store';
import ToastService from 'primevue/toastservice';


const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/login', component: Login, name: 'Login', props: true },
    { path: '/register', component: Register },
    { path: '/profile', component: Profile, name: "Profile", props: true },
    { path: '/pet-edit/:id', component: PetEdit, name: "PetEdit", props: true },
    { path: '/pet-new', component: PetContainer, name: "PetContainer",
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'pet',
        component: Pet,
        name: 'Pet',
        props: true
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: ':id/ava',
        component: Ava,
        name:'Ava',
        props: true
      }]},
  ]
  
  // 3. Create the router instance and pass the `routes` option
  // You can pass in additional options here, but let's
  // keep it simple for now.
  const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
    
  })

  router.beforeEach((to, from, next) => {
    // messages clear
    store.commit('clearErrors');
    store.commit('setAuthError', null);
    if(to.name != 'Profile' && to.name != 'Ava') {
      store.commit('setPetDeleted', null);
      store.commit('setPetSaved', null);
    }
    if ((to.name == 'Profile' || to.name == 'PetContainer') && !store.getters.user) next({ name: 'Login' })
    else next()
  })

const app = createApp({
  extends:App,
  beforeCreate() { this.$store.commit('initialiseStore') }})
app.use(PrimeVue);
app.use(router);
app.use(store);
app.use(ToastService);
app.component('Button', Button)
app.component('Menubar', Menubar)

app.mount('#app')
