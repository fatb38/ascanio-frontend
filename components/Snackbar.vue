<template>
  <v-snackbar
    v-model="snackbar"
    :color="color"
    :timeout="2000"
    dark
  >
    <div class="d-flex justify-start align-center">
      <v-icon v-if="status === 'error'">
        mdi-alert-circle
      </v-icon>
      <v-icon v-else>
        mdi-check
      </v-icon>
      <div class="ml-3">
        {{ message }}
      </div>
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
      status: null,
      color: null
    }
  },

  watch: {
    snackbar (val) {
      if (!val) {
        this.message = null
        this.status = null
        this.color = null
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
      this.color = status
    }
  }
}
</script>
