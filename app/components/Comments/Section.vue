<template>
  <section class="bg-white border border-gray-300 rounded-xl p-6 sm:p-8">
    <CommentsSectionHeader :count="meta.total" v-if="comments.length" />

    <CommentsComment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
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
