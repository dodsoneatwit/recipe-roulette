<template>
    <v-card>
        <template v-slot:text>
        <v-row class="checkbox">
                <v-container fluid>
                    <v-row justify="center">
                        <v-checkbox
                            v-model="restrictions.vegan"
                            :label="'Vegan'"
                        />
                        <v-checkbox
                            v-model="restrictions.vegetarian"
                            :label="'Vegetarian'"
                        />
                        <v-checkbox
                            v-model="restrictions.glutenFree"
                            :label="'Gluten Free'"
                        />
                    </v-row>
                </v-container>
            </v-row>
            <v-row class="gallery-row">
                <v-container fluid>
                    <v-row v-if="!loading" dense>
                        <v-col v-for="(recipe, i) in filteredRecipes" :key="i" cols="12" sm="6" md="4" lg="3">
                            <v-card class="recipe" max-width="500" elevation="6">
                                <img :src="recipe?.image" alt="Recipe Image">
                                <v-row style="border-color: red;">
                                    <v-col>
                                        <v-card-title class="mt-2 anta-regular title"> <b>{{ recipe?.title }}</b></v-card-title>
                                    </v-col>
                                </v-row>
                                <v-card-actions>
                                    <v-card-subtitle class="mt-2 anta-regular">Info</v-card-subtitle>
                                    <v-btn
                                        :icon="showDescription[i] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                        @click="showDescription[i]  = !showDescription[i] "
                                        style="margin-left:40%"
                                    ></v-btn>
                                </v-card-actions>
                                <v-expand-transition>
                                    <div v-if="showDescription[i] ">
                                        <v-expansion-panels  elevation="0">
                                            <v-expansion-panel
                                                elevation="0"
                                                title="Description"
                                                :text="removeHtmlTags(recipe?.summary)"
                                                class="mt-2 anta-regular small-text"
                                            >
                                            </v-expansion-panel>
                                            <v-expansion-panel
                                                elevation="0"
                                                title="Instructions"
                                                :text="removeHtmlTags(recipe?.instructions)"
                                                class="mt-2 anta-regular small-text"
                                            >
                                            </v-expansion-panel>
                                        </v-expansion-panels>
                                        <v-row :id="diet" class="diet" justify="center">
                                                <div v-if="recipe?.vegetarian" class="diet-icons" v:on:mouseover="showVegetarian">
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
                                                <div v-if="recipe?.vegan" class="diet-icons">
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
                                                <div v-if="recipe?.glutenFree" class="diet-icons">
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
                                        <v-row justify="center">
                                            <v-btn size="small" class="addToList" @click="updateMyRecipes(recipe)">
                                                Add To Custom List
                                                <v-icon class="">
                                                    <i class="fa-solid fa-plus" style="color: #0787e9;"></i>
                                                    <v-tooltip
                                                        activator="parent"
                                                        location="bottom"
                                                    >
                                                        Press button to add recipe to your unique custom list
                                                    </v-tooltip>
                                                </v-icon>
                                            </v-btn>
                                        </v-row>
                                    </div>
                                </v-expand-transition>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row v-if="loading" justify="center" dense>
                        <v-col v-for="i in 10" :key="i" cols="5" sm="6" md="4" lg="3">
                            <v-skeleton-loader
                            class="mx-auto border"
                            max-width="500"
                            type="card-avatar, actions"
                            ></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-container>
            </v-row>
        </template>
    </v-card>
</template>

<script>

import Account from "../lib/Classes/Account"
import CustomUserList from '../lib/Classes/CustomUserList.js';

export default {
    name: 'Gallery',
    data: () => ({
        api_url: import.meta.env.VITE_APP_GATEWAY_URL,
        recipes: [],
        tempRecipesToRefill: [],
        myList: new CustomUserList(),
        showDescription: [],
        showIngredients: [],
        restrictions: {
            vegan: false,
            vegetarian: false,
            glutenFree: false
        },
        showRecipeByFilter: [],
        loading: true
    }),
    props: {
        myAccount: {
            type: Object
        }
    },
    created: function() {
        this.retrieveRecipes();
    },
    computed: {
        filteredRecipes() {
            let filtered = this.recipes;

            // // Apply filters
            if (this.restrictions.vegan) {
                filtered = filtered.filter(recipe => recipe.vegan);
            }
            if (this.restrictions.vegetarian) {
                filtered = filtered.filter(recipe => recipe.vegetarian);
            }
            if (this.restrictions.glutenFree) {
                filtered = filtered.filter(recipe => recipe.glutenFree);
            }

            return filtered;
        }
    },
    methods: {
        async retrieveRecipes() {
            const response = await fetch(`${this.api_url}/dev/api/get_recipes`, {
                    method: "GET",
                    headers:    {
                        'Content-Type': 'application/json'
                    },
            })
            console.log('--RESPONSE--',response)
            const result = await response.json(); // Parse JSON response
            console.log('--RECIPES DATA--',result)
            this.recipes = result.recipes;
            this.tempRecipesToRefill = result.recipes
            this.fillShow();
            this.loading = false

        },
        fillShow() {
            let length = this.recipes.length
            for (let i = 0; i < length; i++) {
                this.showDescription[i] = false;
                this.showIngredients[i] = false;
                this.showRecipeByFilter[i] = true
            }
            
        },
        resetFilterVals() {
            let length = this.showRecipeByFilter.length
            for (let i = 0; i < length; i++) {
                this.showRecipeByFilter[i] = true
            }
            
        },
        removeHtmlTags(text) {
            return text?.replace(/<[^>]*>?/gm, '');
        },
        async updateMyRecipes(recipe) {
            console.log('--USER ID--',this.myAccount.id)
            console.log('--RECIPE ID--',recipe.id)
            const response = await fetch(`${this.api_url}/dev/api/add_recipe_to_list`, {
                method: "POST",
                headers:    {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.myAccount.id,
                    recipe_id: recipe.id
                })
            })

            const result = await response.json()
            this.$emit('update-account',{ ...this.myAccount, recipe_ids: [...result.recipes]})
        },
        filterByNutrition() {
            this.recipes = this.tempRecipesToRefill
            this.resetFilterVals();
            this.recipes.forEach((recipe, index) => {

                const filter_restrictions = [
                    recipe.vegan,
                    recipe.vegetarian,
                    recipe.glutenFree
                ]

                if (filter_restrictions[0] !== this.restrictions.vegan) {
                    this.showRecipeByFilter[index] = false
                }

                if (filter_restrictions[1] !== this.restrictions.vegetarian) {
                    this.showRecipeByFilter[index] = false
                }

                if (filter_restrictions[2] !== this.restrictions.glutenFree) {
                    this.showRecipeByFilter[index] = false
                }
            })
        }
    }
    
}
</script>
<style scoped>
.title {
    font-size: .75rem
}
.small-text {
    font-size:.6rem;
    color:black;
}
.med-text {
    font-size:.75rem;
    color:black;
}
.search-bar {
    margin-bottom: 1rem
}
.recipe {
    margin: 1rem
}
.anta-regular {
    font-family: "Anta", sans-serif;
    font-weight: 400;
    font-style: normal;
}
.gallery-row {
    display:flex;
    justify-content: center;
    justify-content:space-evenly;
}
.diet-icons {
    margin-left: 1rem;
    margin: 1rem
}
.diet {
    margin-top:.5rem;
}
.addToList {
    margin-bottom:1.5rem;
    font-size:.6rem;
}
.checkbox {
    position: sticky
}
</style>
