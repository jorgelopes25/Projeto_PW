<template>
  <div class="definicoes-page">
    <div class="top-section">
      <button class="back-btn" @click="$router.back()">
        <i class="bi bi-chevron-left"></i>
      </button>

      <h1 class="page-title">Definições da Conta</h1>
      <p class="page-subtitle">Editar informações do perfil do estafeta</p>
    </div>

    <div v-if="loading" class="empty-state">
      <i class="bi bi-arrow-repeat"></i>
      <p>A carregar dados da conta...</p>
    </div>

    <form v-else class="settings-form" @submit.prevent="saveChanges">
      <div class="settings-card">
        <label class="label" for="name">Nome</label>
        <input id="name" class="input" v-model="form.name" type="text" disabled />
      </div>

      <div class="settings-card">
        <label class="label" for="email">Email</label>
        <input id="email" class="input" v-model="form.email" type="email" disabled />
      </div>

      <div class="settings-card">
        <label class="label" for="phone">Telefone</label>
        <input id="phone" class="input" v-model="form.phone" type="text" />
      </div>

      <div class="settings-card">
        <label class="label" for="vehicle">Veículo</label>
        <input id="vehicle" class="input" v-model="form.vehicle" type="text" />
      </div>

      <div class="settings-card">
        <label class="label" for="zone">Zona</label>
        <input id="zone" class="input" v-model="form.zone" type="text" disabled />
      </div>

      <div class="settings-card">
        <label class="label" for="online">Estado</label>
        <input
          id="online"
          class="input"
          :value="form.online ? 'Online' : 'Offline'"
          type="text"
          disabled
        />
      </div>

      <p v-if="message" class="message success">{{ message }}</p>
      <p v-if="errorMessage" class="message error">{{ errorMessage }}</p>

      <button class="save-btn" type="submit" :disabled="saving">
        {{ saving ? 'A guardar...' : 'Guardar alterações' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const API_URL = 'http://localhost:1337/api'

// temporário até existir login
const courierEmail = 'liliana@go.pt'

// quando tiveres autenticação real, troca isto pelo token do login
const token = localStorage.getItem('jwt') || ''

const loading = ref(true)
const saving = ref(false)
const message = ref('')
const errorMessage = ref('')

const courierDocumentId = ref('')
const courierId = ref(null)

const form = ref({
  name: '',
  email: '',
  phone: '',
  vehicle: '',
  zone: '',
  online: false
})

async function fetchCourier() {
  const response = await fetch(
    `${API_URL}/couriers?filters[email][$eq]=${encodeURIComponent(courierEmail)}`
  )

  if (!response.ok) {
    throw new Error('Erro ao obter os dados do estafeta')
  }

  const result = await response.json()

  if (result.data && result.data.length > 0) {
    const courier = result.data[0]

    courierId.value = courier.id
    courierDocumentId.value = courier.documentId || ''

    form.value = {
      name: courier.name || '',
      email: courier.email || '',
      phone: courier.phone || '',
      vehicle: courier.vehicle || '',
      zone: courier.zone || '',
      online: !!courier.online
    }
  } else {
    throw new Error('Estafeta não encontrado')
  }
}

async function saveChanges() {
  message.value = ''
  errorMessage.value = ''
  saving.value = true

  try {
    const endpoint = courierDocumentId.value
      ? `${API_URL}/couriers/${courierDocumentId.value}`
      : `${API_URL}/couriers/${courierId.value}`

    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        data: {
          phone: form.value.phone,
          vehicle: form.value.vehicle
        }
      })
    })

    if (!response.ok) {
      throw new Error('Não foi possível guardar as alterações')
    }

    message.value = 'Alterações guardadas com sucesso.'
    await fetchCourier()
  } catch (error) {
    errorMessage.value = error.message || 'Erro ao guardar alterações.'
    console.error(error)
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  try {
    await fetchCourier()
  } catch (error) {
    errorMessage.value = error.message || 'Erro ao carregar dados.'
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.definicoes-page {
  width: 100%;
  min-height: calc(100vh - 12vh);
  background-color: var(--bs-secondary);
  padding: 4% 6% 14vh;
}

.top-section {
  margin-bottom: 5%;
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

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 2vh;
}

.settings-card {
  background: rgba(255, 255, 255, 0.85);
  border: 0.08rem solid #e5ddd4;
  border-radius: 1rem;
  box-shadow: 0 0.35vh 0.9vh rgba(0, 0, 0, 0.08);
  padding: 4%;
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
}

.label {
  font-size: clamp(0.85rem, 1vw, 0.95rem);
  font-weight: 700;
  color: #6b6b6b;
}

.input {
  width: 100%;
  border: 0.08rem solid #d9d1c8;
  border-radius: 0.8rem;
  padding: 3% 4%;
  font-size: clamp(0.95rem, 1.2vw, 1rem);
  background: #fff;
  color: #1c1c1c;
}

.input:disabled {
  background: #f3efe9;
  color: #6f6f6f;
}

.message {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  text-align: center;
}

.success {
  color: #2d6a4f;
}

.error {
  color: #c0392b;
}

.save-btn {
  border: none;
  background: var(--bs-primary);
  color: #fff;
  font-size: clamp(0.95rem, 1.2vw, 1rem);
  font-weight: 800;
  padding: 3.5% 5%;
  border-radius: 1rem;
  box-shadow: 0 0.45vh 0.9vh rgba(0, 0, 0, 0.18);
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