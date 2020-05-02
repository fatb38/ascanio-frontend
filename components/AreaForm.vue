<template>
  <div>
    <div class="d-sm-flex justify-space-between align-center pa-3">
      <slot />
      <div>
        <v-btn outlined small color="primary" :disabled="!valid" @click="save">
          Valider
        </v-btn>
        <v-btn outlined small class="ml-3" @click="$router.push('/')">
          Retour
        </v-btn>
      </div>
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
              :rules="[() => cities.length >= 1 || 'Au moins 1 ville est requise']"
              color="secondary"
              hide-no-data
              label="Entrez le nom d'une ville"
              outlined
              :disabled="cities.length >= 3"
              @change="addCity"
            />
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col
            v-for="(city, index) of cities"
            :key="index"
            cols="12"
            sm="4"
          >
            <v-card hover>
              <v-card-title>{{ index + 1 }} - {{ city.name }}</v-card-title>
              <v-container fluid>
                <v-row justify="center">
                  <v-col
                    v-for="(image, index2) in city.images"
                    :key="index2"
                    cols="2"
                    sm="4"
                  >
                    <v-img :src="image" :alt="city.name" aspect-ratio="1"/>
                  </v-col>
                </v-row>
                <v-card-actions class="d-flex justify-space-between">
                  <div>
                    <v-btn icon outlined small @click="arrayMove(cities, index, index - 1)">
                      <v-icon v-if="screenWidth >= 600">mdi-chevron-left</v-icon>
                      <v-icon v-else>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn class="ml-2" icon outlined small @click="arrayMove(cities, index, index + 1)">
                      <v-icon v-if="screenWidth >= 600">mdi-chevron-right</v-icon>
                      <v-icon v-else>mdi-chevron-down</v-icon>
                    </v-btn>
                  </div>
                  <v-btn color="error" icon small outlined @click="removeCity(index)">
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-btn>
                </v-card-actions>
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
  name: 'AreaForm',
  props: {
    cities: {
      type: Array,
      default () {
        return []
      }
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      valid: false,
      loading: false,
      entries: [],
      search: null,
      select: null
    }
  },

  computed: {
    area () {
      return {
        name: this.name,
        cities: this.cities
      }
    },
    items () {
      return this.entries.map((entry) => {
        return entry.nom
      })
    },
    screenWidth () {
      return window.innerWidth
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
      // checking if city is already selected
      const citiesNames = this.cities.map((city) => {
        return city.name
      })
      if (citiesNames.includes(this.select)) {
        return
      }

      // allow 3 cities maximum
      if (this.cities.length < 3) {
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
        const randomInt = Math.floor(Math.random() * (1000 - 1 + 1)) + 1
        urls.push(`https://picsum.photos/200?random=${randomInt}`)
      }
      return urls
    },

    arrayMove (array, fromIndex, toIndex) {
      const element = array[fromIndex]
      array.splice(fromIndex, 1)
      array.splice(toIndex, 0, element)
    },

    removeCity (index) {
      this.cities.splice(index, 1)
    },

    resetSearch () {
      this.select = null
      this.entries = []
      this.search = null
    },

    save () {
      if (this.$refs.form.validate()) {
        this.$emit('save-area', this.area)
      }
    }
  }
}
</script>

<style scoped>

</style>
