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
          <v-tab value="gallery">Gallery</v-tab>
          <v-tab value="generate">Generate</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <template v-if="tab == 'gallery'">
            <btn>Gallery</btn>
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

export default {
  name: "App",
  data: () => ({
    tab: null
  }),
  components: {
    NavigationBar,
  },
};
</script>
