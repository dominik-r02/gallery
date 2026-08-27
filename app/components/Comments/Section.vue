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
    </template>
  </section>
</template>

<script setup lang="ts">
const { comments, getComments, isLoading, error, meta } = useComments()

const { photoId } = defineProps<{
  photoId: string
}>()

onMounted(async () => {
  await getComments(photoId)
})
</script>
