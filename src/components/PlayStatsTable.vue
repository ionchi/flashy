<template>
  <table class="border-collapse table-auto w-full text-sm">
    <thead>
      <tr>
        <th class="border-b font-medium p-3 text-left">#</th>
        <th class="border-b font-medium p-3 text-left">When</th>
        <th class="border-b font-medium p-3 text-left">Difficulty</th>
        <th class="border-b font-medium p-3 text-left">Type</th>
        <th class="border-b font-medium p-3 text-left">Time</th>
        <th class="border-b font-medium p-3 text-left">Moves</th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr v-for="(game, index) in playedGames" :key="index">
        <td
          :class="[
            index < playedGames.length -1 && 'border-b',
            index < playedGames.length -1 && 'border-slate-100'
          ]"
          class="p-3 text-slate-500"
        >
          {{ index + 1 }}
        </td>
        <td
          :class="[
            index < playedGames.length -1 && 'border-b',
            index < playedGames.length -1 && 'border-slate-100'
          ]"
          class="p-3 text-slate-500"
        >
          {{ formatDate(game.date) }}
        </td>
        <td
          :class="[
            index < playedGames.length -1 && 'border-b',
            index < playedGames.length -1 && 'border-slate-100'
          ]"
          class="p-3 text-slate-500"
        >
          {{ game.difficulty.value }}
        </td>
        <td
          :class="[
            index < playedGames.length -1 && 'border-b',
            index < playedGames.length -1 && 'border-slate-100'
          ]"
          class="p-3 text-slate-500 capitalize"
        >
          {{ game.cardType }}s
        </td>
        <td
          :class="[
            index < playedGames.length -1 && 'border-b',
            index < playedGames.length -1 && 'border-slate-100'
          ]"
          class="p-3 text-slate-500"
        >
          {{ formatSeconds(game.time) }}
        </td>
        <td
          :class="[
            index < playedGames.length -1 && 'border-b',
            index < playedGames.length -1 && 'border-slate-100'
          ]"
          class="p-3 text-slate-500"
        >
          {{ game.moves }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { FlashyGame } from "@/types";
import { formatSeconds, formatDate } from "@/helpers";

defineProps<{
  playedGames: FlashyGame[]
}>();
</script>

<style scoped lang="scss">
.table-body {
  max-height: 212px !important;
  overflow-y: auto;
}
</style>
