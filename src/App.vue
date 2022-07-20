<template>
  <Navbar />
   <router-view />  
</template>

<script>


import { defineAsyncComponent } from 'vue'

export default {
  name: 'App',
  components: {
   
    Navbar: defineAsyncComponent(() => import(/*webpackChuhkName:"Navbar"*/ '@/modules/shared/components/Navbar.vue'))
  }
}
</script>

