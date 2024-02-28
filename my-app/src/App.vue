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
          <v-tab value="one">Gallery</v-tab>
          <v-tab value="two">Generate</v-tab>
        </v-tabs>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";

export default {
  name: "App",
  data: () => ({
  }),
  components: {
    NavigationBar,
  },
};
</script>
