
  <script>
export default {
    data() {
        return {
            items: [
                {
					label:'Login',
          url:'#/login',
          right:true
                },
                {
					label:'Register',
          url:'#/register',
          right:true
                }
              ]}
                
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
