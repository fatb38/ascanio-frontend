<template>
  <div>
    <h1 class="text-center">Liste des zones géographiques</h1>
    <v-card>
      <v-card-title>
        <v-btn outlined small color="primary" to="/add">
          Ajouter une zone
        </v-btn>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Recherche"
          single-line
          hide-details
          :loading="$fetchState.pending"
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="areas" :search="search" no-data-text="Aucune zone enregistrée">
        <template v-slot:item.cities="{ item }">
          <span v-for="city of item.cities" :key="city.name" class="city">{{ city.name }}</span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn small icon :to="'/'+item._id" title="détails">
            <v-icon small>mdi-eye</v-icon>
          </v-btn>
          <v-btn small color="error" icon title="supprimer" @click="deleteArea(item)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

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
        <v-btn color="error" :loading="pending" text @click="deleteArea(areaToDelete)">
          Oui
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
      areaToDelete: {},
      search: '',
      headers: [
        { text: 'Nom', value: 'name' },
        { text: 'Villes', value: 'cities', sortable: false },
        { text: 'Actions', value: 'actions', align: 'right', sortable: false }
      ]
    }
  },

  methods: {
    close () {
      this.refresh()
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
        this.$emitSnackbarEvent('delete-success')
      } catch (err) {
        this.$emitSnackbarEvent('error')
      } finally {
        this.pending = false
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
    margin-right: 4px;

    &:not(:last-child)::after {
      content: ' /';
    }
  }
</style>
