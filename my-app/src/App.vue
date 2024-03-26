<template>
  <v-app>
    <v-main>
      <v-card v-if="isSignedIn && !profileClicked && !customListClicked">
        <NavigationBar 
          @send-profile-clicked="profileIsClicked($event)"
          @send-custom-list-clicked="customListIsClicked($event)"
        />
        <v-tabs 
          v-model="tab" 
          bg-color="red"
          color="black"
          fixed-tabs
          align-tabs="center"
        >
          <v-tab value="generate" class="anta-regular">Generate</v-tab>
          <v-tab value="gallery" class="anta-regular">Gallery</v-tab>
          <v-tab value="explore" class="anta-regular">Explore</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <template v-if="tab == 'gallery'">
            <Gallery 
              @update-my-custom-recipes="updateMyCustomList($event)"
            />
          </template>
          <template v-if="tab == 'generate'">
            <Generation 
              @update-my-custom-recipes="updateMyCustomList($event)"
            />
          </template>
          <template v-if="tab == 'explore'">
            <Explore />
          </template>
        </v-window>
      </v-card>
      <Profile
        v-if="profileClicked"
        @exit-profile="profileIsClicked($event)" 
      />
      <CustomList
        v-if="customListClicked"
        :custom-list="myList"
        @exit-custom-list="customListIsClicked($event)" 
      />
      <SignIn
       v-if="!isSignedIn"
       @send-sign-in-results="updateSignInValue($event)"
      />
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import Generation from "./components/Generation.vue";
import Gallery from "./components/Gallery.vue";
import Explore from "./components/Explore.vue";
import SignIn from "./components/SignIn.vue";
import Profile from "./components/Profile.vue"
import CustomList from "./components/CustomList.vue"

export default {
  name: "App",
  data: () => ({
    tab: null,
    isSignedIn: true,
    myList: [],
    profileClicked: false,
    customListClicked: false
  }),
  components: {
    NavigationBar,
    Gallery,
    Generation,
    Explore,
    SignIn,
    Profile,
    CustomList
  },
  methods: {
    updateSignInValue(value) {
      this.isSignedIn = value;
    },
    profileIsClicked(value) {
      this.profileClicked = value;
    },
    customListIsClicked(value) {
      this.customListClicked = value;
    },
    updateMyCustomList(updatedList) {
      this.myList = updatedList
    }
  }
};
</script>
<style scoped>
.anta-regular {
    font-family: "Anta", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
</style>
