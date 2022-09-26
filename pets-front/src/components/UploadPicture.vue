
<script>
import FileUpload from "primevue/fileupload";
import Errors from "./Errors.vue";

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
    uploadedLnk() {
      return this.$store.state.uploadedLnk;
    },
  },
  watch: {
    uploadedLnk(v) {
      if (v) {
        this.$emit("uploaded", v);
      }
    },
  },
  methods: {
    myUploader(event) {
      var that = this;
      var formData = new FormData();
      formData.append("pic", event.files[0]);
      this.$store.dispatch("uploadAvatar", { formData, id: this.id });
    },
  },
  components: {
    FileUpload,
    Errors,
  },
};
</script>

<template>
  <div>
    <div class="grid w-full justify-content-center flex">
      <Errors :errors="this.errors"></Errors>
    </div>
    <div class="col-12 justify-content-center flex">
      <FileUpload
        mode="basic"
        name="file"
        :customUpload="true"
        @uploader="myUploader"
        accept="image/*"
        :maxFileSize="1000000"
        @upload="onUpload"
      />
    </div>
  </div>
</template>

<style>
</style>
