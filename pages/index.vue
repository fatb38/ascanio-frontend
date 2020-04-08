<template>
  <ul>
    <li v-for="(area, index) in areas" :key="index">
      <h2>{{ area.name }}</h2>
      <p>
        Villes :
        <span v-for="(city) in area.cities" :key="city">
          {{ city.name }}
        </span>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'areas',
  async fetch () {
    const request = await this.$axios.get('/api/areas/')
    this.areas = request.data
  },
  data () {
    return {
      areas: []
    }
  }
}
</script>

<style scoped>

</style>
