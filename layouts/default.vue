<template>
  <v-app>
    <v-app-bar class="gradient" app>
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
  components: { Snackbar }
}
</script>
