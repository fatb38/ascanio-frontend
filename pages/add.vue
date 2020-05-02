<template>
  <AreaForm @save-area="save($event)">
    <h1>Nouvelle Zone</h1>
  </AreaForm>
</template>

<script>
import AreaForm from '../components/AreaForm'

export default {
  components: { AreaForm },
  methods: {
    async save (area) {
      try {
        await this.$axios.post('/api/areas/', area)
        this.$emitSnackbarEvent('save-success')
        await this.$router.push('/')
      } catch (error) {
        this.$emitSnackbarEvent('error')
      }
    }
  }
}
</script>
