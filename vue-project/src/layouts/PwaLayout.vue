<template>
  <div v-if="$route.path === '/estafeta/login'">
    <router-view></router-view>
  </div>

  <div v-else class="pwa-layout bg-secondary" style="min-height: 100vh; padding-bottom: 70px;">
    
    <main class="container py-4">
  
      <router-view></router-view>
    </main>
    <bottom-bar />
  </div>
</template>

<script setup>
import BottomBar from '../components/PWA/BottomBar.vue';
</script>