<template>
  <div
    :class="[
      (flashCard.flipped || flashCard.found) && 'is-flipped'
    ]"
    class="grid-cell"
    @click="$emit('flipCard', flashCard)"
  >
    <div class="card__face card__face--front bg-cyan-300 flex justify-center items-center select-none rounded drop-shadow-lg"></div>
    <div
      :class="[flashCard.found && 'found']"
      class="card__face card__face--back bg-cyan-800 flex justify-center items-center select-none rounded drop-shadow-lg"
    >
      <span v-if="flashCard.type === 'letter'">
        {{ flashCard.value }}
      </span>
      <img
        v-else-if="flashCard.type === 'icon'"
        :src="`game-icons/${flashCard.value}.png`"
        :alt="flashCard.value"
        class="card-icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from "@/types";

defineProps<{
  flashCard: Card
}>();

defineEmits<{
  (e: 'flipCard', card: Card): void
}>();
</script>

<style scoped lang="scss">
$cellWidth: 100px;
$mobileCellWidth: 50px;
$smallScreenWidth: 30px;
.grid-cell {
  width: #{$cellWidth};
  height: #{$cellWidth};
  color: #000;
  perspective: 1000px;
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d;
  transform-origin: center;
  transition: transform 500ms;
  @media only screen and (max-width: 1024px) {
    width: #{$mobileCellWidth};
    height: #{$mobileCellWidth};
  }
  @media only screen and (max-width: 490px) {
    width: #{$smallScreenWidth};
    height: #{$smallScreenWidth};
  }
  &.is-flipped {
    transform: rotateY(-180deg);
  }
  .card__face {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #000000;
    backface-visibility: hidden;
    transition: 0.6s;
    transform-style: preserve-3d;
  }

  .card__face--back {
    color: #ffffff;
    transform: rotateY(180deg);
    transition: font-size 500ms ease, font-weight 500ms ease, color 500ms ease;
    &.found {
      color: #08d508 !important;
      font-size: 22px !important;
    }
  }
  .card-icon {
    position: relative;
    width: 50%;
    height: 50%;
    filter: invert(100%);
    @media only screen and (max-width: 490px) {
      width: 80%;
      height: 80%;
    }
  }
}
</style>
