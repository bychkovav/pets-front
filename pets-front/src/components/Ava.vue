
<script>
import axios from "axios";
import FileUpload from "primevue/fileupload";
import Card from "primevue/card";

export default {
  props: {
    id: Number,
  },
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    petSaved() {
      return this.$store.state.petSaved;
    },
  },
  watch: {
    petSaved(v) {
      this.$router.push({name: 'Profile', query: {message: 'Your pet has been successfully saved'}});
    },
  },
  mounted() {},
  components: {
    FileUpload,
    Card,
  },
  methods: {
    myUploader(event) {
      //event.files == files to upload
      var that = this;
      var formData = new FormData();
      formData.append("pic", event.files[0]);
      this.$store.dispatch("uploadAvatar", { formData, id: this.id });
    },
  },
};
</script>

<template>
  <Card class="mt-5">
    <template #title> Upload avatar of your pet </template>
    <template #content>
      <FileUpload
        mode="basic"
        name="file"
        :customUpload="true"
        @uploader="myUploader"
        accept="image/*"
        :maxFileSize="1000000"
        @upload="onUpload"
      />
    </template>
  </Card>
</template>

<style>
</style>
