<template>
  <v-app>
    <v-main>
      <v-card v-if="isSignedIn && !profileClicked && !customListClicked">
        <NavigationBar 
          @send-profile-clicked="profileIsClicked($event)"
          @send-custom-list-clicked="customListIsClicked($event)"
          @user-logged-out="handleLogout"
          :my-account="account"
        />
        <v-tabs 
          v-model="tab" 
          bg-color="red"
          color="black"
          fixed-tabs
          align-tabs="center"
        >
          <v-tab value="/generation" :to="'/generation'" tag="router-link" class="anta-regular">Generate</v-tab>
          <v-tab value="/gallery" :to="'/gallery'" tag="router-link" class="anta-regular">Gallery</v-tab>
          <v-tab value="/explore" :to="'/explore'" tag="router-link" class="anta-regular">Explore</v-tab>
        </v-tabs>
        <router-view
          @update-my-custom-recipes="updateMyCustomList($event)"
          :my-account="account"
        />
      </v-card>
      <Profile
        v-if="profileClicked"
        :username="account.username"
        :password="account.password"
        @exit-profile="profileIsClicked($event)" 
      />
      <CustomList
        v-if="customListClicked"
        :custom-list="myList"
        :username="account.username"
        :password="account.password"
        :my-account="account"
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
import { reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
    account: null,
    tab: null,
    isSignedIn: null,
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
  setup(_, { expose }) {
    // instantiating routing
    const route = useRoute()
    const router = useRouter()

    const state = reactive({ tab: route.path })

    watch(
      () => route.path,
      (newPath) => {
        if (['/generation', '/gallery', '/explore'].includes(newPath)) {
          state.tab = newPath
        }
      },
      { immediate: true }
    )

    expose({ state })
    return { route, router, state }
  },
  created() {
    const user = localStorage.getItem('user')
    const valid = localStorage.getItem('validAccount')

    if (user && valid) {
      console.log('User logged in:', JSON.parse(user))
      console.log('Valid account:', JSON.parse(valid))

      this.account = JSON.parse(user)
      this.isSignedIn = JSON.parse(valid).valid
    }
  },
  computed: {
    tab: {
      get() {
        return this.state.tab
      },
      set(value) {
        // trigger navigation routing
        this.$router.push(value)
        this.state.tab = value
      }
    }
  },
  methods: {
    updateSignInValue(value) {
      this.isSignedIn = value.validAccount;
      this.account = value.account;
    },
    profileIsClicked(value) {
      this.profileClicked = value;
    },
    customListIsClicked(value) {
      this.customListClicked = value;
    },
    updateMyCustomList(updatedList) {
      this.myList = updatedList
    },
    handleLogout() {
      this.isSignedIn = false
      this.account = null
      this.profileClicked = false
      this.customListClicked = false
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
