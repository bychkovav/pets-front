
<script>
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import axios from 'axios';
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Errors from './Errors.vue'

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
    Password,
    Errors
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
  watch: {
    token(v) {
      if (v) {
        this.$router.push({name : 'Profile'});
      }
    }
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
      this.$store.dispatch("login", {email:this.login, password:this.password});
    }
  }
}
</script>

<template>
  <Fieldset legend="Login" class="lg:w-6 sm:w-full m-auto">
    <Errors></Errors>
    <form @submit="onSubmit">
      <div class=" field">
        <label for="login" class="w-full">Login <span style="color: var(--red-600)">*</span></label>
        <InputText id="login" type="text" class="w-full" v-model="login" :class="{ 'p-invalid': v$.login.$error }"/>
        <div class="text-red-500" v-if="v$.login.$error">This field is email</div>
      </div>
      <div class="field">
        <label for="password" class="w-full">Password <span style="color: var(--red-600)">*</span></label>
        <Password id="password" :style="{width: '100%'}" class="w-full" :class="{ 'p-invalid': v$.password.$error }" type="text" v-model="password" toggleMask />
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
