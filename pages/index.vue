<template>

  <div class="content">
    <h1 class="text-center">Liste des zones géographiques</h1>
    <v-container fluid>
      <v-row>
        <v-col v-for="(area, index) in areas" :key="index" cols="12" sm="6" lg="4">
          <v-card hover>
            <v-card-title>{{ area.name }}</v-card-title>
            <v-container fluid>
              <v-row dense>
                <v-col v-for="(city, index2) in area.cities" :key="index2" cols="4">
                  <v-card outlined>
                    <v-card-title class="font-weight-light pt-2 pb-0">{{ city.name }}</v-card-title>
                    <v-container>
                      <v-row justify="space-around">
                        <v-col v-for="(photo, index3) in city.photos" :key="index3" cols="4">
                          <v-img
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            :src="photo"
                            aspect-ratio="1"
                          />
                        </v-col>
                      </v-row>
                    </v-container>

                  </v-card>
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
  name: 'areas',
  async fetch () {
    const request = await this.$axios.get('/api/areas/')
    this.areas = request.data
    this.areas.forEach((area) => {
      area.cities.forEach((city) => {
        city.photos = []
        city.photos.push('https://picsum.photos/100')
        city.photos.push('https://picsum.photos/100')
        city.photos.push('https://picsum.photos/100')
        city.photos.push('https://picsum.photos/100')
        city.photos.push('https://picsum.photos/100')
      })
    })
  },
  data () {
    return {
      areas: []
    }
  }
}
</script>

<style scoped>
  .content {
    font-family: 'Open Sans', sans-serif;
    font-weight: lighter;
  }
</style>
