<template>
  <div class="error-view">
    <section class="error">
      <div class="error__content">
        <div class="error__logo">🚢</div>
        <h1 class="error__title">Error!</h1>
        <p class="error__subtitle">Looks like the app sunk instead!</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.error {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: var(--black);
  text-align: center;
  font-family: var(--font-family);
}

.error__content {
  z-index: 2;
}

.error__logo {
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: error__float var(--long-transition) ease-in-out infinite;
  transform: rotate(180deg);
}

.error__title {
  font-size: 4rem;
  color: var(--dark-blue);
  margin-bottom: 1rem;
}

.error__subtitle {
  color: var(--gray-dark);
  font-size: 1.5rem;
  margin-bottom: 4rem;
}

@keyframes error__float {
  0%,
  100% {
    transform: translateY(0) rotate(180deg);
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
  }
}
</style>
