<template>
  <div>
    <div class="d-flex justify-space-between align-center pa-3">
      <h1 class="text-center">{{ area.name }}</h1>
      <div>
        <v-btn outlined small color="primary">
          Modifier
        </v-btn>
        <v-btn outlined small class="ml-3" @click="$router.push('/')">
          Retour
        </v-btn>
      </div>
    </div>
    <v-container fluid>
      <v-row class="mt-4" justify="space-around">
        <v-col
          v-for="(city, index) of area.cities"
          :key="index"
          cols="12"
        >
          <v-card hover>
            <v-card-title>{{ index + 1 }} - {{ city.name }}</v-card-title>
            <v-container fluid>
              <v-row justify="center">
                <v-col
                  v-for="(image, index2) in city.images"
                  :key="index2"
                  cols="2"
                >
                  <v-img :src="image" :alt="city.name" aspect-ratio="1"/>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $axios, error }) {
    try {
      const { data, status } = await $axios.get(`/api/areas/${params.id}/`)
      if (status === 200 && data.name === 'CastError') {
        return error()
      }
      return { area: data }
    } catch (err) {
      error({ statusCode: 500 })
    }
  }
}
</script>

<style scoped>

</style>
