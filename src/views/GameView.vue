<template>
  <GameLayout
    :info="{ shotsFired, hits, shipsRemaining, shotsRemaining }"
    :grid="grid"
    :input="{ placeholder: '(e.g. B4)' }"
    :message="{ type: messageType, text: message }"
    :ships="ships"
    :game-status="gameStatus"
    @fire="fireAt"
    @submit="fireAtCoordinate"
    @new-game="resetGame"
  >
    <template #title>🚢 Vue Battleships</template>
  </GameLayout>
</template>

<script setup lang="ts">
import GameLayout from '@/components/templates/GameLayout.vue'
import { useBattleshipsGame } from '@/composables/useBattleshipsGame'

const {
  grid,
  ships,
  shotsFired,
  hits,
  message,
  messageType,
  gameStatus,
  shipsRemaining,
  shotsRemaining,
  fireAt,
  fireAtCoordinate,
  resetGame,
} = useBattleshipsGame()
</script>
