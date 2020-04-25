<template>
  <v-app>
    <v-app-bar class="gradient" app>
      <v-btn v-if="path === 'add'" text to="/">
        Retour
      </v-btn>
      <v-btn v-else text to="/add">
        Ajouter une Zone
      </v-btn>
      <v-spacer />
      <v-img src="/ascanio-logo.png" max-width="40px" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-snackbar v-model="snackbar" :color="color" :timeout="3000">
      {{ message }}
    </v-snackbar>
  </v-app>
</template>

<script>
export default {

  data () {
    return {
      snackbar: false,
      color: null,
      message: null
    }
  },

  computed: {
    path () {
      return this.$route.name
    }
  },

  watch: {
    snackbar (val) {
      if (!val) {
        this.message = null
      }
    }
  },

  created () {
    this.$nuxt.$on('snackbar', ({ message, status }) => {
      this.showSnackbar(message, status)
    })
  },

  methods: {
    showSnackbar (message, status) {
      this.snackbar = true
      this.message = message
      switch (status) {
        case 'success':
          this.color = 'success'
          break
        case 'error' :
          this.color = 'secondary'
          break
      }
    }
  }
}
</script>
