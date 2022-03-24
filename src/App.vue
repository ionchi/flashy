<template>
  <header class="bg-white px-6 py-4 shadow flex justify-between">
    <div class="font-black text-black w-16 tracking-widest">
      Flashy
    </div>
    <div>
      <img
        src="/github-mark.png"
        alt="Github Mark"
        class="header-social-logo"
        @click="toGithubRep"
      />
    </div>
  </header>

  <div class="container max-w-5xl mx-auto p-5 page-content flex flex-col">
    <game />
  </div>
</template>

<script setup lang="ts">
import Game from "@/components/Game.vue";

const toGithubRep = () => {
  if (!window) { return; }
  window.open('https://github.com/ionchi/flashy', '_blank')?.focus();
}
</script>


<style scoped lang="scss">
header {
  height: 56px;
}
.page-content {
  min-height: calc(100vh - 56px);
}
.header-social-logo {
  width: 28px;
  height: 28px;
  transition: all 200ms ease-in-out;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
}
</style>
