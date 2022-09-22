<script>
import Steps from 'primevue/steps';
import Toast from 'primevue/toast';

export default {
    components: {
        Steps,
        Toast
  },
  data() {
    return {
        steps: [{
                label: 'Description',
                to: '/pet'
            },
            {
                label: 'Ava',
                to: '/ava'
            }],
            formObject: {}
    }
  },
   methods: {
        nextPage(event) {
            for (let field in event.formData) {
                this.formObject[field] = event.formData[field];
            }

            this.$router.push(this.items[event.pageIndex + 1].to);
        },
        prevPage(event) {
            this.$router.push(this.items[event.pageIndex - 1].to);
        },
        complete() {
            this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + this.formObject.firstname + ' ' + this.formObject.lastname + ' your order completed.'});
        }
    }
}
</script>

<template>
   <div class="lg:w-6 sm:w-full m-auto">
        <Toast />
        
        <div class="card">
            <Steps :model="steps" :readonly="true" />

            <router-view>
        </router-view>
        </div>

        
    </div>
</template>