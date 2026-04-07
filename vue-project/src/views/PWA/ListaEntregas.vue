<script setup>
import { ref, onMounted } from 'vue'

const abaAtiva = ref('pendente')
const userName = 'Jorge'

// Começa como um array vazio, à espera dos dados reais da BD
const todasAsEntregas = ref([])
const entregasVisiveis = ref([])
const carregando = ref(true) // Novo estado para mostrar feedback visual

// Função que filtra as entregas baseadas na aba clicada
const mudarAba = (estadoDesejado) => {
  abaAtiva.value = estadoDesejado
  entregasVisiveis.value = todasAsEntregas.value.filter(entrega => entrega.estado === estadoDesejado)
}

// A MÁGICA DE INTEGRAÇÃO COM O STRAPI
const carregarEntregas = async () => {
  carregando.value = true
  try {
    // O fetch vai buscar os dados à API do Strapi
    // O ?populate=* diz ao Strapi para trazer também os dados das relações (ex: Cliente)
    const resposta = await fetch('http://localhost:1337/api/deliveries?populate=*')
    const json = await resposta.json()

    // O Strapi v5 devolve os dados dentro de um array chamado 'data'
    if (json && json.data) {
      todasAsEntregas.value = json.data.map(item => {
        return {
          // Mapeamos os campos da tua base de dados para o que o template espera
          id: item.extId , 
          estado: item.status ? item.status.toLowerCase() : 'pendente',
          origem: 'Armazém Central', // O diagrama ER mostra a Store ligada ao Product, complexo para já. Mantemos estático.
          destino: item.delivery_address || 'Morada não definida',
          prioridade: '1-Normal' // O teu ER não tem prioridade, mantemos um valor por defeito
        }
      })
      
      // Força a atualização da lista visível após carregar os dados
      mudarAba(abaAtiva.value)
    }
  } catch (erro) {
    console.error("Erro ao comunicar com o Strapi:", erro)
    alert("Falha ao carregar entregas. O servidor Strapi está ligado?")
  } finally {
    carregando.value = false
  }
}

// Quando a página é construída, chama a API
onMounted(() => {
  carregarEntregas()
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
      >
        PENDENTES
      </button>
      
      <button
        class="btn flex-fill rounded-pill shadow-sm fw-bold py-2 custom-tab"
        :class="abaAtiva === 'concluida' ? 'tab-ativa' : 'tab-inativa'"
        @click="mudarAba('concluida')"
      >
        CONCLUÍDAS
      </button>
    </div>

    <div class="lista-encomendas pb-5">
      
      <div v-if="entregasVisiveis.length === 0" class="text-center text-muted mt-5">
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
            
            <span 
              class="badge rounded-pill px-3 py-2 fs-7" 
              :class="entrega.prioridade.includes('1') ? 'badge-normal' : 'badge-medio'"
            >
              {{ entrega.prioridade }}
            </span>
          </div>
          
          <div class="d-flex align-items-center fw-bold mb-4 fs-7 text-dark">
            <span class="text-truncate">{{ entrega.origem }}</span>
            <i class="bi bi-arrow-right mx-2 fs-5"></i>
            <span class="text-truncate">{{ entrega.destino }}</span>
          </div>
          
          <div class="d-flex align-items-center justify-content-end">
            <button 
              class="btn rounded-pill px-4 py-2 fw-bold text-white btn-acao"
              @click="abrirDetalhes(entrega.id)"
            >
              {{ entrega.estado === 'pendente' ? 'Recolher' : 'Concluída' }}
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* --- ESTILOS DAS TABS --- */
.custom-tab {
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.tab-ativa {
  background-color: var(--bs-primary); /* O teu verde escuro */
  color: #ffffff;
  border: 1px solid var(--bs-primary);
}

.tab-inativa {
  background-color: transparent;
  color: #1a1a1a;
  border: 1px solid #c2baba; /* Um rebordo cinza suave */
}

/* --- ESTILOS DO CARTÃO --- */
.card-entrega {
  background-color: #F6F3EE; /* O tom bege clarinho do fundo do cartão */
  border: 1px solid #DCD7D0;
  border-radius: 16px; /* Cantos bem arredondados */
}

/* --- BADGES (Etiquetas de prioridade) --- */
.badge-normal {
  background-color: #6C7A68; /* Um verde um pouco mais claro que o primary */
  color: white;
}

.badge-medio {
  background-color: #C69451; /* O tom de laranja/dourado do mockup */
  color: white;
}

/* --- BOTÃO DE AÇÃO NO CARTÃO --- */
.btn-acao {
  background-color: var(--bs-primary);
  border: none;
  font-size: 0.9rem;
}

.btn-acao:active {
  transform: scale(0.95);
}

/* Utilitário para texto ligeiramente mais pequeno */
.fs-7 {
  font-size: 0.85rem;
}

.button:active {
  transform: scale(0.90);
}
</style>