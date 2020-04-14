<template>
  <v-app>
    <v-app-bar class="gradient" app>
      <v-btn v-if="path === 'add'" text to="/">Retour</v-btn>
      <v-btn v-else text to="/add">Ajouter une Zone</v-btn>
      <v-spacer />
      <v-img src="/ascanio-logo.png" max-width="40px" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  computed: {
    path () {
      return this.$route.name
    }
  }
}
</script>
