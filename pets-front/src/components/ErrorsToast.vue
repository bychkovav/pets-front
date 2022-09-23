<script>
import Toast from 'primevue/message';

export default {
    components: {
        Toast,
    },
    computed: {
        errors() {
            return this.$store.state.errors;
        }
    }

}
</script>
<template>
    <Toast v-for="msg of errors"  severity="error"  :key="msg" position="top-right" life="3000">{{msg}}</Toast>
</template>