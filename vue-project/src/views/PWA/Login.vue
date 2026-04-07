<script setup>
import { ref } from 'vue'
// Importamos a função de popup do pacote oficial da Firebase
import { signInWithPopup } from 'firebase/auth'
// Importamos as ferramentas que configuraste no passo anterior
import { auth, googleProvider } from '@/services/firebase'

// Variável para guardar os dados do estafeta depois do login
const utilizador = ref(null)
const carregando = ref(false)

const fazerLoginComGoogle = async () => {
  carregando.value = true
  try {
    // É esta linha mágica que abre a janela da Google no telemóvel/PC!
    const resultado = await signInWithPopup(auth, googleProvider)
    
    // O login teve sucesso! Guardamos a informação
    utilizador.value = resultado.user
    console.log("Login efetuado com sucesso:", utilizador.value)
    
    // Alerta temporário só para testarmos se funcionou
    alert(`Bem-vindo(a) à equipa, ${utilizador.value.displayName}!`)
    
    // (Mais tarde, aqui vamos usar o Vue Router para o mandar para a página '/estafeta')
    
  } catch (erro) {
    console.error("Erro ao tentar fazer login com Google:", erro)
    alert("Oops! Aconteceu um erro no login. Verifica a consola.")
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center" style="background-color: #F6F3EE;">
    
    <div class="text-center mb-5">
      <div class="logo-placeholder mb-4 shadow-sm mx-auto d-flex justify-content-center align-items-center">
        <i class="bi bi-box-seam fs-1 text-white"></i>
      </div>
      <h1 class="fw-bold fs-2" style="color: #1A1A1A;">GoEverywhere</h1>
      <p class="text-muted">Área de Estafetas</p>
    </div>

    <button 
      @click="fazerLoginComGoogle" 
      class="btn btn-light rounded-pill shadow-sm py-3 px-4 fw-bold d-flex align-items-center btn-google"
      :disabled="carregando"
    >
      <i class="bi bi-google fs-5 me-3 text-danger"></i>
      <span v-if="!carregando">Entrar com o Google</span>
      <span v-else>A carregar...</span>
    </button>

    <div v-if="utilizador" class="mt-5 text-center fade-in">
      <img :src="utilizador.photoURL" class="rounded-circle shadow-sm mb-3" width="70" alt="Foto de Perfil" />
      <p class="fw-bold m-0 text-success">Login ativo!</p>
      <p class="small text-muted">{{ utilizador.email }}</p>
    </div>

  </div>
</template>

<style scoped>
/* Estilo do falso Logotipo (Verde Escuro) */
.logo-placeholder {
  width: 90px;
  height: 90px;
  background-color: var(--bs-primary); 
  border-radius: 25px;
  transform: rotate(-5deg); /* Um toque moderno e dinâmico */
}

/* Estilo do botão do Google */
.btn-google {
  border: 1px solid #DCD7D0;
  color: #1a1a1a;
  transition: all 0.2s ease;
  min-width: 260px;
  justify-content: center;
}

.btn-google:active {
  transform: scale(0.96);
  background-color: #f8f9fa;
}

/* Animação suave para quando a foto aparece */
.fade-in {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>