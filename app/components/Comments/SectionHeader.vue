<template>
  <div class="flex mb-8 items-center gap-4">
    <h2 class="text-lg font-semibold m-0">Komentarze</h2>
    <AtomsBadge>{{ count }}</AtomsBadge>
  </div>
</template>

<script setup lang="ts">
const { count } = defineProps<{
  count: number
}>()
</script>
