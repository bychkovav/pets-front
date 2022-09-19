
<script>
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import axios from 'axios';

export default {
  data() {
    return {
      login: '',
      password: '',
      errors: []
    }
  },
  components: {
    Button,
    Fieldset,
    InputText,
    Password
  },
  methods: {
    onSubmit(e) {
      this.errors = []
      const that = this;
      e.preventDefault();
      axios
      .post('http://0.0.0.0:8000/login', {email: this.login, password: this.password})
      .then(response => (alert(response)))
      .catch(function (error) {
          that.errors.push(error.response.data.detail);
      });
    }
  }
}
</script>

<template>
  <Fieldset legend="Login" class="w-6 m-auto">
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>
    <form @submit="onSubmit">
      <div class=" field">
        <label for="login" class="w-full">Login</label>
        <InputText id="login" type="text" class="w-full" v-model="login" />

      </div>
      <div class="field">
        <label for="password" class="w-full">Password</label>
        <Password id="password" :style="{width: '100%'}" class="w-full" type="text" v-model="password" toggleMask />

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
