
<script>
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import axios from 'axios';
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
  data() {
    return {
        login: '',
        password: '',
      errors: []
    }
  },
  validations: {
        login: { required, email },
        password: { required }
  },
  setup: () => ({ v$: useVuelidate() }),
  components: {
    Button,
    Fieldset,
    InputText,
    Password
  },
  methods: {
    async onSubmit(e) {
      this.errors = []
      const that = this;
      e.preventDefault();
      const isFormCorrect = await this.v$.$validate();
      if(!isFormCorrect) {
        return;
      }
      axios
      .post('http://127.0.0.1:8000/login', {email: this.login, password: this.password})
      .then(response => {
        if(response.data) {
          that.$store.commit('setUser', response.data.email);
          that.$store.commit('setToken', response.data.token);
        }
        else {
          that.errors.push('Something went wrong');
        }
      })
      .catch(function (error) {
        if(error.response.data){
          that.errors.push(error.response.data.detail);
        } 
        else {
          that.errors.push('Something went wrong');
        }
      });
    }
  }
}
</script>

<template>
  <Fieldset legend="Login" class="lg:w-6 sm:w-full m-auto">
    <p v-if="errors.length" class="text-red-500">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      <!-- <li v-for="(error, index) in v$.$errors" :key="index">{{ error.$property }} : {{ error.$message }}</li> -->
    </ul>
  </p>
    <form @submit="onSubmit">
      <div class=" field">
        <label for="login" class="w-full">Login</label>
        <InputText id="login" type="text" class="w-full" v-model="login" />
        <div class="text-red-500" v-if="v$.login.$error">This field is email</div>
      </div>
      <div class="field">
        <label for="password" class="w-full">Password</label>
        <Password id="password" :style="{width: '100%'}" class="w-full" type="text" v-model="password" toggleMask />
        <div class="text-red-500" v-if="v$.password.$error">This field is required</div>
      </div>
      <div>
        <Button label="Submit" icon="pi pi-check" iconPos="right" type="submit" />
      </div>
    </form>
  </Fieldset>
</template>

<style>
.p-password .p-inputtext {
  width: 100% !important;
}
</style>
