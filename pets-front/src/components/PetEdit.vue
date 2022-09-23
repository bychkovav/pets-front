
<script>
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import axios from 'axios';
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Card from 'primevue/card';
import { mapGetters } from "vuex";
import Errors from './Errors.vue'
import UploadPicture from './UploadPicture.vue'
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';


export default {
  props: {
    id: Number
  },
  data() {
    return {
      pet: {},
      errors: [],
      types: ["dog", "cat"
      ]
    }
  },
  validations: {
    pet: {
      name: { required },
      type: { required }
    }
  },
  computed: {
    ...mapGetters({
      current_user: "user",
    }),
  },
  setup: () => ({ v$: useVuelidate() }),
  components: {
    Button,
    Fieldset,
    InputText,
    Dropdown,
    Card,
    Errors,
    Avatar,
    Divider,
    UploadPicture
  },
  mounted() {
    this.loadPet();
  },
  methods: {
    uploaded(link) {
      this.pet.pic = link;
    },
    loadPet() {
      const that = this;
      axios
        .get(`http://127.0.0.1:8000/pet/${this.id}`)
        .then((response) => {
          if (response.data) {
            this.pet = response.data.pet;
            if (this.pet.owner_id != that.current_user.id) {
              that.$router.push({ name: 'Profile' });
            }
          } else {
            that.errors.push("Something went wrong");
          }
        })
        .catch(function (error) {
          that.errors.push("Something went wrong");
        });
    },
    async onSubmit(e) {
      this.errors = []
      const that = this;
      e.preventDefault();
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }
      axios
        .post('http://127.0.0.1:8000/pet', { name: this.pet.name, type: this.pet.type }, { headers: { Authorization: `Bearer ${that.$store.getters.user.token}` } })
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
  <div class="lg:w-6 sm:w-full m-auto">
    <form @submit="onSubmit">
      <Card class="mt-5">
        <template #header>
        </template>
        <template #title>
          Edit pet's profile
        </template>
        <template #content>
          <Errors :errors="this.errors"></Errors>
          <div class="grid m-auto justify-content-center mb-5">
            <Avatar :image="pet.pic" size="xlarge" />
            <div class="w-full justify-content-center flex mt-2">
              <UploadPicture :id="id" @uploaded="uploaded"></UploadPicture>
            </div>
          </div>
          <div class="grid m-auto justify-content-center">

            <div class=" field col-4">
              <label for="name" class="w-full">Name</label>
              <InputText id="name" type="text" class="w-full" v-model="pet.name"
                :class="{ 'p-invalid': v$.pet.name.$error }" />
              <div class="text-red-500" v-if="v$.pet.name.$error">This field is email</div>
            </div>
            <div class="field col-4">
              <label for="type" class="w-full">Type</label>
              <Dropdown v-model="pet.type" :options="types" placeholder="Select a Type" class="w-full"
                :class="{ 'p-invalid': v$.pet.type.$error}" />
              <div class="text-red-500" v-if="v$.pet.type.$error">This field is required</div>
            </div>
          </div>
          <div class="flex justify-content-center">

          </div>

        </template>
        <template #footer>
          <Button label="Save" icon="pi pi-check" class="p-button-success" iconPos="right" type="submit" />
        </template>
      </Card>
    </form>
  </div>
</template>

<style>

</style>
