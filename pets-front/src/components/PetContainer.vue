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
                to: '/pet-new/pet'
            },
            {
                label: 'Ava',
                to: '/pet-new/:id/ava'
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
        }
    }
}
</script>

<template>
   <div class="lg:w-6 sm:w-full m-auto">
        <div class="card">
            <Steps :model="steps" :readonly="true" />

            <router-view>
        </router-view>
        </div>

        
    </div>
</template>