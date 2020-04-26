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
            @change="addCity"
          ></v-autocomplete>
        </v-row>
        <v-row>
          <div class="pic" v-for="(city, index) of cities" :key="index">
            <img v-for="(image, index2) in city.images" :key="index2" :src="image" :alt="city.name">
          </div>
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

<style scoped lang="scss">
  .pic {
    display: flex;
    flex-wrap: nowrap;

    img {
      max-width: 100%;
    }
  }
</style>
