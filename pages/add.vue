<template>
  <div>
    <div class="d-flex justify-space-between align-center pa-3">
      <h1 class="text-center">Nouvelle zone</h1>
      <v-btn
        outlined
        color="primary"
      >
        Valider
      </v-btn>
    </div>
    <v-container fluid>
      <v-form ref="form" v-model="valid">
        <v-row no-gutters>
          <v-col cols="12" sm="3">
            <v-subheader class="title px-0">Nom de la zone</v-subheader>
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field
              v-model="name"
              :rules="[v => !!v || 'Le nom est requis']"
              label="Nom"
              color="secondary"
              outlined
            />
          </v-col>
        </v-row>
        <v-row no-gutters justify="start">
          <v-col cols="12" sm="3">
            <v-subheader class="title px-0">Sélectionnez de 1 à 3 villes</v-subheader>
          </v-col>
          <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="select"
              :loading="loading"
              :items="items"
              :search-input.sync="search"
              color="secondary"
              hide-no-data
              hide-details
              label="Entrez le nom d'une ville"
              outlined
              @change="addCity"
            />
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col
            v-for="(city, index) of cities"
            :key="index"
            justify="space-between"
            cols="12"
            sm="4"
          >
            <v-card hover>
              <v-card-title>{{ city.name }}</v-card-title>
              <v-container fluid>
                <v-row justify="center">
                  <v-col
                    v-for="(image, index2) in city.images"
                    :key="index2"
                    cols="2"
                    sm="4"
                  >
                    <v-img :src="image" :alt="city.name" aspect-ratio="1" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: null,
      valid: false,
      loading: false,
      entries: [],
      search: null,
      select: null,
      cities: [],
      imagesIndex: 1
    }
  },

  computed: {
    items () {
      return this.entries.map((entry) => {
        return entry.nom
      })
    },
    area () {
      return {
        name: this.name,
        cities: this.cities
      }
    }
  },

  watch: {
    async search (val) {
      if (val === null) {
        return
      }

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
  },

  methods: {
    addCity () {
      if (this.cities.length < 3 && !this.cities.includes(this.select)) {
        this.cities.push({
          name: this.select,
          images: this.generateImagesUrl()
        })
        this.resetSearch()
      }
    },

    generateImagesUrl () {
      const urls = []
      for (let i = 0; i < 5; i++) {
        urls.push(`https://picsum.photos/200?random=${this.imagesIndex}`)
        this.imagesIndex++
      }
      return urls
    },

    resetSearch () {
      this.select = null
      this.entries = []
      this.search = null
    }
  }
}
</script>
