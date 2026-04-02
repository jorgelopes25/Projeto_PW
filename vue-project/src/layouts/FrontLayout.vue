<template>
  <div class="front-office-layout">
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <router-link to="/" class="navbar-brand fw-bold text-primary">GoFashion</router-link>
        <div class="navbar-nav ms-auto">
          <router-link to="/" class="nav-link">Catálogo</router-link>
          <router-link to="/checkout" class="nav-link">Submeter Pedido</router-link>
        </div>
      </div>
    </nav>

    <main class="container my-5">
      <router-view></router-view>
    </main>
  </div>
</template>