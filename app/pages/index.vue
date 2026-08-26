<script setup>
useHead({
  title: 'PhotoApp — zadanie rekrutacyjne'
})

// Przykładowy komentarz prezentowany w dokumentacji endpointu.
const exampleComment = `{
  "id": "4866",
  "photoId": "1",
  "author": "Marta Lewandowska",
  "avatar": "https://i.pravatar.cc/100?img=5",
  "content": "Wow, klimat tego miejsca jest niepowtarzalny.",
  "createdAt": "2026-08-16T14:45:30Z"
}`
</script>

<template>
  <article class="max-w-3xl mx-auto">
    <header class="mb-10">
      <h1 class="text-3xl sm:text-4xl font-bold mb-3">Zadanie rekrutacyjne</h1>
      <p class="text-gray-500 text-lg">
        Senior Frontend Developer · Nuxt 4 · Vue 3
      </p>
    </header>

    <!-- Wprowadzenie -->
    <section class="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
      <h2 class="text-xl font-semibold mt-0 mb-3">Wprowadzenie</h2>
      <p class="text-gray-700 leading-relaxed m-0">
        Aplikacja posiada już zaimplementowane: nawigację, podgląd zdjęć
        z funkcją powiększenia (lightbox) oraz wyświetlanie informacji o autorze
        zdjęcia. Twoim zadaniem jest obsługa sekcji komentarzy na stronie
        wybranego zdjęcia.
      </p>
    </section>

    <!-- Dostępne zdjęcia -->
    <section class="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
      <h2 class="text-xl font-semibold mt-0 mb-3">Dostępne zdjęcia</h2>
      <p class="text-gray-700 m-0 mb-4">
        W aplikacji znajdują się dwa zdjęcia. Do każdego prowadzi link z górnej
        nawigacji oraz bezpośredni adres URL:
      </p>

      <ul class="list-none space-y-3 m-0 p-0">
        <li class="flex flex-col gap-1 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div class="flex items-baseline gap-2 flex-wrap">
            <strong class="text-gray-800">Zdjęcie 1</strong>
            <NuxtLink
              to="/photo/1"
              class="text-blue-600 hover:underline font-mono text-sm"
            >
              /photo/1
            </NuxtLink>
          </div>

        </li>
        <li class="flex flex-col gap-1 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div class="flex items-baseline gap-2 flex-wrap">
            <strong class="text-gray-800">Zdjęcie 2</strong>
            <NuxtLink
              to="/photo/2"
              class="text-blue-600 hover:underline font-mono text-sm"
            >
              /photo/2
            </NuxtLink>
          </div>
        </li>
      </ul>
    </section>

    <!-- Co zrobić -->
    <section class="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
      <h2 class="text-xl font-semibold mt-0 mb-3">Co musisz zrobić</h2>
      <ol class="list-decimal list-inside text-gray-700 space-y-1.5 m-0">
        <li>
          Na stronie wybranego zdjęcia
          (<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm">/photo/[id]</code>)
          pobierz komentarze z endpointu
          <code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm">/api/comments.json</code>.
        </li>
        <li>
          Przefiltruj je po polu
          <code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm">photoId</code>
          zgodnym z identyfikatorem aktualnie wyświetlanego zdjęcia.
        </li>
        <li>Wyświetl komentarze w przemyślany sposób — decyzja należy do Ciebie.</li>
        <li>Zadbaj o poprawne stany UI: ładowanie, błąd, brak komentarzy.</li>
      </ol>
    </section>

    <!-- Endpoint API -->
    <section class="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
      <h2 class="text-xl font-semibold mt-0 mb-3">Endpoint API</h2>
      <p class="text-gray-700 m-0 mb-2">
        Komentarze dostępne są jako statyczny plik JSON pod ścieżką:
      </p>
      <p class="m-0 mb-4">
        <code class="bg-gray-900 text-gray-100 px-2 py-1 rounded text-sm font-mono">
          GET /api/comments.json
        </code>
      </p>
      <p class="text-gray-700 m-0 mb-2">Struktura pojedynczego komentarza:</p>
      <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed m-0 font-mono"><code>{{ exampleComment }}</code></pre>
    </section>
  </article>
</template>
