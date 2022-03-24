<template>
  <div class="self-center mb-4 flex justify-between items-center grid-header">
    <div class="flex items-center mr-10">
      <button
        :disabled="playedGames.length === 0"
        :class="[playedGames.length === 0 && 'disabled']"
        title="Your Game Stats"
        class="icon-button flex justify-center content-center mr-4"
        @click="showModal"
      >
        <icon-stats class="self-center" />
      </button>
      <button
        class="base-button rounded bg-orange-800 flex justify-center small"
        @click="startFromSettings"
      >
        New Game
      </button>
    </div>
    <div class="flex justify-end">
      <div>
        {{ visibleTime }}
      </div>
      <div class="mx-2">
        |
      </div>
      <div>
        Moves {{ currentGame.moves }}
      </div>
    </div>
  </div>

  <div class="self-center bg-gradient-to-r from-cyan-500 to-blue-500 game-grid p-2 lg:p-5 rounded">
    <div
      v-for="(row, index) in grid"
      :key="index"
      :class="[index < grid.length - 1 && 'mb-2 lg:mb-5']"
      class="grid-row flex"
    >
      <flash-card
        v-for="(cell, cellIndex) in row"
        :key="cell"
        :class="[
          cellIndex < row.length - 1 && 'mr-2 lg:mr-5',
        ]"
        :flash-card="cell"
        @flipCard="handleClick"
      />
    </div>
    <div :class="[gameOver && 'show-overlay']" class="game-over-overlay flex flex-col items-center justify-center rounded">
      <div class="text-center text-2xl sm:text-4xl lg:text-5xl mb-2 font-semibold">
        YOU WON
      </div>
      <div class="mb-3 font-semibold text-center">
        Time {{ visibleTime }} <span class="hidden sm:inline">|</span><br class="sm:hidden" /> Moves {{ currentGame.moves }}
      </div>
      <button class="base-button bg-green-700 rounded" @click="startFromSettings">New Game</button>
    </div>
  </div>

  <base-modal
    v-if="playedGames.length > 0"
    v-show="showStatsDialog"
    @closeModal="closeModal"
  >
    <template #header>
      <div class="flex items-center">
        <div class="text-2xl">
          Stats
        </div>
        <button
          class="base-button rounded bg-orange-700 flex justify-center small ml-4"
          @click="resetGameStats"
        >
          Reset Stats
        </button>
      </div>
    </template>

    <template #body>
      <play-stats-table :played-games="playedGames" />
    </template>
  </base-modal>
</template>

<script setup lang="ts">
import type { GameDifficulty } from "@/types";
import { onMounted } from "vue";
import { $ref, $computed } from 'vue/macros';
import type { Card, FlashyGame, CardType, ActiveGameStats } from "@/types";
import {
  formatSeconds,
  getGameStats,
  getGameSymbols,
  resetStats,
  saveGameStats,
  getCurrentGame,
  saveCurrentGame,
  removeCurrentGame
} from "@/helpers";
import FlashCard from "@/components/FlashCard.vue";
import IconStats from "@/components/icons/IconStats.vue";
import BaseModal from "@/components/BaseModal.vue";
import PlayStatsTable from "@/components/PlayStatsTable.vue";

const props = defineProps<{
  gameDifficulty: GameDifficulty | null,
  cardType: CardType | null
}>();
const emits = defineEmits<{
  (e: 'newGame'): void
}>();

let playedGames = $ref([] as FlashyGame[]);
let grid = $ref([] as Card[][]);
let deck = $ref([] as Array<Card>);
let cardSelected = $ref([] as Array<Card>);
let currentGame: FlashyGame = $ref({
  cardType: props.cardType,
  time: 0,
  difficulty: props.gameDifficulty,
  moves: 0
});
let isTimeRunning = $ref(false);
let intervalId = $ref(0);
let cardFlippedTimeoutId = $ref(0);
let showStatsDialog = $ref(false);

onMounted(() => {
  playedGames = getGameStats();
  const savedGame: ActiveGameStats | null = getCurrentGame();
  if (savedGame) {
    resumeSavedGame(savedGame);
  } else {
    newGame();
    saveGame();
  }
});

const gameOver = $computed(() => {
  if (deck?.length === 0) { return false; }
  return deck.every((card: Card) => card.found);
});
const visibleTime = $computed(() => {
  return formatSeconds(currentGame.time);
});

const generateDeck = () => {
  if (!props.gameDifficulty || !props.cardType) { return; }
  const symbolsLength = props.gameDifficulty.size * props.gameDifficulty.size / 2;
  const symbols = getGameSymbols(symbolsLength, props.cardType);
  deck = [...symbols, ...symbols].map(el => {
    return {
      type: currentGame.cardType,
      value: el,
      flipped: false,
      found: false
    };
  }).sort(() => 0.5 - Math.random());
};

const newGame = () => {
  removeCurrentGame();
  generateDeck();
  populateGrid();
  currentGame.time = 0;
  currentGame.moves = 0;
};

const resumeSavedGame = (savedGame: ActiveGameStats) => {
  deck = savedGame.deck;
  currentGame = savedGame.game;
  populateGrid();
};

const populateGrid = () => {
  if (!currentGame?.difficulty) { return; }
  grid = [];
  let cardIndex = 0;
  for (let i = 0; i < currentGame.difficulty.size; i++) {
    const rowCards = [...Array(currentGame.difficulty.size)].map(() => {
      const card = deck[cardIndex];
      cardIndex++;
      return card;
    });
    grid.push(rowCards);
  }
};

const handleClick = (card: Card) => {
  if (!isTimeRunning && !gameOver) {
    toggleTimer();
  }
  if (!card.found && !card.flipped) {
    if (cardFlippedTimeoutId && cardSelected.length === 2) {
      clearTimeout(cardFlippedTimeoutId);
      clearSelectedCards();
    }
    if (cardSelected.length < 2) {
      card.flipped = true;
      cardSelected.push(card);
      if (cardSelected.length === 2) {
        currentGame.moves++;
        if (cardSelected[0].value === card.value) {
          cardSelected[0].found = true;
          card.found = true;
        }
        cardFlippedTimeoutId = setTimeout(clearSelectedCards, 1000);
      }
    }
  }
  if (gameOver && isTimeRunning) {
    toggleTimer();
    saveCurrentGameStats();
    saveGame();
  }
};

const clearSelectedCards = () => {
  deck = deck.map(el => {
    el.flipped = false;
    return el;
  });
  cardSelected = [];
};

const toggleTimer = () => {
  if (isTimeRunning) {
    clearInterval(intervalId);
  } else {
    intervalId = setInterval(incrementTime, 1000);
  }
  isTimeRunning = !isTimeRunning;
};
const incrementTime = () => {
  currentGame.time = currentGame.time + 1;
};

const saveCurrentGameStats = () => {
  playedGames.push({
    ...currentGame,
    date: new Date().toISOString()
  });
  saveGameStats(playedGames);
};

const showModal = () => {
  showStatsDialog = true;
};
const closeModal = () => {
  showStatsDialog = false;
};
const resetGameStats = () => {
  closeModal();
  playedGames = [];
  resetStats();
};
const saveGame = () => {
  saveCurrentGame({ deck, game: currentGame });
};

const startFromSettings = () => {
  emits('newGame');
};
</script>

<style scoped lang="scss">
$size: v-bind('gameDifficulty.size');
$cellWidth: 100px;
$mobileCellWidth: 50px;
$smallScreenWidth: 30px;
.grid-header {
  min-width: 220px;
  width: calc((#{$size} * #{$cellWidth}) + (20px * (#{$size} - 1)) + 40px);
  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
}
.game-grid {
  position: relative;
  width: calc((#{$size} * #{$cellWidth}) + (20px * (#{$size} - 1)) + 40px);
  height: calc((#{$size} * #{$cellWidth}) + (20px * (#{$size} - 1)) + 40px);
  @media only screen and (max-width: 1024px) {
    width: calc((#{$size} * #{$mobileCellWidth}) + (8px * (#{$size} - 1)) + 16px);
    height: calc((#{$size} * #{$mobileCellWidth}) + (8px * (#{$size} - 1)) + 16px);
  }
  @media only screen and (max-width: 490px) {
    width: calc((#{$size} * #{$smallScreenWidth}) + (8px * (#{$size} - 1)) + 16px);
    height: calc((#{$size} * #{$smallScreenWidth}) + (8px * (#{$size} - 1)) + 16px);
  }
}
.game-over-overlay {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  color: #000000;
  opacity: 0;
  width: calc((#{$size} * #{$cellWidth}) + (20px * (#{$size} - 1)) + 40px);
  height: calc((#{$size} * #{$cellWidth}) + (20px * (#{$size} - 1)) + 40px);
  transition: opacity 250ms ease;
  z-index: -1;
  @media only screen and (max-width: 1024px) {
    width: calc((#{$size} * #{$mobileCellWidth}) + (8px * (#{$size} - 1)) + 16px);
    height: calc((#{$size} * #{$mobileCellWidth}) + (8px * (#{$size} - 1)) + 16px);
  }
  @media only screen and (max-width: 490px) {
    width: calc((#{$size} * #{$smallScreenWidth}) + (8px * (#{$size} - 1)) + 16px);
    height: calc((#{$size} * #{$smallScreenWidth}) + (8px * (#{$size} - 1)) + 16px);
  }
  &.show-overlay {
    opacity: 1;
    z-index: 2;
  }
}
</style>
