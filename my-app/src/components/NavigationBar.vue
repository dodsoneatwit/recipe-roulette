<template>
  <div>
    <v-toolbar color='red' dark>
      <v-row>
        <v-col cols="2">
          <v-btn 
           icon
           @click="directToHomePage"
          >
            <v-icon class="icons">mdi-home</v-icon>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-space-around">
          <v-toolbar-title class="flex text-center mt-3">
            <span class="title anta-regular">{{ title }}</span>
          </v-toolbar-title>
        </v-col>
        <v-col cols="2" class="d-flex justify-end">
          <v-btn 
          icon
          >
            <v-icon class="icons">mdi-menu</v-icon>
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
    directToHomePage() {

    }
  }
}
//
</script>
<style scoped>
  .title {
    font-size: 2.5rem;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-top: 100%;
  }

  .anta-regular {
    font-family: "Anta", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  
  .icons {
    font-size:xx-large
  }
</style>
