
<script>
import axios from "axios";
import FileUpload from "primevue/fileupload";
import Errors from './Errors.vue'

export default {
  props: {
    id: Number
  },
  data() {
    return {
      errors: [],
    };
  },

  components: {
    FileUpload,
    Errors
  },
  methods: {
    myUploader(event) {
      //event.files == files to upload
      var that = this;
      var formData = new FormData();
      formData.append("pic", event.files[0]);
      axios.post(`http://127.0.0.1:8000/pet/${this.id}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${that.$store.getters.user.token}`
        },
      }).then(response => {
        if (response.data) {
          that.$emit('uploaded', response.data.link);
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
  },
};
</script>

<template>
  <div>
    <div class="grid w-full justify-content-center flex">
      <Errors :errors="this.errors"></Errors>
    </div>
    <div class="col-12 justify-content-center flex">
      <FileUpload mode="basic" name="file" :customUpload="true" @uploader="myUploader" accept="image/*"
        :maxFileSize="1000000" @upload="onUpload" />
    </div>
  </div>
</template>

<style>

</style>
