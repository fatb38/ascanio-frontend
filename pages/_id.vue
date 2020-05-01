<template>
  <div>
    <h1>Welcome home boy</h1>
    <v-btn small outlined @click="$nuxt.$emit('snackbarClient', {message: 'hello error', status: 'error'})">TEST</v-btn>
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $axios, error }) {
    try {
      const { data, status } = await $axios.get(`/api/areas/${params.id}/`)
      if (status === 200 && data.name === 'CastError') {
        return error()
      }
      return { scenario: data }
    } catch (err) {
      error({ statusCode: 500 })
    }
  }
}
</script>

<style scoped>

</style>
