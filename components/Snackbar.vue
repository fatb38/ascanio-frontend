<template>
  <v-snackbar v-model="snackbar" dark :timeout="3000">
    <div class="d-flex justify-start align-center">
      <v-icon v-if="status === 'error'" color="error">mdi-alert-circle</v-icon>
      <v-icon v-else color="success">mdi-check</v-icon>
      <div class="ml-3">{{ message }}</div>
    </div>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  data () {
    return {
      snackbar: false,
      message: null,
      status: null
    }
  },

  watch: {
    snackbar (val) {
      if (!val) {
        this.message = null
        this.status = null
      }
    }
  },

  created () {
    this.$nuxt.$on('show-snackbar', ({ message, status }) => {
      this.showSnackbar(message, status)
    })
  },

  methods: {
    showSnackbar (message, status) {
      this.snackbar = true
      this.message = message
      this.status = status
    }
  }
}
</script>
