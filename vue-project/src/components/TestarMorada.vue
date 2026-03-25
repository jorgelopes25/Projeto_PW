<template>
  <div class="card p-4 shadow-sm">
    <h4 class="mb-3 text-center">Converter Morada em Coordenadas</h4>
    
    <div class="input-group mb-3">
      <input 
        v-model="morada" 
        type="text" 
        class="form-control" 
        placeholder="Ex: Marquês de Pombal, Lisboa"
        @keyup.enter="buscarCoordenadas"
      />
      <button class="btn btn-dark" @click="buscarCoordenadas">Procurar</button>
    </div>

    <div v-if="resultado" class="alert alert-info text-center">
      <strong>Latitude:</strong> {{ resultado.lat }} <br>
      <strong>Longitude:</strong> {{ resultado.lon }}
    </div>
    
    <div v-if="erro" class="alert alert-danger text-center">
      {{ erro }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const morada = ref('')
const resultado = ref(null)
const erro = ref('')

const buscarCoordenadas = async () => {
  resultado.value = null
  erro.value = ''
  
  if (!morada.value) return

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(morada.value)}`
    const resposta = await fetch(url)
    const dados = await resposta.json()

    if (dados.length > 0) {
      resultado.value = { lat: dados[0].lat, lon: dados[0].lon }
    } else {
      erro.value = 'Morada não encontrada. Tenta ser mais específico.'
    }
  } catch (e) {
    erro.value = 'Erro ao comunicar com o servidor.'
    console.error(e)
  }
}
</script>