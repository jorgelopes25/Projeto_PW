<template>
  <div class="perfil-page">
    <div class="top-banner"></div>

    <div class="avatar-wrap">
      <div class="avatar-circle">
        <i class="bi bi-person-fill"></i>
      </div>
    </div>

    <div class="profile-body">
      <h1 class="courier-name">{{ courier.name || 'Estafeta' }}</h1>
      <p class="courier-vehicle">{{ vehicleLabel }}</p>

      <div class="stats-row">
        <div class="stat-card">
          <h3>Avaliação<br />média</h3>
          <i class="bi bi-star stat-icon"></i>
          <div class="stat-value">{{ ratingLabel }}</div>
        </div>

        <div class="stat-card">
          <h3>Entregas<br />concluídas</h3>
          <i class="bi bi-truck stat-icon"></i>
          <div class="stat-value">{{ completedDeliveries }}</div>
        </div>
      </div>

      <div class="occupation-wrapper">
        <div class="occupation-bar">
          <div
            class="occupation-fill"
            :style="{ width: occupationPercent + '%' }"
          ></div>
        </div>
        <p class="occupation-text">Ocupado: {{ activeDeliveries }} de 3</p>
      </div>

      <div class="menu-list">
        <button class="menu-item" type="button" @click="$router.push('/estafeta/historico')">
         <span>Histórico de Entregas</span>
         <i class="bi bi-chevron-right"></i>
        </button>

        <button class="menu-item" type="button" @click="$router.push('/estafeta/definicoes')">
         <span>Definições da Conta</span>
         <i class="bi bi-chevron-right"></i>
        </button>

        <button class="menu-item" type="button">
          <span>Suporte Logístico</span>
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>

      <div class="logout-wrap">
        <button class="logout-btn" type="button">
          Terminar Sessão
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'

const API_URL = 'http://localhost:1337/api'

// temporário até haver login
const courierEmail = localStorage.getItem('email')

const courier = ref({
  name: 'Estafeta',
  vehicle: '',
  rating: 0,
  total_deliveries: 0
})

const deliveries = ref([])
const maxSimultaneousDeliveries = 3
const activeStatuses = ['Aceite', 'Em recolha', 'Em trânsito']

const vehicleLabel = computed(() => {
  return courier.value.vehicle || 'Sem veículo'
})

const ratingLabel = computed(() => `${courier.value.rating || 0}/5`)
const completedDeliveries = computed(() => courier.value.total_deliveries || 0)

const activeDeliveries = computed(() => {
  return deliveries.value.filter(delivery =>
    activeStatuses.includes(delivery.delivery_status)
  ).length
})

const occupationPercent = computed(() => {
  return Math.min((activeDeliveries.value / maxSimultaneousDeliveries) * 100, 100)
})

async function fetchCourier() {
  try {
    const response = await fetch(
      `${API_URL}/couriers?filters[email][$eq]=${encodeURIComponent(courierEmail)}`
    )
    const result = await response.json()

    if (result.data && result.data.length > 0) {
      courier.value = result.data[0]
    }
  } catch (error) {
    console.error('Erro ao carregar courier:', error)
  }
}

async function fetchDeliveries() {
  try {
    const response = await fetch(
      `${API_URL}/deliveries?filters[courier][id][$eq]=${courier.value.id}`
    )
    const result = await response.json()

    if (result.data) {
      deliveries.value = result.data
    }
  } catch (error) {
    console.error('Erro ao carregar deliveries:', error)
  }
}

onMounted(async () => {
  await fetchCourier()

  if (courier.value.id) {
    await fetchDeliveries()
  }
})
</script>

<style scoped>
.perfil-page {
  width: 100%;
  min-height: calc(100vh - 12vh);
  background-color: var(--bs-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
}

.top-banner {
  width: 100%;
  height: 12vh;
  background: linear-gradient(90deg, #26481a 0%, #2d3e1f 100%);
  border-bottom-left-radius: 4%;
  border-bottom-right-radius: 4%;
}

.avatar-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: -2.5vh;
  position: relative;
  z-index: 2;
}

.avatar-circle {
  width: 40vw;
  height: 40vw;
  max-width: 6rem;
  max-height: 6rem;
  min-width: 4.8rem;
  min-height: 4.8rem;
  border-radius: 50%;
  background: #f1f1f1;
  border: 0.35rem solid var(--bs-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.4vh 1vh rgba(0, 0, 0, 0.12);
}

.avatar-circle i {
  font-size: clamp(2rem, 5vw, 3rem);
  color: #bdbdbd;
  line-height: 1;
}

.profile-body {
  width: 100%;
  padding: 1.8vh 8% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.courier-name {
  text-align: center;
  font-size: clamp(1.6rem, 2.8vw, 2.4rem);
  font-weight: 800;
  color: #0f1720;
  margin: 0.8vh 0 0;
  line-height: 1.05;
}

.courier-vehicle {
  text-align: center;
  color: var(--bs-primary);
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-weight: 500;
  margin: 0.5vh 0 2.2vh;
  line-height: 1.1;
}

.stats-row {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 4%;
  margin-bottom: 2.2vh;
}

.stat-card {
  width: 48%;
  min-height: 20vh;
  background: #f3e9de;
  border: 0.08rem solid #d7c8ba;
  border-radius: 5%;
  box-shadow: 0 0.35vh 0.9vh rgba(0, 0, 0, 0.08);
  padding: 4% 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stat-card h3 {
  text-align: center;
  font-size: clamp(0.9rem, 1.3vw, 1.08rem);
  font-weight: 700;
  line-height: 1.3;
  color: var(--bs-primary);
  margin: 0 0 1.8vh;
}

.stat-icon {
  font-size: clamp(1.7rem, 2.6vw, 2.2rem);
  color: var(--bs-primary);
  margin-bottom: 1.2vh;
}

.stat-value {
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  font-weight: 800;
  color: var(--bs-primary);
}

.occupation-wrapper {
  width: 100%;
  margin-bottom: 2vh;
}

.occupation-bar {
  width: 42%;
  height: 1.6vh;
  min-height: 0.8rem;
  margin: 0 auto 1vh;
  border: 0.08rem solid #cfc2b5;
  border-radius: 999rem;
  background: #efe8df;
  overflow: hidden;
}

.occupation-fill {
  height: 100%;
  background-color: var(--bs-primary);
  border-radius: 999rem;
  transition: width 0.3s ease;
}

.occupation-text {
  text-align: center;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  font-weight: 700;
  color: #111;
  margin: 0;
}

.menu-list {
  width: 100%;
  margin-top: 1vh;
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
}

.menu-item {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--bs-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1vh 0.5%;
  font-size: clamp(0.98rem, 1.2vw, 1.08rem);
  font-weight: 700;
  text-align: left;
}

.menu-item i {
  font-size: clamp(0.9rem, 1vw, 1.1rem);
}

.logout-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 5%;
  padding-bottom: 12vh;
}

.logout-btn {
  border: none;
  background: #ea5f5f;
  color: #000;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  font-weight: 800;
  padding: 2.2% 5.2%;
  border-radius: 10%;
  box-shadow: 0 0.45vh 0.9vh rgba(0, 0, 0, 0.18);
}

/* MOBILE */
@media (max-width: 576px) {
  .profile-body {
    padding: 1.6vh 6% 0;
  }

  .stats-row {
    gap: 3.5%;
  }

  .stat-card {
    min-height: 18vh;
  }

  .occupation-bar {
    width: 72%;
  }

  .logout-wrap {
    padding-bottom: 10vh;
  }
}

</style>