<template>

  <div class="content">
    <h1 class="text-center">Liste des zones géographiques</h1>
    <v-container fluid>
      <v-row v-if="areas">
        <v-col v-for="(area, index) in areas" :key="index" cols="12" sm="6" lg="4">
          <v-card hover>
            <v-card-title class="pb-0">{{ area.name }}</v-card-title>
            <v-container class="pt-0">
              <v-row>
                <v-subheader>Villes :
                  <span v-for="(city, index2) in area.cities" :key="index2" class="city">
                    {{ city.name }}
                  </span>
                </v-subheader>
              </v-row>
              <v-row class="mt-3" justify="end">
                <v-btn color="secondary" small outlined>détails</v-btn>
                <v-btn class="mx-3" color="error" outlined small>effacer</v-btn>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <div v-else class="text-center">
        <span>Aucune Zone Géographique enregistrée</span>
      </div>
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
      areas: null
    }
  }
}
</script>

<style scoped lang="scss">
  .content {
    font-family: 'Open Sans', sans-serif;
    font-weight: lighter;
  }

  .city {
    display: inline-block;
    margin-left: 4px;

    &:not(:last-child)::after {
      content: ' /';
    }
  }
</style>
