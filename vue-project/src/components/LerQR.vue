<template>
  <div class="card p-4 shadow-sm text-center">
    <h4 class="mb-3">Câmara do Estafeta</h4>
    
    <div class="scanner-container mx-auto rounded overflow-hidden" style="max-width: 300px; border: 3px solid #1A1A1A;">
      <qrcode-stream @detect="aoDetetar"></qrcode-stream>
    </div>

    <div v-if="resultado" class="alert alert-success mt-4">
      <strong>Código Lido com Sucesso:</strong><br>
      {{ resultado }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

const resultado = ref('')

// Função que dispara quando a câmara apanha um QR Code
const aoDetetar = (codigosDetetados) => {
  if (codigosDetetados.length > 0) {
    // Pega no valor do primeiro código que encontrar na imagem
    resultado.value = codigosDetetados[0].rawValue
    
    // Alerta no ecrã para testares
    alert("Encomenda Validada! Dados: " + resultado.value)
  }
}
</script>