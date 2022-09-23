<script>
import Message from 'primevue/message';

export default {
    props:{
        errors: []
    },
    components: {
        Message,
  }

}
</script>
<template>
    <Message  v-for="msg of errors" severity="error" :key="msg">{{msg}}</Message>

</template>