<template>
  <div>
    <h1 class="text-center">Nouvelle zone géographique</h1>
    <v-container fluid>
      <v-form ref="form" v-model="valid">
        <v-row>
          <v-subheader class="title">Sélectionnez de 1 à 3 villes</v-subheader>
          <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            color="secondary"
            class="mx-4"
            flat
            hide-no-data
            hide-details
            label="Entrez le nom d'une ville"
            solo-inverted
          ></v-autocomplete>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      loading: false,
      entries: [],
      search: null,
      select: null,
      cities: []
    }
  },

  computed: {
    items () {
      return this.entries.map((entry) => {
        return entry.nom
      })
    }
  },

  watch: {
    async search (val) {
      if (val.length === 0) {
        this.entries = []
        return
      }

      // Items have already been loaded
      if (this.items.length > 0) {
        return
      }

      // Items have already been requested
      if (this.loading) {
        return
      }

      this.loading = true
      const { data } = await this.$axios.get('https://geo.api.gouv.fr/communes?nom=' + val)
      this.entries = data
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
