
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
import InputNumber from "primevue/inputnumber";

export default {
  data() {
    return {
      name: '',
      type: null,
      age: null,
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
  computed: {
    newPetId() {
      return this.$store.state.newPetId;
    }
  },
  watch: {
    newPetId(v) {
      if(v) {
        const id = this.newPetId;
        this.$router.push({ name: 'Ava', params: { id } });
        this.$store.commit('setNewPetId', null)
      }
    }
  },
  setup: () => ({ v$: useVuelidate() }),
  components: {
    Button,
    Fieldset,
    InputText,
    Dropdown,
    Card,
    Errors,
    InputNumber
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
    async onSubmit(e) {
      this.errors = []
      const that = this;
      e.preventDefault();
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }

      this.$store.dispatch('savePet' , {name: this.name, type: this.type ,age: this.age,
        gender: this.gender,});
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
            <label for="name" class="w-full">Name <span style="color: var(--red-600)">*</span></label>
            <InputText id="name" type="text" class="w-full" v-model="name" :class="{ 'p-invalid': v$.name.$error }" />
            <div class="text-red-500" v-if="v$.name.$error">This field is email</div>
          </div>
          <div class="field col-4">
            <label for="type" class="w-full">Type <span style="color: var(--red-600)">*</span></label>
            <Dropdown v-model="type" :options="types" placeholder="Select a Type" class="w-full"
              :class="{ 'p-invalid': v$.type.$error}" />
            <div class="text-red-500" v-if="v$.type.$error">This field is required</div>
          </div>
        </div>
             <div class="grid m-auto justify-content-center">
            <div class="field col-4">
              <label for="age" class="w-full">Age</label>
              <InputNumber
                id="age"
                type="text"
                class="w-full"
                v-model="age"
              />
            </div>
            <div class="field col-4">
              <label for="gender" class="w-full">Gender</label>
              <Dropdown
                v-model="gender"
                :options="['Male', 'Female']"
                placeholder="Select a Gender"
                class="w-full"
              />
            </div>
          </div>

        <div class="flex justify-content-center">

        </div>

      </template>
      <template #footer>
        <Button label="Submit" icon="pi pi-check" iconPos="right" type="submit"  class="p-button-success" /> &nbsp;
         <Button label="Cancel" icon="pi pi-times" class="p-button-danger" iconPos="right" @click="goBack()" />
      </template>
    </Card>
  </form>

</template>

<style>

</style>
