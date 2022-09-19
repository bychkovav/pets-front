
  <script>
  import { mapGetters } from 'vuex'

export default {
    data() {
        return {
      }
    },
    computed: {
      ...mapGetters({
      current_user: 'user',
      }),
      items() {
        var its = [];
        if(!this.current_user) {
           its.push({label:'Login',
          url:'#/login'});
          its.push({label:'Register',
          url:'#/register'});
        } else {
          its.push({
					label:'Quit',
					icon:'pi pi-fw pi-power-off',
          command: (event) => {
               this.$store.commit('setUser', null);
              this.$store.commit('setToken', null);
        }
                });
        }

        return its;
      }
    }
}
</script>

<template>
  <header>
    <Menubar :model="items">
    <template #item="{item}">
        <a :href="item.url" class="p-menuitem-link">
          <span class="p-menuitem-text"> {{item.label}}</span>
         </a>
    </template>
    <template #end>
      
    </template>
  </Menubar>
  </header>

  <main class="mt-5">
<router-view></router-view>
  </main>
</template>

<style scoped>


</style>
