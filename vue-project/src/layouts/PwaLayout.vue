<template>
  <div class="pwa-layout bg-secondary" style="min-height: 100vh; padding-bottom: 70px;">
    <main class="container py-4">
      <router-view></router-view>
    </main>

    <nav class="fixed-bottom bg-white border-top d-flex justify-content-around py-2">
      <router-link to="/estafeta" class="btn btn-sm btn-outline-primary border-0">Entregas</router-link>
      <router-link to="/estafeta/ler-qr" class="btn btn-sm btn-outline-primary border-0">Ler QR</router-link>
    </nav>
  </div>
  <bottom-bar />
</template>

<script setup>
// Importar o novo componente
import BottomBar from '../components/PWA/BottomBar.vue';
</script>