<script>
import Message from 'primevue/message';

export default {
    components: {
        Message,
    },
    computed: {
        errors() {
            return this.$store.state.errors;
        }
    }

}
</script>
<template>
    <Message v-for="msg of errors" severity="error" :key="msg">{{msg}}</Message>

</template>