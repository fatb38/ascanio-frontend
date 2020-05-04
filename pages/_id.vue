<template>
  <div>
    <div v-if="!editing">
      <div class="d-sm-flex justify-space-between align-center pa-3">
        <h1>{{ area.name }}</h1>
        <div>
          <v-btn outlined small color="primary" @click="editing = true">
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
                    cols="4"
                    sm="2"
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
    <div v-else>
      <AreaForm :name="area.name" :cities="area.cities" @save-area="save($event)">
        <h1>Modifier une zone</h1>
      </AreaForm>
    </div>
  </div>
</template>

<script>
import AreaForm from '../components/AreaForm'
export default {
  components: { AreaForm },
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
  },

  data () {
    return {
      editing: false
    }
  },

  methods: {
    async save (area) {
      try {
        await this.$axios.put(`/api/areas/${this.area._id}`, area)
        this.$emitSnackbarEvent('save-success')
        await this.$router.push('/')
      } catch (error) {
        this.$emitSnackbarEvent('error')
      }
    }
  }
}
</script>

<style scoped>

</style>
