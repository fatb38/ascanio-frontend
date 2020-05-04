<template>
  <v-app>
    <div class="text-center">
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else-if="error.statusCode === 204">
        {{ wrongId }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <NuxtLink to="/">
        <v-btn small text color="secondary">retour à l'accueil</v-btn>
      </NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Page introuvable',
      wrongId: 'Zone introuvable',
      otherError: 'Erreur du serveur'
    }
  },
  head () {
    let title
    switch (this.error.statusCode) {
      case 404:
        title = this.pageNotFound
        break
      case 204:
        title = this.wrongId
        break
      default:
        title = this.otherError
        break
    }
    return { title }
  }
}
</script>

<style scoped>
  h1 {
    font-size: 20px;
  }
</style>
