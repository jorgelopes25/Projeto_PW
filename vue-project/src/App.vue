<script setup>
import GerarQR from './components/GerarQR.vue'
import LerQR from './components/LerQR.vue'
import Assinatura from './components/Assinatura.vue'
import Mapa from './components/Mapa.vue'
import TestarMorada from './components/TestarMorada.vue'

// 1. Importar o Chatbot que acabaste de criar noutro ficheiro
import Chatbot from './components/Chatbot.vue'
</script>

<template>
  <main class="container mt-5 mb-5">
    <h2 class="text-center mb-5">Área de Testes PWA - GoEverywhere</h2>
    
    <div class="row g-4">
      <div class="col-md-6">
        <GerarQR />
      </div>
      <div class="col-md-6">
        <LerQR />
      </div>
    </div>
    
    <div class="row mt-4 justify-content-center">
      <div class="col-md-8">
        <TestarMorada />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <Mapa />
      </div>
    </div>

    <div class="row mt-4 justify-content-center">
      <div class="col-md-8 text-center">
        <Assinatura />
      </div>
    </div>

    <Chatbot />
    
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>