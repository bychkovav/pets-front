
<script>
import axios from "axios";
import FileUpload from "primevue/fileupload";
import Card from 'primevue/card';

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
    Card
  },
  methods: {
    myUploader(event) {
      //event.files == files to upload
      var that = this;
      var formData = new FormData();
      formData.append("file", event.files[0]);
      axios.post(`http://127.0.0.1:8000/pet/${this.id}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${that.$store.getters.user.token}`
        },
      }).then(response => {
        if(response.data) {
          that.$router.push({path: '/profile', params: { success: 'true' }});
        }
        else {
          that.errors.push('Something went wrong');
        }
      })
      .catch(function (error) {
        if(error.response.status == 401 || error.response.status == 403) {
            that.$store.commit('setUser', null);
            that.$router.push({path: '/login', params: { error: 'not_allowed' }});
        }
        else if(error.response.data){
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
  <Card class="mt-5">
    <template #title> Upload avatar of your pet </template>
    <template #content>
      <FileUpload
        mode="basic"
        name="file"
        :customUpload="true"
        @uploader="myUploader"
        accept="image/*"
        :maxFileSize="100000"
        @upload="onUpload"
      />
    </template>
  </Card>
</template>

<style>
</style>
