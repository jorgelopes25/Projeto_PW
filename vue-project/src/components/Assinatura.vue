<template>
  <div class="signature-container d-flex flex-column align-items-center my-4">
    <h4>Assinatura do Cliente</h4>
    
    <canvas
      ref="signatureCanvas"
      width="320"
      height="200"
      @mousedown="iniciarDesenho"
      @mousemove="desenhar"
      @mouseup="pararDesenho"
      @mouseleave="pararDesenho"
      @touchstart="iniciarDesenhoTouch"
      @touchmove="desenharTouch"
      @touchend="pararDesenho"
      class="signature-pad"
    ></canvas>

    <div class="mt-3">
      <button class="btn btn-outline-danger me-2" @click="limparAssinatura">Limpar</button>
      <button class="btn btn-success" @click="guardarAssinatura">Confirmar Entrega</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Assinatura',
  data() {
    return {
      isDrawing: false,
      context: null,
    };
  },
  mounted() {
    // Inicializa o contexto 2D assim que o componente é montado no ecrã
    const canvas = this.$refs.signatureCanvas;
    this.context = canvas.getContext('2d');
    
    // Estilo da "caneta"
    this.context.lineWidth = 3;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#000000';
  },
  methods: {
    // --- Eventos de Rato (Desktop) ---
    iniciarDesenho(e) {
      this.isDrawing = true;
      this.context.beginPath();
      this.context.moveTo(e.offsetX, e.offsetY);
    },
    desenhar(e) {
      if (!this.isDrawing) return;
      this.context.lineTo(e.offsetX, e.offsetY);
      this.context.stroke();
    },
    pararDesenho() {
      this.isDrawing = false;
    },

    // --- Eventos de Toque (Mobile / PWA) ---
    iniciarDesenhoTouch(e) {
      e.preventDefault(); // Evita que o ecrã faça scroll ao assinar
      const rect = this.$refs.signatureCanvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.isDrawing = true;
      this.context.beginPath();
      this.context.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    },
    desenharTouch(e) {
      e.preventDefault();
      if (!this.isDrawing) return;
      const rect = this.$refs.signatureCanvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.context.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
      this.context.stroke();
    },

    // --- Ações ---
    limparAssinatura() {
      const canvas = this.$refs.signatureCanvas;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
    },
    guardarAssinatura() {
      const canvas = this.$refs.signatureCanvas;
      
      // Converte o que foi desenhado no canvas para uma string (formato Base64 PNG)
      const imagemBase64 = canvas.toDataURL('image/png');
      
      console.log("Assinatura convertida:", imagemBase64);
      alert("Assinatura capturada com sucesso! Vê a consola.");
      
      // Aqui, emitirias o valor para o componente pai ou enviarias via Axios para o Strapi
    }
  }
};
</script>

<style scoped>
.signature-pad {
  border: 2px dashed #6c757d;
  border-radius: 8px;
  background-color: #f8f9fa;
  /* IMPORTANTE: impede que o browser tente fazer zoom ou scroll quando o estafeta toca no canvas */
  touch-action: none; 
}
</style>