<template>
  <main class="flex-1 flex flex-col justify-center items-center">
    <div v-if="!gameStarted" class="flex flex-col items-center justify-center">
      <div class="text-4xl mb-10">
        New Game
      </div>
      <div class="text-1xl mb-3">
        Select Game Difficulty:
      </div>
      <div class="flex items-center justify-center">
        <div
          v-for="(level, index) in difficultyLevels"
          :key="level.value"
          :class="[
            (index < difficultyLevels.length - 1) && 'mr-3',
            level.value === currentGameDifficulty?.value && 'selected'
          ]"
          class="rounded setting-selection-box bg-green-500 flex items-center justify-center text-black hover:bg-green-400"
          @click="selectLevel(level)"
        >
          {{ level.value }}
        </div>
      </div>
      <div class="text-1xl mb-3 mt-8">
        Select Symbol Type:
      </div>
      <div class="flex items-center justify-center">
        <div
          v-for="(type, index) in symbolTypes"
          :key="type"
          :class="[
            (index < symbolTypes.length - 1) && 'mr-3',
            type === currentGameCardType && 'selected'
          ]"
          class="rounded setting-selection-box bg-green-500 flex items-center justify-center text-black hover:bg-green-400 uppercase"
          @click="selectSymbolType(type)"
        >
          {{ type }}s
        </div>
      </div>
      <div class="mt-8 text-center">
        <button
          :disabled="!currentGameCardType || !currentGameDifficulty"
          :class="[(!currentGameCardType || !currentGameDifficulty) && 'disabled']"
          type="button"
          class="base-button bg-green-700 rounded"
          aria-label="Start Game"
          @click="startGame"
        >
          Start Game
        </button>
      </div>
    </div>
    <game-grid
      v-if="gameStarted"
      :game-difficulty="currentGameDifficulty"
      :card-type="currentGameCardType"
      @newGame="newGame"
    />
  </main>
</template>

<script setup lang="ts">
import { $ref } from 'vue/macros';
import type { CardType, GameDifficulty } from '@/types';
import { getAvailableDifficulties, getCurrentGame, removeCurrentGame } from "@/helpers";
import GameGrid from "@/components/GameGrid.vue";
import { onMounted } from "vue";

let currentGameDifficulty: GameDifficulty | null = $ref(null);
let currentGameCardType: CardType | null = $ref(null);
let gameStarted = $ref(false);
let difficultyLevels: GameDifficulty[] = $ref();

const symbolTypes: CardType[] = ['letter', 'icon'];

const selectLevel = (level: GameDifficulty) => {
  currentGameDifficulty = level;
};

const selectSymbolType = (type: CardType) => {
  currentGameCardType = type;
};

const startGame = () => {
  if (currentGameCardType && currentGameDifficulty) {
    gameStarted = true;
  }
};

const newGame = () => {
  gameStarted = false;
  currentGameCardType = null;
  currentGameDifficulty = null;
  removeCurrentGame();
};

onMounted(() => {
  difficultyLevels = getAvailableDifficulties();
  const savedGame = getCurrentGame();
  if (savedGame) {
    currentGameCardType = savedGame.game.cardType;
    currentGameDifficulty = savedGame.game.difficulty;
    gameStarted = true;
  }
});
</script>

<style lang="scss">
.setting-selection-box {
  height: 50px;
  width: 100px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all .2s ease-in-out;
  &.selected {
    transform: scale(1.1);
    border-color: #f8f8f8;
    color: #FFFFFF;
  }
}
</style>
