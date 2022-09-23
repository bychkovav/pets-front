
<script>
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import axios from 'axios';
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Card from 'primevue/card';
import Errors from './Errors.vue'

export default {
  data() {
    return {
      name: '',
      type: null,
      age: '',
      gender: '',
      errors: [],
      types: ["dog", "cat"
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
    Dropdown,
    Card,
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
        .post('http://127.0.0.1:8000/pet', { name: this.name, type: this.type }, { headers: { Authorization: `Bearer ${that.$store.getters.user.token}` } })
        .then(response => {
          if (response.data) {
            that.$router.push({ name: 'Ava', params: { id: response.data.id } });
          }
          else {
            that.errors.push('Something went wrong');
          }
        })
        .catch(function (error) {
          if (error.response.status == 401 || error.response.status == 403) {
            that.$store.commit('setUser', null);
            that.$router.push({ name: 'Login', params: { error: 'not_allowed' } });
          }
          else if (error.response.data) {
            that.errors.push(error.response.data.detail);
          }
          else {
            that.errors.push('Something went wrong');
          }
        });
    },
  }
}
</script>

<template>
  <form @submit="onSubmit">
    <Card class="mt-5">
      <template #header>
      </template>
      <template #title>
        Create you pet profile
      </template>
      <template #content>
        <Errors :errors="this.errors"></Errors>

        <div class="grid m-auto justify-content-center">
          <div class=" field col-4">
            <label for="name" class="w-full">Name</label>
            <InputText id="name" type="text" class="w-full" v-model="name" :class="{ 'p-invalid': v$.name.$error }" />
            <div class="text-red-500" v-if="v$.name.$error">This field is email</div>
          </div>
          <div class="field col-4">
            <label for="type" class="w-full">Type</label>
            <Dropdown v-model="type" :options="types" placeholder="Select a Type" class="w-full"
              :class="{ 'p-invalid': v$.type.$error}" />
            <div class="text-red-500" v-if="v$.type.$error">This field is required</div>
          </div>
        </div>
        <div class="flex justify-content-center">

        </div>

      </template>
      <template #footer>
        <Button label="Submit" icon="pi pi-check" iconPos="right" type="submit" />
      </template>
    </Card>
  </form>

</template>

<style>

</style>
