
<script>
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/inputtext';
import Button from 'primevue/button';
import axios from 'axios';
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
  data() {
    return {
        name: '',
        type: null,
        age: '',
        gender: '',
        errors: [],
        types:[
            {type:'dog', name:'Dog'}, 
            {type:'cat', name:'Cat'}
            ]
    }
  },
  validations: {
        name: { required },
        type: { required }
  },
  setup: () => ({ v$: useVuelidate() }),
  components: {
    Button,
    Fieldset,
    InputText,
    Dropdown
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
          that.$store.commit('setUser', {email: response.data.email, token: response.data.token, id: response.data.id});
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
  <Fieldset class="lg:w-6 sm:w-full m-auto">
    <p v-if="errors.length" class="text-red-500">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      <!-- <li v-for="(error, index) in v$.$errors" :key="index">{{ error.$property }} : {{ error.$message }}</li> -->
    </ul>
  </p>
    <form @submit="onSubmit">
      <div class=" field">
        <label for="name" class="w-full">Name</label>
        <InputText id="name" type="text" class="w-full" v-model="name" />
        <div class="text-red-500" v-if="v$.name.$error">This field is email</div>
      </div>
      <div class="field">
        <label for="type" class="w-full">Type</label>
        <Dropdown v-model="type" :options="types" optionLabel="name" optionValue="type" placeholder="Select a Type" />
        <div class="text-red-500" v-if="v$.type.$error">This field is required</div>
      </div>
      <div>
        <Button label="Submit" icon="pi pi-check" iconPos="right" type="submit" />
      </div>
    </form>
  </Fieldset>
</template>

<style>

</style>
