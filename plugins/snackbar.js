import Vue from 'vue'

Vue.mixin({
  methods: {
    $emitSnackbarEvent (event) {
      let payload
      switch (event) {
        case 'save-success':
          payload = {
            message: 'La zone a été sauvegardée avec succès',
            status: 'success'
          }
          break
        case 'delete-success':
          payload = {
            message: 'La zone a été supprimée avec succès',
            status: 'success'
          }
          break
        case 'error':
          payload = {
            message: 'Erreur avec le serveur, impossible de supprimer la zone',
            status: 'error'
          }
      }
      this.$nuxt.$emit('show-snackbar', payload)
    }
  }
})
