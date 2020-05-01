<template>
  <div>
    <h1 class="text-center">Liste des zones géographiques</h1>
    <v-container fluid>
      <!-- areas display -->
      <v-row v-if="areas.length > 0">
        <v-col v-for="(area, index) in areas" :key="index" cols="12" sm="6" lg="4">
          <v-card hover>
            <v-card-title class="pb-0 font-weight-regular">{{ area.name }}</v-card-title>
            <v-container class="pt-0">
              <v-row>
                <v-subheader>Villes :
                  <span v-for="(city, index2) in area.cities" :key="index2" class="city">
                    {{ city.name }}
                  </span>
                </v-subheader>
              </v-row>
              <v-row class="mt-3" justify="end">
                <v-btn color="secondary" small outlined :to="'/'+area._id">détails</v-btn>
                <v-btn class="mx-3" color="error" outlined small @click="deleteArea(area)">effacer</v-btn>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <!-- Spinner while fetching data -->
      <v-row v-else-if="$fetchState.pending" justify="center">
        <v-progress-circular
          indeterminate
          rotate="4"
          size="18"
          width="2"
          color="secondary"
        />
      </v-row>

      <!-- error -->
      <v-row v-else-if="$fetchState.error" justify="center">
        <v-col cols="12" class="text-center">
          <div>Erreur avec le server</div>
        </v-col>
        <v-btn class="ml-3" small color="secondary" outlined @click="refresh">Rafraichir</v-btn>
      </v-row>

      <!-- no date -->
      <v-row v-else justify="center">
        <span>Aucune Zone Géographique enregistrée</span>
      </v-row>
    </v-container>

    <!-- Delete alert modal box -->
    <v-dialog v-model="deleteAlert" max-width="600">
      <v-alert
        border="left"
        type="error"
        colored-border
        elevation="3"
        class="mb-0"
      >
        <span class="font-weight-regular">Etes-vous sûr de vouloir supprimer {{ areaToDelete.name }} ?</span>
        <v-spacer />
        <v-btn text :disabled="pending" @click="close">Annuler</v-btn>
        <v-btn color="error" :disabled="pending" text @click="deleteArea(areaToDelete)">
          <div v-if="pending">
            <v-progress-circular
              indeterminate
              rotate="4"
              size="18"
              width="2"
              color="error"
            />
          </div>
          <span v-else>Oui</span>
        </v-btn>
      </v-alert>
    </v-dialog>
  </div>
</template>

<script>
export default {
  async fetch () {
    const { data } = await this.$axios.get('/api/areas/')
    this.areas = data
  },

  data () {
    return {
      areas: [],
      deleteAlert: false,
      pending: false,
      areaToDelete: {}
    }
  },

  methods: {
    close () {
      this.refresh()
      this.pending = false
      this.deleteAlert = false
      this.areaToDelete = {}
    },

    async deleteArea (area) {
      if (!this.deleteAlert) {
        this.deleteAlert = true
        this.areaToDelete = area
        return
      }
      try {
        this.pending = true
        await this.$axios.delete(`/api/areas/${area._id}`)
        this.close()
        this.$nuxt.$emit('show-snackbar', {
          message: 'Zone supprimée avec succès',
          status: 'success'
        })
      } catch (err) {
        this.pending = false
        this.$nuxt.$emit('show-snackbar', {
          message: 'Erreur avec le serveur, impossible de supprimer la zone',
          status: 'error'
        })
      }
    },

    refresh () {
      this.$fetch()
    }
  }
}
</script>

<style scoped lang="scss">
  .city {
    display: inline-block;
    margin-left: 4px;

    &:not(:last-child)::after {
      content: ' /';
    }
  }
</style>
