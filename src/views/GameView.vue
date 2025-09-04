<template>
  <GameLayout
    :info="{ shotsFired, hits, shipsRemaining }"
    :grid="grid"
    :input="{ placeholder: '(e.g. B4)' }"
    :message="{ type: messageType, text: message }"
    :ships="ships"
    :game-won="gameWon"
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
  gameWon,
  shipsRemaining,
  fireAt,
  fireAtCoordinate,
  resetGame,
} = useBattleshipsGame()
</script>
