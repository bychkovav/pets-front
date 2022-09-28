
<script>
import axios from "axios";
import FileUpload from "primevue/fileupload";
import Card from "primevue/card";
import UploadPicture from './UploadPicture.vue'

export default {
  props: {
    id: Number,
  },
  data() {
    return {};
  },
  mounted() {
    //this.$store.commit("setPetSaved", null);
  },
  components: {
    FileUpload,
    Card,
    UploadPicture
  },
  methods: {
    uploaded(link) {
      this.$router.push({
        name: "Profile"
      });
    },
  },
};
</script>

<template>
  <UploadPicture :id="id" @uploaded="uploaded"></UploadPicture>
</template>

<style>
</style>
