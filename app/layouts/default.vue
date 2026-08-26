<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased">
    <header class="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 font-bold text-lg text-gray-800"
        >
          <span class="text-2xl">📷</span>
          <span>PhotoApp</span>
        </NuxtLink>
        <nav class="flex gap-2 sm:gap-6" aria-label="Główna nawigacja">
          <NuxtLink
            to="/photo/1"
            class="px-3 py-2 rounded-lg text-gray-500 font-medium transition-colors hover:text-blue-600 hover:bg-blue-50"
            active-class="text-blue-600 bg-blue-100"
          >
            Zdjęcie 1
          </NuxtLink>
          <NuxtLink
            to="/photo/2"
            class="px-3 py-2 rounded-lg text-gray-500 font-medium transition-colors hover:text-blue-600 hover:bg-blue-50"
            active-class="text-blue-600 bg-blue-100"
          >
            Zdjęcie 2
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-8">
      <slot />
    </main>

    <footer class="border-t border-gray-200 bg-white py-6 px-4 text-center text-gray-500 text-sm">
      Szablon rekrutacyjny · Nuxt 4 · Tailwind CSS
    </footer>
  </div>
</template>
