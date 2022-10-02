
<script>
import Card from "primevue/card";
import Editor from "primevue/editor";
import Button from "primevue/button";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Errors from "./Errors.vue";
import Toast from "primevue/toast";
import DataView from "primevue/dataview";
import Image from "primevue/image";

export default {
  props: {
    id: Number,
  },
  data() {
    return {
      comment: null,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations: {
    comment: { required },
  },
  components: {
    Card,
    Editor,
    Errors,
    Toast,
    DataView,
    Image,
    Button
  },
  mounted() {
    this.$store.dispatch("getPet", this.id);
  },
  computed: {
    petData() {
      return this.$store.state.pet;
    },
    commentAdded() {
      return this.$store.state.commentAdded;
    },
  },
  watch:{ 
    commentAdded(v) {
      if (v) {
        this.$toast.add({
          severity: "success",
          summary: "Thank you!",
          detail: "Comment has been added",
          life: 3000,
        });
        this.$store.commit("setCommentAdded", null);
      }
    },
  },
  methods: {
    async onSubmit(e) {
      const that = this;
      e.preventDefault();
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }
      this.$store.dispatch("comment", { comment: this.comment, id: this.id });
    },
  },
};
</script>

<template>
  <div class="flex xl:w-8 w-full m-auto flex-wrap md:flex-nowrap">
    <div class="md:flex-column flex-row w-full md:mr-3 mt-2">
      <div class="p-card p-component w-full">
        <div class="p-card-body">
          <div class="p-card-title">Pet picture:</div>

          <div v-if="petData" 
            class="
              p-card-content
              align-content-center
              justify-content-center
              flex
            "
          >
            <Image :src="petData.pet.pic" alt="Image" preview height="400" />
          </div>
        </div>
      </div>
    </div>
    <div class="md:flex-column flex-row w-full md:ml-3 mt-2">
      <Card>
        <template #title> Pet details </template>
        <template #content>
          <ul class="list-none p-0 m-0" v-if="petData">
            <li class="flex">
              <a
                class="
                  flex
                  align-items-center
                  p-3
                  w-full
                  hover:surface-hover
                  transition-colors transition-duration-150
                  cursor-pointer
                "
                style="border-radius: '10px'"
                ><span class="flex flex-column"
                  ><span class="font-bold mb-1">Pet name:</span
                  ><span class="m-0 text-secondary"
                    >{{ petData.pet.name }}
                    <span v-if="petData.pet.age"
                      >{{ petData.pet.age }} ages old</span
                    ></span
                  ></span
                ></a
              >
            </li>
            <li class="flex">
              <a
                class="
                  flex
                  align-items-center
                  p-3
                  w-full
                  hover:surface-hover
                  transition-colors transition-duration-150
                  cursor-pointer
                "
                ><span class="flex flex-column"
                  ><span class="font-bold mb-1">Type</span><span class="m-0 text-secondary">
                    {{         petData.pet.type
                  }}</span></span
                >
                </a
              >
            </li>
            <li class="flex" v-if="petData.pet.type">
              <a
                class="
                  flex
                  align-items-center
                  p-3
                  w-full
                  hover:surface-hover
                  transition-colors transition-duration-150
                  cursor-pointer
                "
                style="border-radius: '10px'"
                ><span class="flex flex-column"
                  ><span class="font-bold mb-1">Gender</span
                  ><span class="m-0 text-secondary">{{
                    petData.pet.type
                  }}</span></span
                ></a
              >
            </li>
            <li class="flex" v-if="petData.pet.owner_name">
              <a
                class="
                  flex
                  align-items-center
                  p-3
                  w-full
                  hover:surface-hover
                  transition-colors transition-duration-150
                  cursor-pointer
                "
                style="border-radius: '10px'"
                ><i class="pi pi-user text-xl mr-3"></i
                ><span class="flex flex-column"
                  ><span class="font-bold mb-1">Owner</span
                  ><span class="m-0 text-secondary">{{
                    petData.pet.owner_name
                  }}</span></span
                ></a
              >
            </li>
          </ul>
        </template>
      </Card>
    </div>
  </div>

  <div class="flex xl:w-8 w-full m-auto mt-5 flex-wrap">
    <div class="p-card p-component w-full">
      <div class="p-card-body">
        <div class="p-card-title">Comments:</div>
        <DataView
          :value="petData.comments"
          v-if="petData && petData.comments"
          layout="list"
          class="mt-5"
        >
          <template #list="slotProps">
            <div class="col-12">
              <b>{{ slotProps.data.user_name }} commented:</b>
              <p v-html="slotProps.data.message" />
            </div>
          </template>
          <template #empty>No records found.</template>
        </DataView>

        <div class="p-card-content">
          <form @submit="onSubmit">
            <div>
              <Errors></Errors>
              
              <Editor
                v-model="comment"
                class="w-full"
                editorStyle="height: 320px"
                :class="{ 'p-invalid': v$.comment.$error }"
              />
              <div class="text-red-500" v-if="v$.comment.$error">
                This field is required
              </div>
              <Button
                label="Save comment"
                icon="pi pi-check"
                iconPos="right"
                type="submit"
                class="p-button-success mt-2"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
