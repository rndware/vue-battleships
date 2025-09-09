<template>
  <div class="game-layout">
    <h1 class="game-layout__title">
      <slot name="title">Battleships</slot>
    </h1>

    <GameInfo
      :shots-fired="info.shotsFired"
      :hits="info.hits"
      :shots-remaining="info.shotsRemaining"
      :ships-remaining="info.shipsRemaining"
    />

    <div class="game-layout__grid-container">
      <GameBoard
        :grid="grid"
        :disabled="gameStatus !== 'in-progress'"
        @fire="$emit('fire', $event)"
      />
    </div>

    <InputSection
      v-model="inputValue"
      :placeholder="input.placeholder"
      :disabled="disabled"
      @submit="$emit('submit', inputValue)"
    />

    <div class="game-layout__message-container">
      <GameMessage v-if="message" :text="message.text" :type="message.type" />
      <ButtonNew v-if="gameStatus === 'win' || gameStatus === 'lose'" @click="$emit('new-game')" />
    </div>
    <ShipsStatus :ships="ships" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ref } from 'vue'

import type { MessageType, Coordinate, GridCellData, Ship, GameInfoData, GameStatus } from '@/types'
import { isValidInput } from '@/helpers/validations'
import GameInfo from '@/components/organisms/GameInfo.vue'
import GameBoard from '@/components/organisms/GameBoard.vue'
import InputSection from '@/components/organisms/InputSection.vue'
import ShipsStatus from '@/components/organisms/ShipsStatus.vue'
import ButtonNew from '@/components/atoms/ButtonNew.vue'
import GameMessage from '@/components/atoms/GameMessage.vue'

const props = defineProps<{
  info: GameInfoData
  grid: GridCellData[][]
  input: { placeholder?: string }
  message?: { type: MessageType; text: string }
  ships: Ship[]
  gameStatus: GameStatus
}>()

defineEmits<{
  (e: 'fire', coords: Coordinate): void
  (e: 'submit', coord: string): void
  (e: 'new-game'): void
}>()

const disabled = computed(
  () => !isValidInput(inputValue.value, props.grid) || props.gameStatus !== 'in-progress',
)
const inputValue = ref('')
</script>

<style scoped>
.game-layout {
  min-width: 385px;
  max-width: 550px;
  margin: 10px auto;
  padding: 30px 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  font-family: var(--font-family-sans);
}

.game-layout__title {
  text-align: center;
  font-size: 2.5rem;
  color: var(--blue-dark);
  margin-bottom: 30px;
}

.game-layout__grid-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.game-layout__message-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .game-layout {
    padding: 15px;
  }
  .game-layout__title {
    font-size: 2rem;
  }
}
</style>
