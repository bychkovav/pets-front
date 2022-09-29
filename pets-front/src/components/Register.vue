
<script>
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import axios from 'axios';
import { email, required, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Errors from './Errors.vue'

export default {
  data() {
    return {
      login: '',
      password: '',
      confirm_password: '',
      errors: []
    }
  },
  validations: {
    login: { required, email },
    password: { required },
    confirm_password: { required }
  },
  setup: () => ({ v$: useVuelidate() }),
  components: {
    Button,
    Fieldset,
    InputText,
    Password,
    Errors
  },
  methods: {
    async onSubmit(e) {
      this.errors = []
      const that = this;
      e.preventDefault();
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }
      axios
        .post('http://127.0.0.1:8000/register', { email: this.login, password: this.password, confirm_password: this.confirm_password })
        .then(response => {
          if (response.data) {
            that.$store.commit('setUser', { email: response.data.email, token: response.data.token, id: response.data.id });
          }
          else {
            that.errors.push('Something went wrong');
          }
        })
        .catch(function (error) {
          if (error.response.data) {
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
  <Fieldset legend="Registration" class="lg:w-6 sm:w-full m-auto">
    <Errors :errors="this.errors"></Errors>
    <form @submit="onSubmit">
      <div class=" field">
        <label for="login" class="w-full">Login <span style="color: var(--red-600)">*</span></label>
        <InputText id="login" type="text" class="w-full" v-model="login" :class="{ 'p-invalid': v$.login.$error}" />
        <div class="text-red-500" v-if="v$.login.$error">This field is email</div>
      </div>
      <div class="field">
        <label for="password" class="w-full">Password <span style="color: var(--red-600)">*</span></label>
        <Password id="password" :style="{width: '100%'}" class="w-full" type="text" v-model="password" toggleMask
          :class="{ 'p-invalid': v$.password.$error}" />
        <div class="text-red-500" v-if="v$.password.$error">This field is required</div>
      </div>
      <div class="field">
        <label for="confirm_password" class="w-full">Confirm password</label>
        <Password id="confirm_password" :style="{width: '100%'}" class="w-full" type="text" v-model="confirm_password"
          toggleMask :class="{ 'p-invalid': v$.confirm_password.$error}" />
        <div class="text-red-500" v-if="v$.confirm_password.$error">This field is required and should be the same as
          Password</div>
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
