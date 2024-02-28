<template>
  <div>
    <v-toolbar color='red' dark>
      <v-row>
        <v-col cols="2">
          <v-btn icon>
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-space-around">
          <v-toolbar-title class="flex text-center">{{ title }}</v-toolbar-title>
        </v-col>
        <v-col cols="2" class="d-flex justify-end">
          <v-btn icon>
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
  </div>
</template>

<script>

export default {
  name: 'NavigationBar',
  data: () => ({
    title: 'Recipe Roulette'
  }),
  components: {
  },
  created: function () {
  },
  methods: {
  }
}
//
</script>
