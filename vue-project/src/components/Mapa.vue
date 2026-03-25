<template>
  <div class="card p-3 shadow-sm">
    <h4 class="mb-3 text-center">Rota de Entrega (Leaflet Routing)</h4>
    
    <div id="meuMapa" style="height: 500px; width: 100%; border-radius: 8px; z-index: 1;"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// 1. Importar o JS e o CSS do Routing Machine
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

onMounted(() => {
  // Inicializa o mapa (não precisamos de fazer setView aqui porque a rota vai centrar o mapa automaticamente)
  const map = L.map('meuMapa')

  // Adicionar os azulejos do OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map)

  // 2. Definir os pontos e calcular a rota
  L.Routing.control({
    waypoints: [
      L.latLng(41.4711358,-8.3915937), // Ponto A (Recolha - Loja de Moda)
      L.latLng(38.7071, -9.1355)  // Ponto B (Destino - Casa do Cliente)
    ],
    // Linguagem das instruções passo a passo (vai aparecer uma caixa no canto superior direito)
    //language: 'pt',
    // Permite que o estafeta arraste a rota para ver alternativas
    routeWhileDragging: true,
    // Estilo da linha da rota (vamos usar o teu cinza escuro/preto para condizer com o tema da loja)
    lineOptions: {
      styles: [{ color: '#1A1A1A', opacity: 0.8, weight: 6 }]
    },
    // Cria os marcadores de forma automática
    createMarker: function(i, waypoint, n) {
      const marker = L.marker(waypoint.latLng);
      // Se for o primeiro ponto (Recolha)
      if (i === 0) {
        marker.bindPopup("<b>Ponto de Recolha</b><br>Loja de Roupa");
      } 
      // Se for o último ponto (Destino)
      else if (i === n - 1) {
        marker.bindPopup("<b>Destino</b><br>Cliente Final");
      }
      return marker;
    }
  }).addTo(map)
})
</script>

<style scoped>
/* Pequeno ajuste para garantir que a caixa de instruções de rota do Leaflet fica bonita no telemóvel */
:deep(.leaflet-routing-container) {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  max-height: 200px; /* Limita a altura no telemóvel */
  overflow-y: auto;  /* Permite fazer scroll nas instruções */
}
</style>