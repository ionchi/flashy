<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        class="modal rounded"
      >
        <header id="modalTitle" class="modal-header d-flex content-center items-center justify-between bg-slate-100">
          <slot name="header">
            This is the default title!
          </slot>
          <button
            type="button"
            class="btn-close text-3xl"
            aria-label="Close modal"
            @click="$emit('closeModal')"
          >
            X
          </button>
        </header>

        <section id="modalDescription" class="modal-body bg-slate-200">
          <slot name="body">
            This is the default body!
          </slot>
        </section>

        <footer class="modal-footer bg-slate-100">
          <button
            type="button"
            class="base-button bg-green-700 rounded"
            aria-label="Close modal"
            @click="$emit('closeModal')"
          >
            Close Modal
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'closeModal'): void
}>();
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  position: relative;
  min-width: 400px;
  flex-direction: column;
  color: #000000;
  @media only screen and (max-width: 1024px) {
    min-width: 300px;
  }
}

.modal-header,
.modal-footer {
  padding: 15px 30px;
  display: flex;
  min-height: 56px;
  @media only screen and (max-width: 1024px) {
    padding: 15px 18px;
  }
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  height: auto;
  max-height: 268px;
  overflow-y: auto;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 30px;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #000000;
  background: transparent;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
</style>
