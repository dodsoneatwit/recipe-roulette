<template>
    <div class="container">
        <v-app-bar :elevation="2">
            <h1 class="text-center title"> My Custom List </h1>
            <template v-slot:append>
                <v-icon class="exit" @click="exitCustomList()">
                    <i class="fa-solid fa-circle-xmark fa-2xl exit" style="color: #ee3a3a;"></i>
                    <v-tooltip
                        activator="parent"
                        location="bottom"
                    >
                        Exit Custom List
                    </v-tooltip>
                </v-icon>
            </template>
        </v-app-bar>
        <div v-if="customList !== undefined && customList != [] ">
            <div v-for="i in customList.getNumberOfRecipes()/2" :key="i">
                <v-row class="gallery-row">
                    <div v-for="j in 2" :key="j">
                        <v-col>
                            <v-card class="recipe" max-width="500" elevation="6">
                                <img :src="customList.getRecipeAtIndex((i - 1) * 2 + (j - 1))?.getImageUrl()" alt="Recipe Image">
                                <v-row style="border-color: red;">
                                    <v-col>
                                        <v-card-title class="mt-2 anta-regular title"> <b>{{ customList.getRecipeAtIndex((i - 1) * 2 + (j - 1))?.getTitle() }}</b></v-card-title>
                                    </v-col>
                                </v-row>
                                <v-card-actions>
                                    <v-card-subtitle class="mt-2 anta-regular" >Description</v-card-subtitle>
                                    <v-btn
                                        :icon="showDescription[i * 2 + j] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                        @click="showDescription[i * 2 + j] = !showDescription[i * 2 + j]"
                                    ></v-btn>
                                    <v-spacer/>
                                    <v-card-subtitle class="mt-2 anta-regular" >Instructions</v-card-subtitle>
                                    <v-btn
                                    :icon="showIngredients[i * 2 + j] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                    @click="showIngredients[i * 2 + j] = !showIngredients[i * 2 + j]"
                                ></v-btn>
                                </v-card-actions>
                                <v-expand-transition>
                                    <div v-show="showDescription[i * 2 + j]">
                                        <v-divider></v-divider>

                                        <v-card-text class="mt-2 anta-regular" >
                                            {{ removeHtmlTags(customList.getRecipeAtIndex((i - 1) * 2 + (j - 1))?.getDescription()) }}
                                            <v-row class="diet">
                                                <div v-if="customList.getRecipeAtIndex((i - 1) * 2 + (j - 1))?.isVegetarian()" class="diet-icons" v:on:mouseover="showVegetarian">
                                                    <v-icon>
                                                        <i class="fa-solid fa-leaf fa-xl" style="color: #51e1aa;"></i>
                                                        <v-tooltip
                                                            activator="parent"
                                                            location="bottom"
                                                        >
                                                        Vegetarian
                                                        </v-tooltip>
                                                    </v-icon>
                                                </div>
                                                <div v-if="customList.getRecipeAtIndex((i - 1) * 2 + (j - 1))?.isVegan()" class="diet-icons">
                                                    <v-icon>
                                                        <i class="fa-solid fa-carrot fa-xl" style="color: #f0a53d;"></i>
                                                        <v-tooltip
                                                            activator="parent"
                                                            location="bottom"
                                                        >
                                                        Vegan
                                                        </v-tooltip>
                                                    </v-icon>
                                                </div>
                                                <div v-if="customList.getRecipeAtIndex((i - 1) * 2 + (j - 1))?.isGlutenFree()" class="diet-icons">
                                                    <v-icon>
                                                        <i class="fa-solid fa-wheat-awn-circle-exclamation fa-xl" style="color: #51bff6;"></i>
                                                        <v-tooltip
                                                            activator="parent"
                                                            location="bottom"
                                                        >
                                                        Gluten Free
                                                        </v-tooltip>
                                                    </v-icon>                                                
                                                </div>
                                            </v-row>

                                        </v-card-text>
                                    </div>
                                </v-expand-transition>
                                <v-expand-transition>
                                    <div v-show="showIngredients[i * 2 + j]">
                                        <v-divider></v-divider>

                                        <v-card-text class="mt-2 anta-regular" >
                                            {{ removeHtmlTags(customList.getRecipeAtIndex((i - 1) * 2 + (j - 1))?.getInstructions()) }}
                                        </v-card-text>
                                    </div>
                                </v-expand-transition>
                            </v-card>
                        </v-col>
                    </div>
                </v-row>
            </div>
        </div>
        </div>
</template>
<script>
export default {
    name: 'CustomList',
    data: () => ({
        showDescription: [],
        showIngredients: [],
        temp: 'Not Yet',
        tempList: []
    }),
    props: {
        customList: {
            type: Object
        }
    },
    mounted() {
        // Setting data value to the value of the prop
        this.tempList = this.propValue;
    },
    methods: {
        exitCustomList() {
            this.$emit('exit-custom-list', false)
        },
        removeHtmlTags(text) {
            return text?.replace(/<[^>]*>?/gm, '');
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
}
.exit {
    margin-top:0;
    margin-right:1rem
}
.title {
    font-size: 1rem
}
</style>