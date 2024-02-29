<template>
  <div>
    <v-toolbar color='red' dark>
      <v-row>
        <v-col cols="2">
        </v-col>
        <v-col class="d-flex justify-space-around">
          <v-toolbar-title class="flex text-center mt-3">
            <span class="title anta-regular">{{ title }}</span>
          </v-toolbar-title>
        </v-col>
        <v-col cols="2" class="d-flex justify-end">
          <v-btn 
           icon
           @click.stop="openHamburgerButton = !openHamburgerButton"
          >
            <v-icon class="icons">mdi-menu</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-navigation-drawer
        v-model="openHamburgerButton"
        temporary
      >
        <v-list-item>
          <span class="accountTitle anta-regular">{{ accountName }}</span>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-account" value="profile">
            <span class="drawer-titles anta-regular">Profile</span>
          </v-list-item>
          <v-list-item prepend-icon="mdi-square-edit-outline" value="custom-list">
            <span class="drawer-titles anta-regular">Custom List</span>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>

export default {
  name: 'NavigationBar',
  data: () => ({
    title: 'Recipe Roulette',
    accountName: 'Elijah Dodson',
    openHamburgerButton: false
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

  .accountTitle {
    font-size:x-large;
    font-weight: bolder;
  }

  .drawer-titles {
    font-size: larger;
    font-weight: bold;
  }
</style>
