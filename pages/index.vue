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
                <v-btn class="mx-3" color="error" outlined small>effacer</v-btn>
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
      areas: []
    }
  },
  methods: {
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
