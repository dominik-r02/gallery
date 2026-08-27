<template>
  <div class="flex gap-4 mb-8 last:mb-0">
    <AtomsAvatar :src="comment.avatar" :alt="comment.author" class="size-8" />
    <div class="flex-grow">
      <div class="flex items-center gap-2 mb-1">
        <h4 class="font-semibold text-sm sm:text-base">
          {{ comment.author }}
        </h4>
        <span class="text-xs text-gray-500 font-medium whitespace-nowrap">
          {{ formattedDate }}
        </span>
      </div>

      <p class="text-sm sm:text-base leading-relaxed break-words">
        {{ comment.content }}
      </p>

      <div
        class="flex items-center gap-4 mt-3 text-xs sm:text-sm font-semibold text-gray-500"
      >
        <button
          class="flex items-center gap-1.5 hover:text-brand transition-colors"
          aria-label="Lubię to"
        >
          <Icon name="lucide:thumbs-up" class="size-4" />
        </button>

        <button
          class="flex items-center gap-1.5 hover:text-red-500 transition-colors"
          aria-label="Nie lubię"
        >
          <Icon name="lucide:thumbs-down" class="size-4" />
        </button>

        <div class="w-px h-3 bg-gray-300"></div>

        <button
          class="flex items-center gap-1.5 hover:text-gray-800 transition-colors"
        >
          <Icon name="mdi-light:message-text" class="size-4" />
          <span>Odpowiedz</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '~~/shared/types/Comment'

const props = defineProps<{
  comment: Comment
}>()

const formattedDate = computed(() => {
  const date = new Date(props.comment.createdAt)
  const now = new Date()

  return new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  }).format(date)
})
</script>
