<template>
  <section class="bg-white border border-gray-300 rounded-xl p-6 sm:p-8">
    <template v-if="isLoading">
      <CommentsCommentLoader v-for="i in 3" :key="i" />
    </template>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 font-medium">{{ error }}</p>
    </div>

    <div v-else-if="!comments.length" class="text-center py-8">
      <p class="text-gray-500 font-medium text-sm sm:text-base">
        Brak komentarzy.
      </p>
    </div>

    <template v-else>
      <CommentsSectionHeader :count="meta.total" />

      <CommentsComment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />

      <div
        v-if="meta.hasMore"
        class="mt-8 text-center border-t border-gray-100 pt-6"
      >
        <button
          @click="loadMoreComments(photoId)"
          :disabled="isFetchingMore"
          class="font-semibold text-sm text-brand hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          <Icon
            v-if="isFetchingMore"
            name="lucide:loader-2"
            class="size-4 animate-spin text-brand"
          />
          <span class="flex gap-2" v-else
            >Załaduj starsze komentarze
            <Icon class="size-5" name="material-symbols:arrow-downward-alt"
          /></span>
        </button>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
const {
  comments,
  getComments,
  loadMoreComments,
  isLoading,
  isFetchingMore,
  error,
  meta,
} = useComments()

const { photoId } = defineProps<{
  photoId: string
}>()

onMounted(async () => {
  await getComments(photoId)
})
</script>
