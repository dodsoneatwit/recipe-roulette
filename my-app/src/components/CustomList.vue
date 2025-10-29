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
            <div>
                <v-row class="gallery-row">
                    <v-container fluid>
                        <v-row v-if="!loading" justify="center" dense>
                            <v-col v-for="(recipe, i) in customList.getRecipesList()" :key="i" cols="12" sm="10" md="6" lg="4">
                                <v-card class="recipe" max-width="500" elevation="6">
                                    <img :src="recipe?.getImageUrl()" alt="Recipe Image">
                                    <v-row style="border-color: red;">
                                        <v-col>
                                            <v-card-title class="mt-2 anta-regular title"> <b>{{ recipe?.getTitle() }}</b></v-card-title>
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
                                                    :text="removeHtmlTags(recipe?.getDescription())"
                                                    class="mt-2 anta-regular small-text"
                                                >
                                                </v-expansion-panel>
                                                <v-expansion-panel
                                                    elevation="0"
                                                    title="Instructions"
                                                    :text="removeHtmlTags(recipe?.getInstructions())"
                                                    class="mt-2 anta-regular small-text"
                                                >
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                            <v-row :id="diet" class="diet" justify="center">
                                                    <div v-if="recipe?.isVegetarian()" class="diet-icons" v:on:mouseover="showVegetarian">
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
                                                    <div v-if="recipe?.isVegan()" class="diet-icons">
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
                                                    <div v-if="recipe?.isGlutenFree()" class="diet-icons">
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
                                                    <center>
                                                        <v-btn size="small" class="addToList" @click="deleteRecipe(recipe)">
                                                            Delete
                                                            <v-icon class="">
                                                            <i class="fa-solid fa-plus" style="color: #0787e9;"></i>
                                                                <v-tooltip
                                                                    activator="parent"
                                                                    location="bottom"
                                                                >
                                                                    Press button to delete recipe from custom list
                                                                </v-tooltip>
                                                            </v-icon>
                                                        </v-btn>
                                                    </center>
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
            </div>
        </div>
</template>
<script>
import Account from './../lib/Classes/Account'
import Recipe from './../lib/Classes/Recipe'
import CustomUserList from '@/lib/Classes/CustomUserList';
export default {
    name: 'CustomList',
    data: () => ({
        showDescription: [],
        showIngredients: [],
        temp: 'Not Yet',
        customList: new CustomUserList(),
        api_url: import.meta.env.VITE_APP_GATEWAY_URL,
        spoon_url: import.meta.env.VITE_APP_RECIPE_URL,
        apiKey: import.meta.env.VITE_APP_RECIPE_API_KEY,
        loading: true
    }),
    props: {
        username: {
            type: String
        },
        password: {
            type: String
        },
        myAccount: {
            type: Object
        }
    },
    created: function() {
        this.initializeCustomlist()
    },
    mounted() {
        // setting data value to the value of the prop
        this.tempList = this.propValue;
    },
    methods: {
        async initializeCustomlist() {
            console.log('Account: ', this.myAccount.id)
            console.log('Recipe IDS', this.myAccount.recipe_ids)
            const query_recipe_ids = this.myAccount.recipe_ids.join(",")
            const response = await fetch (`https://${this.spoon_url}/recipes/informationBulk?ids=${query_recipe_ids}`, {
                    method: "GET",
                    headers: {
                        'x-rapidapi-key': this.apiKey,
                        'x-rapidapi-host': this.spoon_url
                    },
            })
            const recipes = await response.json();
            console.log('--RECIPES--',recipes)
            // title, id, imageUrl, instructions, description, restrictions
            this.customList.setRecipesList(recipes.map((recipe) => new Recipe(
                recipe.title,
                recipe.id,
                recipe.image,
                recipe.instructions,
                recipe.summary,
                recipe.diets
            )))
            this.loading = false
        },
        async deleteRecipe(recipe) {
            console.log('--USER ID--',this.myAccount.id)
            console.log('--RECIPE ID--',recipe.getID())
            const response = await fetch(`${this.api_url}/dev/api/delete_recipe_from_list`, {
                method: "POST",
                headers:    {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.myAccount.id,
                    recipe_id: recipe.getID()
                })
            })
            const result = await response.json()
            console.log('--RECIPES CUST--', result.recipes)
              // Rebuild local CustomList with the new recipes
            this.customList.removeRecipe(recipe)
            this.$emit('update-account', {
                ...this.myAccount,
                recipe_ids: result.recipes
            })

            // Keep local myAccount in sync
            this.myAccount.recipe_ids = result.recipes
        },
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
</style>
