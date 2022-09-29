
<script>
import Fieldset from "primevue/fieldset";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import axios from "axios";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Card from "primevue/card";
import { mapGetters } from "vuex";
import Errors from "./Errors.vue";
import UploadPicture from "./UploadPicture.vue";
import Avatar from "primevue/avatar";
import Divider from "primevue/divider";

export default {
  props: {
    id: Number,
  },
  data() {
    return {
      pet: {},
      types: ["dog", "cat"],
    };
  },
  validations: {
    pet: {
      name: { required },
      type: { required },
    },
  },
  watch: {
    petSaved(v) {
      if (v) {
        this.$router.push({
          name: "Profile",
          query: { message: "Your pet has been successfully saved" },
        });
      }
    },
    storedPet(v) {
      this.pet = v.pet;
    }
  },
  computed: {
    ...mapGetters({
      current_user: "user",
    }),
    petSaved() {
      return this.$store.state.petSaved;
    },
    storedPet() {
      const p = this.$store.state.pet;
       if (p && p.pet.owner_id != this.current_user.id) {
              this.$router.push({ name: "Profile" });
      }
      return p;
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
    Avatar,
    Divider,
    UploadPicture,
    InputNumber,
  },
  mounted() {
    this.$store.commit('setPetSaved', null);
    this.loadPet();
  },
  methods: {
    uploaded(link) {
      this.pet.pic = link;
    },
    loadPet() {
      this.$store.dispatch('getPet' , this.id);
    },
    async onSubmit(e) {
      const that = this;
      e.preventDefault();
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }
      this.$store.dispatch("savePet", {
        name: this.pet.name,
        type: this.pet.type,
        age: this.pet.age,
        gender: this.pet.gender,
        id: this.id
      });
    },
  },
};
</script>

<template>
  <div class="lg:w-6 sm:w-full m-auto">
    <form @submit="onSubmit">
      <Card class="mt-5">
        <template #header> </template>
        <template #title> Edit pet's profile </template>
        <template #content>
          <Errors></Errors>
          <div class="grid m-auto justify-content-center mb-5">
            <Avatar :image="pet.pic" size="xlarge" />
            <div class="w-full justify-content-center flex mt-2">
              <UploadPicture :id="id" @uploaded="uploaded"></UploadPicture>
            </div>
          </div>
          <div class="grid m-auto justify-content-center">
            <div class="field col-4">
              <label for="name" class="w-full">Name <span style="color: var(--red-600)">*</span></label>
              <InputText
                id="name"
                type="text"
                class="w-full"
                v-model="pet.name"
                :class="{ 'p-invalid': v$.pet.name.$error }"
              />
              <div class="text-red-500" v-if="v$.pet.name.$error">
                This field is email
              </div>
            </div>
            <div class="field col-4">
              <label for="type" class="w-full">Type <span style="color: var(--red-600)">*</span></label>
              <Dropdown
                v-model="pet.type"
                :options="types"
                placeholder="Select a Type"
                class="w-full"
                :class="{ 'p-invalid': v$.pet.type.$error }"
              />
              <div class="text-red-500" v-if="v$.pet.type.$error">
                This field is required
              </div>
            </div>
          </div>
          <div class="grid m-auto justify-content-center">
            <div class="field col-4">
              <label for="age" class="w-full">Age</label>
              <InputNumber
                id="age"
                type="text"
                class="w-full"
                v-model="pet.age"
              />
            </div>
            <div class="field col-4">
              <label for="gender" class="w-full">Gender</label>
              <Dropdown
                v-model="pet.gender"
                :options="['Male', 'Female']"
                placeholder="Select a Gender"
                class="w-full"
              />
            </div>
          </div>

          <div class="flex justify-content-center"></div>
        </template>
        <template #footer>
          <Button
            label="Save"
            icon="pi pi-check"
            class="p-button-success"
            iconPos="right"
            type="submit"
          />
        </template>
      </Card>
    </form>
  </div>
</template>

<style>
</style>
