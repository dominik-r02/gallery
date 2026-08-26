<script setup>
/**
 * MetadataDisplay — pobiera i prezentuje metadane zdjęcia z picsum.photos.
 *
 * Oczekiwany format odpowiedzi z `https://picsum.photos/id/{id}/info`:
 * {
 *   "id": "1",
 *   "author": "Alejandro Escamilla",
 *   "width": 5616,
 *   "height": 3744,
 *   "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
 *   "download_url": "https://picsum.photos/id/1/5616/3744"
 * }
 */
const props = defineProps({
  infoUrl: {
    type: String,
    required: true
  }
})

const { data, pending, error, refresh } = await useFetch(props.infoUrl, {
  key: () => `photo-info-${props.infoUrl}`,
  // picsum.photos pozwala na CORS — pobieramy po stronie klienta, aby uniknąć
  // problemów z cache'owaniem SSR pomiędzy podstronami.
  server: false
})

// Proporcje zdjęcia wyrażone liczbowo (lekka informacja poglądowa).
const aspectRatio = computed(() => {
  if (!data.value?.width || !data.value?.height) return null
  const ratio = data.value.width / data.value.height
  return ratio.toFixed(2)
})
</script>

<template>
  <section
    class="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm"
    aria-labelledby="metadata-heading"
  >
    <h2 id="metadata-heading" class="text-lg font-semibold m-0 mb-4">
      Informacje o zdjęciu
    </h2>

    <div
      v-if="pending"
      class="flex items-center gap-3 text-gray-500"
      role="status"
      aria-live="polite"
    >
      <span
        class="w-4 h-4 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin"
        aria-hidden="true"
      />
      Ładowanie informacji…
    </div>

    <div v-else-if="error" class="flex flex-col items-start gap-2 text-red-700">
      <p class="m-0">Nie udało się pobrać informacji o zdjęciu.</p>
      <button
        type="button"
        class="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 hover:border-blue-600 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40"
        @click="refresh()"
      >
        Spróbuj ponownie
      </button>
    </div>

    <dl v-else-if="data" class="grid grid-cols-1 gap-3 m-0">
      <div
        class="grid grid-cols-1 min-[480px]:grid-cols-[140px_1fr] gap-1 min-[480px]:gap-4 pb-3 border-b border-gray-200 last:border-b-0 last:pb-0"
      >
        <dt class="font-semibold text-gray-500">Autor</dt>
        <dd class="m-0 text-gray-800">{{ data.author || '—' }}</dd>
      </div>
      <div
        class="grid grid-cols-1 min-[480px]:grid-cols-[140px_1fr] gap-1 min-[480px]:gap-4 pb-3 border-b border-gray-200 last:border-b-0 last:pb-0"
      >
        <dt class="font-semibold text-gray-500">Źródło</dt>
        <dd class="m-0 text-gray-800">
          <a
            v-if="data.url"
            :href="data.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline"
          >
            Zobacz na Unsplash ↗
          </a>
          <span v-else>—</span>
        </dd>
      </div>
    </dl>
  </section>
</template>
