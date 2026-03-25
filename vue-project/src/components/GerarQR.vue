<template>
  <div class="card p-4 shadow-sm text-center">
    <h4 class="mb-3">Etiqueta da Encomenda</h4>
    
    <div class="mb-3">
      <input 
        v-model="dadosEncomenda" 
        class="form-control" 
        placeholder="Escreve algo para gerar o QR..." 
      />
    </div>

    <div class="d-flex justify-content-center">
      <qrcode-vue :value="dadosEncomenda" :size="200" level="H" />
    </div>
    
    <p class="mt-3 text-muted small">Conteúdo: {{ dadosEncomenda }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'

// Este é o texto inicial que o QR Code vai ter
const dadosEncomenda = ref('{"id": 9988, "estado": "aguarda_recolha"}')
</script>