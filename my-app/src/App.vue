<template>
  <v-app>
    <v-main>
      <v-card>
        <NavigationBar />
        <v-tabs 
          v-model="tab" 
          bg-color="red"
          color="black"
          fixed-tabs
          align-tabs="center"

        >
          <v-tab value="gallery" class="anta-regular">Gallery</v-tab>
          <v-tab value="generate" class="anta-regular">Generate</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <template v-if="tab == 'gallery'">
            <Gallery />
          </template>
          <template v-if="tab == 'generate'">
            <Generation />
          </template>
        </v-window>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import Generation from "./components/Generation.vue";
import Gallery from "./components/Gallery.vue";
import Home from "./components/Home.vue";

export default {
  name: "App",
  data: () => ({
    tab: null
  }),
  components: {
    NavigationBar,
    Gallery,
    Generation,
    Home
},
};
</script>
<style scoped>
.anta-regular {
    font-family: "Anta", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
</style>
