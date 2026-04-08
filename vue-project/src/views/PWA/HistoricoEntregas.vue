<template>
  <div class="historico-page">
    <div class="top-section">
      <button class="back-btn" @click="$router.back()">
        <i class="bi bi-chevron-left"></i>
      </button>

      <h1 class="page-title">Histórico de Entregas</h1>
      <p class="page-subtitle">Entregas concluídas pelo estafeta</p>
    </div>

    <div v-if="loading" class="empty-state">
      <i class="bi bi-arrow-repeat"></i>
      <p>A carregar histórico...</p>
    </div>

    <div v-else-if="deliveries.length" class="history-list">
      <article
        v-for="delivery in deliveries"
        :key="delivery.id"
        class="history-card"
      >
        <div class="card-top">
          <h2 class="delivery-id">{{ delivery.extId }}</h2>
          <span class="status-badge">{{ delivery.delivery_status }}</span>
        </div>

        <div class="card-body">
          <p class="delivery-address">
            <i class="bi bi-geo-alt"></i>
            {{ delivery.delivery_address || 'Morada não disponível' }}
          </p>

          <p class="delivery-date">
            <i class="bi bi-calendar3"></i>
            {{ formatDate(delivery.forecast_date) }}
          </p>
        </div>
      </article>
    </div>

    <div v-else class="empty-state">
      <i class="bi bi-clock-history"></i>
      <p>Ainda não existem entregas concluídas.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const API_URL = 'http://localhost:1337/api'

// temporário até existir login
const courierEmail = 'liliana@go.pt'

const deliveries = ref([])
const courier = ref(null)
const loading = ref(true)

function formatDate(dateString) {
  if (!dateString) return 'Sem data'

  const date = new Date(dateString)

  return date.toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

async function fetchCourier() {
  const response = await fetch(
    `${API_URL}/couriers?filters[email][$eq]=${encodeURIComponent(courierEmail)}`
  )

  if (!response.ok) {
    throw new Error('Erro ao obter o estafeta')
  }

  const result = await response.json()

  if (result.data && result.data.length > 0) {
    courier.value = result.data[0]
  }
}

async function fetchCompletedDeliveries() {
  if (!courier.value?.id) return

  const response = await fetch(
    `${API_URL}/deliveries?filters[courier][id][$eq]=${courier.value.id}&filters[delivery_status][$eq]=Concluída&sort[0]=forecast_date:desc`
  )

  if (!response.ok) {
    throw new Error('Erro ao obter o histórico de entregas')
  }

  const result = await response.json()
  deliveries.value = result.data || []
}

onMounted(async () => {
  try {
    await fetchCourier()
    await fetchCompletedDeliveries()
  } catch (error) {
    console.error('Erro ao carregar histórico:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.historico-page {
  width: 100%;
  min-height: calc(100vh - 12vh);
  background-color: var(--bs-secondary);
  padding: 4% 6% 14vh;
}

.top-section {
  margin-bottom: 4%;
}

.back-btn {
  border: none;
  background: transparent;
  color: var(--bs-primary);
  font-size: 1.4rem;
  padding: 0;
  margin-bottom: 2%;
}

.page-title {
  font-size: clamp(1.5rem, 2.8vw, 2.2rem);
  font-weight: 800;
  color: #0f1720;
  margin: 0 0 1%;
}

.page-subtitle {
  margin: 0;
  color: var(--bs-primary);
  font-size: clamp(0.95rem, 1.4vw, 1.05rem);
  font-weight: 500;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 2vh;
}

.history-card {
  background: rgba(255, 255, 255, 0.85);
  border: 0.08rem solid #e5ddd4;
  border-radius: 1rem;
  box-shadow: 0 0.35vh 0.9vh rgba(0, 0, 0, 0.08);
  padding: 4%;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4%;
  margin-bottom: 3%;
}

.delivery-id {
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  font-weight: 800;
  color: #0f1720;
  margin: 0;
}

.status-badge {
  background: #6c7f6a;
  color: white;
  font-size: clamp(0.75rem, 1vw, 0.9rem);
  font-weight: 700;
  padding: 1.5% 4%;
  border-radius: 999rem;
  white-space: nowrap;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
}

.card-body p {
  margin: 0;
  color: #1c1c1c;
  font-size: clamp(0.92rem, 1.2vw, 1rem);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.empty-state {
  min-height: 55vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--bs-primary);
  text-align: center;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 2%;
}

.empty-state p {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}
</style>