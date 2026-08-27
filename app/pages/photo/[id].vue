<script setup>
const route = useRoute()

// Mapowanie identyfikatorów zadania (1, 2) na identyfikatory zdjęć w picsum.
// Pozwala wyświetlać nowsze zdjęcia z serwisu, zachowując kanoniczne ID używane
// w routingu oraz w pliku comments.json.
const PICSUUM_IDS = {
  1: '1015',
  2: '1062',
}

// Identyfikator zdjęcia pobierany z parametru ścieżki (widoczny dla kandydata).
const photoId = computed(() => String(route.params.id))

// Wewnętrzny identyfikator używany do budowania adresów w picsum.photos.
const picsumId = computed(() => PICSUUM_IDS[photoId.value] ?? photoId.value)

// Adres zdjęcia z picsum.photos — stały rozmiar dla spójnego layoutu.
const photoUrl = computed(
  () => `https://picsum.photos/id/${picsumId.value}/1200/800`
)

// Adres endpointu z informacjami o zdjęciu.
const photoInfoUrl = computed(
  () => `https://picsum.photos/id/${picsumId.value}/info`
)

useHead(() => ({
  title: `Zdjęcie ${photoId.value}`,
}))
</script>

<template>
  <section class="max-w-4xl mx-auto">
    <header class="mb-8">
      <NuxtLink
        to="/"
        class="inline-block text-gray-500 text-sm mb-3 hover:text-blue-600 transition-colors"
      >
        ← Wróć do strony głównej
      </NuxtLink>
      <h1 class="text-2xl sm:text-3xl font-bold m-0">Zdjęcie {{ photoId }}</h1>
    </header>

    <PhotoViewer :src="photoUrl" :alt="`Zdjęcie numer ${photoId}`" />

    <MetadataDisplay :info-url="photoInfoUrl" />

    <!--
      ===========================================================================
      TODO — zadanie dla kandydata

      W tym miejscu powinien zostać dodany komponent (np. CommentsSection.vue),
      który pobierze komentarze z endpointu /api/comments.json i wyświetli je
      dla bieżącego zdjęcia (photoId).

      Wskazówki:
      - endpoint zwraca tablicę obiektów z polem `photoId`
      - filtruj po `photoId` równym aktualnemu identyfikatorowi zdjęcia
      - zadbaj o stany: ładowanie, błąd, brak komentarzy
      ===========================================================================
    -->
    <CommentsSection :photo-id="photoId" />
  </section>
</template>
