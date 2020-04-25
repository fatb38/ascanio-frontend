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
    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '~/components/Snackbar'

export default {
  components: { Snackbar },
  computed: {
    path () {
      return this.$route.name
    }
  }
}
</script>
