<script setup>
/**
 * PhotoViewer — wyświetla zdjęcie z możliwością powiększenia po kliknięciu.
 * Po kliknięciu otwierany jest lightbox (modal) z większą wersją obrazu.
 */
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Zdjęcie'
  }
})

const isOpen = ref(false)
const dialogRef = ref(null)

// Otwiera / zamyka lightbox.
function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

// Zamyka lightbox klawiszem Escape.
function handleKeydown(event) {
  if (event.key === 'Escape' && isOpen.value) {
    close()
  }
}

// Blokuje scroll strony podczas otwartego lightboxa.
watch(isOpen, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div class="mb-8">
    <button
      type="button"
      class="group relative block w-full p-0 border-0 bg-transparent cursor-zoom-in overflow-hidden rounded-xl shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40"
      :aria-label="`Powiększ: ${alt}`"
      @click="toggle"
    >
      <img
        :src="src"
        :alt="alt"
        class="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <span
        class="absolute left-1/2 bottom-4 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none"
      >
        Kliknij, aby powiększyć
      </span>
    </button>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isOpen"
          ref="dialogRef"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 cursor-zoom-out"
          role="dialog"
          aria-modal="true"
          :aria-label="alt"
          @click.self="close"
        >
          <button
            type="button"
            class="absolute top-5 right-5 w-12 h-12 rounded-full border-0 bg-white/15 text-white text-2xl leading-none cursor-pointer flex items-center justify-center transition hover:bg-white/30 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            aria-label="Zamknij"
            @click="close"
          >
            ×
          </button>
          <img
            :src="src"
            :alt="alt"
            class="max-w-[95vw] max-h-[95vh] object-contain rounded shadow-2xl"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* Minimalny blok CSS dla animacji Vue <Transition> — Tailwind nie ma
   wbudowanych enter/leave classes dla Vue. */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
