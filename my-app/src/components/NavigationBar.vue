<template>
  <div>
    <v-toolbar color='red' dark dense>
      <v-toolbar-title class="text-center mx-auto anta-regular title">
        <span class="title anta-regular">{{ title }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn 
        icon
        @click.stop="openHamburgerButton = !openHamburgerButton"
      >
        <v-icon class="icons">mdi-menu</v-icon>
      </v-btn>
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
          <v-list-item @click="sendProfileClicked()" prepend-icon="mdi-account" value="profile">
            <span class="drawer-titles anta-regular">Profile</span>
          </v-list-item>
          <v-list-item @click="sendCustomListClicked()" prepend-icon="mdi-square-edit-outline" value="custom-list">
            <span class="drawer-titles anta-regular">Custom List</span>
          </v-list-item>
          <v-list-item @click="logout()" value="custom-list">
            <span class="drawer-titles anta-regular">Log Out</span>
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
    accountName: '',
    openHamburgerButton: false
  }),
  props: {
    myAccount: {
      type: Object
    }
  },
  created: function () {
    this.accountName = this.myAccount.username
  },
  methods: {
    logout() {
        if (confirm('Are you sure you want to log out?')) {
          localStorage.clear()
          this.$emit('user-logged-out')
          this.$router.push('/generation')
        }
    },
    sendProfileClicked() {
      this.$emit('send-profile-clicked', true)
    },
    sendCustomListClicked() {
      this.$emit('send-custom-list-clicked', true)
    }
  }
}
//
</script>
<style scoped>
  .title {
    font-size: 2.0rem;
    font-weight: 600;
    text-align: center;
    margin: 0;
    margin-bottom:1rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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
