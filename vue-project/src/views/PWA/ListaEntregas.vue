<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios' 

const abaAtiva = ref('pendente')

// Variáveis de estado
const todasAsEntregas = ref([])
const entregasVisiveis = ref([])
const carregando = ref(true)

// Filtra as entregas baseadas na aba clicada
const mudarAba = (estadoDesejado) => {
  abaAtiva.value = estadoDesejado
  entregasVisiveis.value = todasAsEntregas.value.filter(entrega => entrega.estado === estadoDesejado)
}

// Busca dados no Strapi
const carregarEntregas = async () => {
  carregando.value = true
  try {
    const resposta = await axios.get('http://localhost:1337/api/deliveries?populate=*')
    
    // Pequeno atraso artificial para testarmos o efeito visual (REMOVER EM PRODUÇÃO)
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (resposta.data && resposta.data.data) {
      todasAsEntregas.value = resposta.data.data.map(item => {
        const attr = item.attributes || item 
        return {
          id: attr.extId , 
          estado: attr.status ? attr.status.toLowerCase() : 'pendente',
          origem: 'Armazém Central',
          destino: attr.delivery_address || 'Morada não definida',
          prioridade: '1-Normal'
        }
      })
      
      // Filtra os dados reais imediatamente
      mudarAba(abaAtiva.value)
    }
  } catch (erro) {
    console.error("Erro ao comunicar com o Strapi:", erro)
  } finally {
    carregando.value = false
  }
}

// Ciclo de vida: onMounted
onMounted(async () => {
  await carregarEntregas()
})

const abrirDetalhes = (id) => {
  alert('A abrir entrega: Nº ' + id)
}
</script>

<template>
  <div class="container-fluid py-4 mt-4">
    <h2 class="h5 fw-bold mb-4 text-uppercase">As Minhas Entregas</h2>

    <div class="d-flex gap-3 mb-4">
      <button
        class="btn flex-fill rounded-pill shadow-sm fw-bold py-2 custom-tab"
        :class="abaAtiva === 'pendente' ? 'tab-ativa' : 'tab-inativa'"
        @click="mudarAba('pendente')"
      >PENDENTES</button>
      <button
        class="btn flex-fill rounded-pill shadow-sm fw-bold py-2 custom-tab"
        :class="abaAtiva === 'concluida' ? 'tab-ativa' : 'tab-inativa'"
        @click="mudarAba('concluida')"
      >CONCLUÍDAS</button>
    </div>

    <div class="lista-encomendas pb-5 position-relative">
      
      <div v-if="carregando" class="skeleton-overlay">
        <div v-for="i in 3" :key="i" class="card card-entrega mb-4 skeleton-card shadow-sm">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div class="skeleton-item rounded" style="width: 40%; height: 20px;"></div>
              <div class="skeleton-item rounded-pill" style="width: 25%; height: 30px;"></div>
            </div>
            
            <div class="d-flex justify-content-end">
              <div class="skeleton-item rounded-pill" style="width: 35%; height: 40px;"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="fade-in">
        <div v-if="entregasVisiveis.length === 0" class="text-center text-muted mt-5 py-5">
          <p class="fs-4">📭</p>
          <p>Não há entregas nesta lista.</p>
        </div>

        <div 
          v-for="entrega in entregasVisiveis" 
          :key="entrega.id" 
          class="card card-entrega mb-4 shadow-sm"
        >
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="text-truncate fw-bold m-0 fs-6">Nº {{ entrega.id }}</h5>
              <span class="badge rounded-pill px-3 py-2 fs-7 badge-normal">
                {{ entrega.prioridade }}
              </span>
            </div>
            
            <div class="d-flex align-items-center fw-bold mb-4 fs-7 text-dark">
              <span class="text-truncate">{{ entrega.origem }}</span>
              <i class="bi bi-arrow-right mx-2 fs-5"></i>
              <span class="text-truncate">{{ entrega.destino }}</span>
            </div>
            
            <div class="d-flex align-items-center justify-content-end">
              <button class="btn rounded-pill px-4 py-2 fw-bold text-white btn-acao" @click="abrirDetalhes(entrega.id)">
                {{ entrega.estado === 'pendente' ? 'Recolher' : 'Concluída' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- ESTILOS DAS TABS --- */
.custom-tab { font-size: 0.9rem; letter-spacing: 0.5px; transition: all 0.3s ease; }
.tab-ativa { background-color: var(--bs-primary); color: #ffffff; border: 1px solid var(--bs-primary); }
.tab-inativa { background-color: transparent; color: #1a1a1a; border: 1px solid #c2baba; }

/* --- ESTILOS DO CARTÃO REAIS --- */
.card-entrega { background-color: #F6F3EE; border: 1px solid #DCD7D0; border-radius: 16px; }
.badge-normal { background-color: #6C7A68; color: white; }
.btn-acao { background-color: var(--bs-primary); border: none; font-size: 0.9rem; }
.btn-acao:active { transform: scale(0.95); }
.fs-7 { font-size: 0.85rem; }

/* --- NOVO: ESTILOS DO SKELETON & BLUR --- */

/* Bloco genérico cinzento */
.skeleton-item {
  background-color: #DCD7D0; /* Um cinza que combina com o teu rebordo bege */
}

/* O Cartão Skeleton, aplicando o Blur */
.skeleton-card {
  filter: blur(1px); /* Desfoca os blocos cinzentos */
  background-color: #EAE6DF; /* Um tom ligeiramente mais escuro para o cartão falso */
}

/* Animação suave para quando os dados reais aparecem */
.fade-in {
  animation: fadeInEffect 0.5s ease-in;
}

@keyframes fadeInEffect {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Adicionámos uma animação de "pulsação" nos blocos para ficar mais dinâmico */
.skeleton-item {
  animation: skeleton-pulsate 1.5s infinite ease-in-out;
}

@keyframes skeleton-pulsate {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}
</style>