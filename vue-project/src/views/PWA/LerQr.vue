<script setup>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

// 1. Estados da Página
const resultado = ref('')
const modoAtual = ref('qr') 
const idEncomenda = ref('22343655') 

// --- NOVO: ESTADOS DA FOTOGRAFIA ---
const fotoCapturada = ref(null) // Vai guardar a imagem tirada
const inputFoto = ref(null) // Referência ao elemento <input> invisível

// 2. Ação QR Code
const aoDetetar = (codigosDetetados) => {
  if (codigosDetetados.length > 0) {
    resultado.value = codigosDetetados[0].rawValue
    alert("Encomenda Validada! Dados: " + resultado.value)
  }
}

// 3. Alternar entre modos
const mudarModo = (modo) => {
  modoAtual.value = modo
}

// --- NOVO: FUNÇÕES DA CÂMARA NATIVA ---
// Finge um clique no input invisível para abrir a câmara do telemóvel
const abrirCameraNativa = () => {
  inputFoto.value.click()
}

// Quando o telemóvel tira a foto, guardamos e mostramos no ecrã
const aoCapturarFoto = (event) => {
  const ficheiro = event.target.files[0]
  if (ficheiro) {
    // Cria um URL temporário local para mostrar a imagem no ecrã instantaneamente
    fotoCapturada.value = URL.createObjectURL(ficheiro)
  }
}

// Limpa a foto para o estafeta poder tirar outra
const limparFoto = () => {
  fotoCapturada.value = null
  if (inputFoto.value) inputFoto.value.value = '' // Reseta o input
}
</script>

<template>
  <div class="container-fluid py-4 d-flex flex-column align-items-center">
    
    <button class="btn bg-white shadow-sm fw-bold px-3 py-2 rounded-3 mb-5 id-dropdown">
      Nº {{ idEncomenda }}
      <i class="bi bi-chevron-down ms-2 fs-7 text-muted"></i>
    </button>

    <div class="stepper-tubo mb-5">
      <div class="stepper-ponto preenchido"></div>
      <div class="stepper-linha preenchido"></div>
      <div class="stepper-ponto preenchido"></div>
      <div class="stepper-linha preenchido"></div>
      <div class="stepper-ponto preenchido"></div>
    </div>

    <div class="camera-wrapper border-primary shadow-sm mb-5">
      
      <div v-if="modoAtual === 'qr'" class="w-100 h-100 position-relative">
        <qrcode-stream @detect="aoDetetar" class="camera-stream"></qrcode-stream>
        <div class="qr-target-frame">
          <span></span>
        </div>
      </div>

      <div v-else class="w-100 h-100 position-relative bg-light d-flex flex-column justify-content-center align-items-center">
        
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          ref="inputFoto" 
          class="d-none"
          @change="aoCapturarFoto"
        >

        <template v-if="!fotoCapturada">
          <i class="bi bi-box-seam text-muted mb-2" style="font-size: 3.5rem;"></i>
          <p class="text-muted fw-bold mb-0">Comprovativo</p>
          <button class="btn btn-primary rounded-pill mt-3 px-4 fw-bold shadow-sm" @click="abrirCameraNativa">
            <i class="bi bi-camera-fill me-2"></i> Tirar Foto
          </button>
        </template>

        <template v-else>
          <img :src="fotoCapturada" class="w-100 h-100 object-fit-cover" alt="Comprovativo da Encomenda">
          
          <button class="btn btn-danger rounded-pill position-absolute bottom-0 mb-3 px-3 fw-bold shadow" @click="limparFoto">
            <i class="bi bi-arrow-counterclockwise me-1"></i> Repetir
          </button>
        </template>

      </div>
    </div>

    <div class="toggle-group d-flex shadow-sm">
      <button 
        class="toggle-btn" 
        :class="{ 'active': modoAtual === 'qr' }"
        @click="mudarModo('qr')"
      >
        <i class="bi bi-qr-code-scan fs-3"></i>
      </button>
      
      <button 
        class="toggle-btn" 
        :class="{ 'active': modoAtual === 'foto' }"
        @click="mudarModo('foto')"
      >
        <i class="bi bi-camera fs-3"></i>
      </button>
    </div>

  </div>
</template>

<style scoped>
/* --- VARIÁVEIS ÚTEIS --- */
.border-primary {
  border: 6px solid var(--bs-primary) !important;
}

/* --- DROPDOWN DO ID --- */
.id-dropdown {
  border: 1px solid #DCD7D0;
  font-size: 0.95rem;
}

/* --- BARRA DE PROGRESSO (ESTILO TUBO) --- */
.stepper-tubo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 260px; /* Controla a largura total da barra */
  margin: 0 auto; /* Centra a barra no ecrã */
}

/* O "Tubo" (As linhas de ligação) */
.stepper-linha {
  flex-grow: 1; /* Faz a linha esticar para preencher o espaço */
  height: 8px; /* Muito mais grossa, igual ao mockup */
  margin: 0 -4px; /* O truque para a linha entrar por 'dentro' do círculo */
  z-index: 1; /* Fica atrás dos pontos */
}

/* Os Círculos */
.stepper-ponto {
  width: 26px; /* Círculos maiores */
  height: 26px;
  border-radius: 50%;
  z-index: 2; /* Fica por cima da linha */
}

/* --- ESTADOS DE CORES --- */

/* Elementos Concluídos / Atuais (Verde Escuro) */
.preenchido {
  background-color: var(--bs-primary);
  /* Se for um ponto, não precisa de borda pois o fundo é sólido */
}

/* Elementos Pendentes (Branco com borda Verde) */
.pendente {
  background-color: #ffffff;
}

/* Aplica a borda apenas se for a linha pendente */
.stepper-linha.pendente {
  border-top: 2px solid var(--bs-primary);
  border-bottom: 2px solid var(--bs-primary);
}

/* Aplica a borda apenas se for o ponto pendente */
.stepper-ponto.pendente {
  border: 3px solid var(--bs-primary);
}

/* --- ZONA DA CÂMARA --- */
.camera-wrapper {
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1 / 1; /* Força um quadrado perfeito igual ao mockup */
  border-radius: 4px;
  overflow: hidden;
  background-color: #e9ecef; /* Cor de fundo enquanto a câmara carrega */
  position: relative;
}

/* Garante que o vídeo da câmara preenche o quadrado sem distorcer */
:deep(.camera-stream video) {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

/* --- A MIRA DO QR CODE (Pura Magia CSS) --- */
.qr-target-frame {
  position: absolute;
  top: 15%; left: 15%; right: 15%; bottom: 15%;
  pointer-events: none; /* Para não bloquear os cliques/toques na câmara */
}

/* Desenha os 4 cantos brancos do alvo */
.qr-target-frame::before, .qr-target-frame::after,
.qr-target-frame span::before, .qr-target-frame span::after {
  content: '';
  position: absolute;
  width: 40px; 
  height: 40px;
  border-color: rgba(255, 255, 255, 0.9);
  border-style: solid;
}
.qr-target-frame::before { top: 0; left: 0; border-width: 3px 0 0 3px; }
.qr-target-frame::after { top: 0; right: 0; border-width: 3px 3px 0 0; }
.qr-target-frame span::before { bottom: 0; left: 0; border-width: 0 0 3px 3px; }
.qr-target-frame span::after { bottom: 0; right: 0; border-width: 0 3px 3px 0; }

/* --- BOTÕES TOGGLE (QR vs FOTO) --- */
.toggle-group {
  border: 1px solid #DCD7D0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
}

.toggle-btn {
  width: 80px;
  height: 55px;
  border: none;
  background-color: #ffffff;
  color: #c2baba; /* Cor do ícone inativo */
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toggle-btn.active {
  background-color: var(--bs-primary);
  color: #ffffff; /* Cor do ícone ativo */
}

/* Utilitário de fonte */
.fs-7 {
  font-size: 0.8rem;
}
</style>