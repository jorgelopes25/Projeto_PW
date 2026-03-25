<template>
  <div>
    <button
      v-if="!aberto"
      @click="aberto = true"
      class="btn btn-dark position-fixed bottom-0 end-0 m-4 rounded-circle shadow d-flex align-items-center justify-content-center"
      style="width: 60px; height: 60px; z-index: 1050; font-size: 1.5rem;"
    >
      💬
    </button>

    <div
      v-if="aberto"
      class="card position-fixed bottom-0 end-0 m-4 shadow-lg"
      style="width: 350px; z-index: 1050; border-radius: 12px; overflow: hidden;"
    >
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
        <h6 class="mb-0">Assistente GoEverywhere</h6>
        <button @click="aberto = false" class="btn-close btn-close-white" aria-label="Close"></button>
      </div>

      <div class="card-body bg-light" style="height: 300px; overflow-y: auto;" ref="caixaMensagens">
        <div
          v-for="(msg, index) in mensagens"
          :key="index"
          class="mb-3 d-flex"
          :class="msg.autor === 'utilizador' ? 'justify-content-end' : 'justify-content-start'"
        >
          <div
            class="p-2 rounded-3"
            :class="msg.autor === 'utilizador' ? 'bg-primary text-white' : 'bg-white border'"
            style="max-width: 85%; font-size: 0.9rem;"
          >
            {{ msg.texto }}
          </div>
        </div>
      </div>

      <div class="card-footer bg-white">
        <div class="input-group">
          <input
            v-model="novaMensagem"
            @keyup.enter="enviarMensagem"
            type="text"
            class="form-control"
            placeholder="Escreva a sua dúvida..."
          />
          <button @click="enviarMensagem" class="btn btn-primary">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

// O chat começa fechado
const aberto = ref(false)
const novaMensagem = ref('')
const caixaMensagens = ref(null)

// Histórico de mensagens (começa com uma saudação do bot)
const mensagens = ref([
  { autor: 'bot', texto: 'Olá! Sou o assistente da loja. Como posso ajudar com as suas entregas de moda?' }
])

const enviarMensagem = () => {
  // Se o input estiver vazio, não faz nada
  if (!novaMensagem.value.trim()) return

  // 1. Adicionar a mensagem do cliente ao ecrã
  const textoUser = novaMensagem.value
  mensagens.value.push({ autor: 'utilizador', texto: textoUser })
  novaMensagem.value = '' // Limpa o input
  
  fazerScrollParaBaixo()

  // 2. Simular o tempo de resposta do Bot (para parecer real) com um atraso de 1 segundo
  setTimeout(() => {
    responder(textoUser)
  }, 1000)
}

const responder = (textoUser) => {
  // Transforma tudo em minúsculas para ser mais fácil procurar palavras
  const texto = textoUser.toLowerCase()
  
  // Resposta padrão caso o bot não perceba nada
  let resposta = "Desculpe, não percebi. Pode reformular? Tente perguntar sobre 'prazos', 'devoluções' ou 'estado'."

  // "Cérebro" do Bot - Lógica de Palavras-Chave
  if (texto.includes('prazo') || texto.includes('tempo') || texto.includes('demora')) {
    resposta = "As nossas entregas urbanas de roupa demoram normalmente entre 2 a 4 horas."
  } else if (texto.includes('devolu') || texto.includes('troca')) {
    resposta = "Pode solicitar a devolução de artigos de moda no prazo de 14 dias após a entrega. A GoEverywhere recolhe em sua casa!"
  } else if (texto.includes('estado') || texto.includes('encomenda') || texto.includes('onde')) {
    resposta = "Para acompanhar a sua entrega em tempo real, consulte a aba 'Visualização do estado das entregas' na sua área reservada."
  } else if (texto.includes('olá') || texto.includes('bom dia') || texto.includes('boa tarde' || texto.includes('ola'))) {
    resposta = "Olá! Como posso ajudar hoje?"
  }

  // Adiciona a resposta do bot ao ecrã
  mensagens.value.push({ autor: 'bot', texto: resposta })
  fazerScrollParaBaixo()
}

// Função para manter o chat sempre no fundo quando há novas mensagens
const fazerScrollParaBaixo = async () => {
  await nextTick() // Espera que o Vue desenhe a mensagem nova
  if (caixaMensagens.value) {
    caixaMensagens.value.scrollTop = caixaMensagens.value.scrollHeight
  }
}
</script>