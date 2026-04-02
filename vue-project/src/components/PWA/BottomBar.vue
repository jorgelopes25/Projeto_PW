<template>
  <nav class="bottom-nav">
    
    <router-link to="/estafeta" class="nav-item" :class="{ 'active-card': $route.path === '/estafeta' }">
      <i class="bi bi-card-checklist"></i>
    </router-link>

    <router-link to="/estafeta/mapa" class="nav-item">
      <i class="bi" :class="{ 'bi-geo-alt': !$route.path.includes('/estafeta/mapa'), 'bi-geo-alt-fill': $route.path.includes('/estafeta/mapa') }"></i>
    </router-link>

    <div class="center-btn-wrapper">
      <router-link to="/estafeta" class="center-btn shadow-sm">
        <i class="bi" :class="{ 'bi-house-door': $route.path !== '/estafeta', 'bi-house-door-fill': $route.path === '/estafeta' }"></i>
      </router-link>
    </div>

    <router-link to="/estafeta/ler-qr" class="nav-item">
      <i class="bi" :class="{ 'bi-camera': !$route.path.includes('/estafeta/ler-qr'), 'bi-camera-fill': $route.path.includes('/estafeta/ler-qr') }"></i>
    </router-link>

    <router-link to="/estafeta/perfil" class="nav-item">
      <i class="bi" :class="{ 'bi-person-badge': !$route.path.includes('/estafeta/perfil'), 'bi-person-badge-fill': $route.path.includes('/estafeta/perfil') }"></i>
    </router-link>
  </nav>
</template>

<style scoped>
/* A barra base verde escura */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 75px;
  background-color: var(--bs-primary);
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1050;
  padding: 0 10px;
}

/* Os ícones normais */
.nav-item {
  color: #ffffff;
  font-size: 2.5rem;
  text-decoration: none;
  transition: all 0.3s ease; /* Mudado para 'all' para a animação da cor ser suave */
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item:active {
  transform: scale(0.9);
}

/* --- A MAGIA DO CARTÃO INVERTIDO (NOVO) --- */
.nav-item.active-card {
  background-color: #ffffff;
  padding: 4px 16px; /* Cria o retângulo horizontal do teu mockup */
  border-radius: 12px; /* Os cantos arredondados */
}

/* Quando tem a classe ativa, o ícone lá dentro fica verde */
.nav-item.active-card i {
  color: var(--bs-primary); 
}
/* ------------------------------------------ */

/* O "invólucro" que puxa o botão central para cima */
.center-btn-wrapper {
  position: relative;
  top: -25px;
}

/* O botão da Casa */
.center-btn {
  background-color: var(--bs-primary);
  /* A borda bege que cria a ilusão do 'corte' na barra. 
     Se o fundo da tua app for outra cor, muda este #f4efeb */
  border: 6px solid var(--bs-secondary); 
  border-radius: 50%;
  height: 90px;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 2.5rem;
  text-decoration: none;
  transition: transform 0.2s;
}

.center-btn:active {
  transform: scale(0.95);
}

/* --- ESTILOS DO ÍCONE CUSTOMIZADO SVG --- */
.custom-icon {
  width: 42px; /* Mantém o mesmo tamanho dos outros ícones */
  height: 42px;
}

/* Estado Inativo (Fundo transparente, linhas brancas) */
.fundo-cartao {
  fill: transparent;
  stroke: #ffffff;
  stroke-width: 1.5;
  transition: all 0.3s ease;
}
.linhas-cartao {
  fill: none;
  stroke: #ffffff;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: all 0.3s ease;
}

/* Estado Ativo (Fundo fica branco sólido, linhas ficam da cor da barra) */
.custom-icon.ativo .fundo-cartao {
  fill: #ffffff;
  stroke: #ffffff;
}
.custom-icon.ativo .linhas-cartao {
  stroke: var(--bs-primary); /* Assume a tua cor verde escura automaticamente */
}   
</style>