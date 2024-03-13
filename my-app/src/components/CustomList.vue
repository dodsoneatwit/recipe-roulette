<template>
    <div class="container">
        <v-app-bar :elevation="2">
            <h1 class="text-center title"> My Custom List </h1>
            <template v-slot:append>
                <v-btn>
                    <v-icon class="exit" @click="exitCustomList()">
                        <i class="fa-solid fa-circle-xmark fa-2xl" style="color: #ee3a3a;"></i>
                        <v-tooltip
                            activator="parent"
                            location="bottom"
                        >
                            Exit Custom List
                        </v-tooltip>
                    </v-icon>
                </v-btn>
            </template>
        </v-app-bar>
    </div>
</template>
<script>
export default {
    name: 'CustomList',
    data: () => ({

    }),
    methods: {
        exitCustomList() {
            this.$emit('exit-custom-list', false)
        }
    }
}
</script>
<style>
.container {
    height: 150rem;
    margin-top: 3%;
    margin-left: 15%;
    margin-right: 15%;
}
.exit {
    left: 115%;
    margin-top:0
}
.title {
    font-size: 2.5rem
}
</style>