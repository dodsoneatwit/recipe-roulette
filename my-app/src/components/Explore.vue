<template>
    <div>
        <v-text-field
            v-model="search"
            label="Search"
            append-inner-icon="mdi-magnify"
            single-line
            variant="outlined"
            hide-details
            class="search-bar"
            clearable
            @click:append-inner="searchRecipeWithKey()"
            @keydown.enter="searchRecipeWithKey()"
        >
        </v-text-field>
        <v-spacer/>
        <v-row class="gallery-row">
            <v-container fluid>
                <v-row v-if="!loading && loading !== null" dense>
                    <v-col v-for="(recipe, i) in recipes" :key="i" >
                        <v-card :max-width="310" elevation="6">
                            <center>
                                <img :src="recipe?.image" alt="Recipe Image">
                            </center>
                            <v-row justify="center" class="adjust-height">
                                <v-card-title class="mt-2 anta-regular title" > <b>{{ recipe?.title.substr(0,33) }}</b></v-card-title>
                                <v-card-title v-if="recipe?.title.length >= 30" class="anta-regular title"><b>{{ recipe?.title.substr(33) }}</b></v-card-title>
                            </v-row>
                            <v-card-actions>
                                <v-card-subtitle class="mt-2 anta-regular">Info</v-card-subtitle>
                                <v-btn
                                    :icon="showDescription[i] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                    @click="showDescription[i]  = !showDescription[i] "
                                    style="margin-left:65%"
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
                                            :text="parseInstructions(recipe?.analyzedInstructions)"
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
    </div>
</template>

<script>
import Account from "../lib/Classes/Account"

export default {
    name: 'Explore',
    data: () => ({
        search: '',
        url: import.meta.env.VITE_APP_RECIPE_URL,
        apiKey: import.meta.env.VITE_APP_RECIPE_API_KEY,
        api_url: import.meta.env.VITE_APP_GATEWAY_URL,
        recipeCount: 100,
        recipes: [],
        maxWidth: 310,
        showDescription: [],
        showIngredients: [],
        loading: null
    }),
    props: {
        myAccount: {
            type: Object
        }
    },
    methods: {
        async searchRecipeWithKey() {
            this.loading = true
            const response = await fetch (`https://${this.url}/recipes/complexSearch?query=${this.search}&addRecipeInformation=true&addRecipeInstructions=true&number=${this.recipeCount}`, {
                	method: 'GET',
                    headers: {
                        'x-rapidapi-key': this.apiKey,
                        'x-rapidapi-host': this.url
                    }
            })
            console.log('--RESPONSE--',response)
            const data = await response.json();
            console.log('--DATA EXPLORE--',data)
            this.recipes = data.results;
            this.loading = false
        },
        fillShow() {
            let length = this.recipes.length
            for (let i = 0; i < length; i++) {
                this.showDescription[i] = false;
                this.showIngredients[i] = false;
            }
            
        },
        removeHtmlTags(text) {
            return text.replace(/<[^>]*>?/gm, '');
        },
        wrappedString(text) {
            if (text.length <= 33) {
                return text;
            }

            let wrappedParts = [];
            let tempText = text;
            while (tempText.length > 33) {
                let subString = tempText.substr(0,33)
                wrappedParts.push(subString)
                tempText = tempText.substr(34)
            }
            wrappedParts.push(tempText)
            return wrappedParts;
            
        },
        removeHtmlTags(text) {
            return text?.replace(/<[^>]*>?/gm, '');
        },
        async updateMyRecipes(recipe) {
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
        parseInstructions(unparsed_instructions) {
            let steps = unparsed_instructions[0].steps
            let instructionsArray = steps.map((e) => e.step)

            return instructionsArray.join(" ")
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
        margin-top: 1rem;
        margin-bottom: 1rem;
        margin-left: 1rem;
        margin-right: 1rem;
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
        justify-content: space-evenly;
        margin-left:1rem
    }
    .adjust-height {
        height:5.5rem
    }

    .low-margin {
        margin-right:0rem; /* Adjust the right margin */
        margin-left:0rem
    }
    .addToList {
      margin-top:1rem;
      margin-bottom:2rem;
      font-size:.6rem;
      padding: 0.5rem;
    }
    .diet-icons {
        margin-left: 1rem;
        margin: 1rem;
    }
    .diet {
        margin-top:.25rem;
    }
</style>
