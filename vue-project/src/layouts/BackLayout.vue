<template>
  <div class="back-office-layout d-flex" style="min-height: 100vh;">
    <div class="bg-dark text-white p-3" style="width: 250px;">
      <h5 class="mb-4">Painel de Gestão</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><router-link to="/backoffice" class="nav-link text-white">Dashboard</router-link></li>
        <li class="nav-item mb-2"><router-link to="/backoffice/pedidos" class="nav-link text-white">Gestão de Pedidos</router-link></li>
      </ul>
    </div>

    <main class="flex-grow-1 p-4 bg-light">
      <router-view></router-view>
    </main>
  </div>
</template>