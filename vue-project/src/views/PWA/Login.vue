<script setup>
import { ref } from 'vue'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '@/services/firebase'
import { useRouter } from 'vue-router'

const router = useRouter()

const utilizador = ref(null)
const carregando = ref(false)

// Variáveis para os novos campos (prontas para ligar à Firebase mais tarde!)
const email = ref('')
const password = ref('')

const fazerLoginComGoogle = async () => {
  carregando.value = true
  try {
    const resultado = await signInWithPopup(auth, googleProvider)
    utilizador.value = resultado.user
    console.log("Login efetuado com sucesso:", utilizador.value)
    alert(`Bem-vindo(a), ${utilizador.value.displayName}!`)
  } catch (erro) {
    console.error("Erro no login com Google:", erro)
  } finally {
    carregando.value = false
    router.replace('/estafeta')
  }
}
</script>

<template>
  <div class="login-bg d-flex justify-content-center align-items-center vh-100">
    
    <div class="login-card p-4 d-flex flex-column align-items-center shadow-lg">
      
      <div class="logo-box w-100 mb-5 d-flex flex-column justify-content-center align-items-center text-dark text-center rounded-1 shadow-sm">
        <h1 class="logo-text m-0">GoEverywhere</h1>
        <span class="logo-subtext text-uppercase tracking-widest">Bridal & Formalwear</span>
      </div>

      <button 
        @click="fazerLoginComGoogle" 
        class="btn btn-white rounded-pill w-100 py-3 mb-4 fw-bold d-flex justify-content-center align-items-center btn-google shadow-sm"
        :disabled="carregando"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="me-2" viewBox="0 0 16 16">
          <path fill="#4285F4" d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
          <path fill="#34A853" d="M8 16A8 8 0 0 0 16 8h-3.08a4.792 4.792 0 0 1-4.92 4.92z"/>
          <path fill="#FBBC05" d="M3.508 9.62A4.792 4.792 0 0 1 3.508 6.38L.428 3.992A8 8 0 0 0 0 8a8 8 0 0 0 .428 4.008l3.08-2.388z"/>
          <path fill="#EA4335" d="M8 3.166A4.792 4.792 0 0 1 11.352 4.45L13.636 2.166A7.689 7.689 0 0 0 8 0 8 8 0 0 0 .428 3.992l3.08 2.388A4.347 4.347 0 0 1 8 3.166z"/>
        </svg>
        <span v-if="!carregando" class="text-dark fs-6">Sign in with Google</span>
        <span v-else class="text-dark fs-6">A carregar...</span>
      </button>

      <p class="text-white mb-4 small fw-light">Use credentials instead</p>

      <div class="input-group mb-3 shadow-sm rounded-2 overflow-hidden">
        <span class="input-group-text bg-white border-0 text-muted px-3">
          <i class="bi bi-envelope"></i>
        </span>
        <input 
          type="email" 
          v-model="email" 
          class="form-control border-0 py-2 custom-input" 
          placeholder="Email"
        >
      </div>

      <div class="input-group mb-2 shadow-sm rounded-2 overflow-hidden">
        <span class="input-group-text bg-white border-0 text-muted px-3">
          <i class="bi bi-lock"></i>
        </span>
        <input 
          type="password" 
          v-model="password" 
          class="form-control border-0 py-2 custom-input" 
          placeholder="Password"
        >
      </div>

    </div>
  </div>
</template>

<style scoped>
/* O fundo da página (A ocupar 100% do ecrã) */
.login-bg {
  position: fixed; /* Descola o ecrã do layout principal */
  top: 0;
  left: 0;
  width: 100vw; /* 100% da largura do ecrã */
  height: 100vh; /* 100% da altura do ecrã */
  z-index: 2000; /* Garante que fica por cima da barra de navegação verde */
  
  /* Caminho corrigido para a pasta public do Vite */
  background-image: url('/login.png'); 
  background-size: cover;
  background-position: center;
}

/* O Painel de vidro verde escuro */
.login-card {
  width: 90%;
  max-width: 400px;
  background-color: rgba(45, 62, 31, 0.85);  
  border-radius: 8px;
  backdrop-filter: blur(4px); /* Suaviza a foto que está por trás */
}

/* A caixa de logotipo bege claro */
.logo-box {
  background-color: var(--bs-secondary);
  padding: 30px 15px;
}

/* Fontes do logo provisório */
.logo-text {
  font-family: 'Georgia', serif; /* Simula uma fonte serifada e elegante */
  font-style: italic;
  font-size: 2rem;
  color: #1a1a1a;
}

.logo-subtext {
  font-size: 0.6rem;
  letter-spacing: 2px;
  color: #666;
}

.tracking-widest {
  letter-spacing: 0.2em;
}

/* O botão Branco do Google */
.btn-google {
  background-color: #ffffff;
  border: 1px solid #000000;
  transition: all 0.2s ease;
}

.btn-google:active {
  transform: scale(0.96);
  background-color: #f0f0f0;
}

/* Limpar o glow azul foleiro do Bootstrap nos inputs */
.custom-input:focus {
  box-shadow: none;
  background-color: #ffffff;
}

.form-control::placeholder {
  color: #a3a3a3;
  font-size: 0.95rem;
}
</style>