<template>
    <div class="container">
        <v-app-bar :elevation="2">
            <h1 class="text-center title"> Profile </h1>
            <template v-slot:append>
                <v-icon class="exit" @click="exitProfile()">
                    <i class="fa-solid fa-circle-xmark fa-2xl exit" style="color: #ee3a3a;"></i>
                    <v-tooltip
                        activator="parent"
                        location="bottom"
                    >
                        Exit Profile
                    </v-tooltip>
                </v-icon>
            </template>
        </v-app-bar>
        <v-row>
            <v-col>
                <h2><b>CREDENTIALS</b></h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h2><b>Username: {{ username }}</b></h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h2><b>Password: {{ password }}</b></h2>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: 'Profile',
    data: () => ({
        
    }),
    props: {
        username: {
            type: String
        },
        password: {
            type: String
        },
    },
    methods: {
        exitProfile() {
            this.$emit('exit-profile', false)
        }
    }
}
</script>
<style scoped>
.container {
    height: 150rem;
    margin-top: 3%;
    margin-left: 15%;
    margin-right: 15%;
    background-color: lightgreen
}
.exit {
    margin-top:0;
    margin-right:1rem
}
.title {
    font-size: 2rem
}
</style>