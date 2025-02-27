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
                <v-row>
                    <v-col v-for="(recipe, i) in recipes" :key="i" >
                        <v-card :max-width="310" elevation="6">
                            <center>
                                <img :src="recipe?.image" alt="Recipe Image">
                            </center>
                            <v-row justify="center" class="adjust-height">
                                <v-card-title class="mt-2 anta-regular title" > <b>{{ recipe?.title.substr(0,33) }}</b></v-card-title>
                                <v-card-title v-if="recipe?.title.length >= 30" class="anta-regular title"><b>{{ recipe?.title.substr(33) }}</b></v-card-title>
                            </v-row>
                            <v-row justify="center">
                                <v-col>
                                    <center>
                                    <v-btn class="addToList" @click="updateMyRecipes(recipe)">
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
                                    </center>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-card-actions>
                                <v-card-subtitle class="mt-2 anta-regular low-margin">Description</v-card-subtitle>
                                <v-btn
                                    :icon="showDescription[i] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                    @click="showDescription[i] = !showDescription[i]"
                                    class="low-margin"
                                ></v-btn>
                                <v-spacer/>
                                <v-card-subtitle class="mt-2 anta-regular low-margin" >Instructions</v-card-subtitle>
                                <v-btn
                                    :icon="showIngredients[i] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                    @click="showIngredients[i] = !showIngredients[i]"
                                    class="low-margin"
                                ></v-btn>
                            </v-card-actions>
                            </v-row>
                            <v-expand-transition>
                                <div v-if="showDescription[i]">
                                    <v-divider></v-divider>

                                    <v-card-text class="mt-2 anta-regular">
                                        {{ removeHtmlTags(recipe?.summary) }}
                                        <v-row :id="diet" class="diet">
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
                                                    Veganinstruction
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
                                    </v-card-text>
                                </div>
                            </v-expand-transition>
                            <v-expand-transition>
                                <div v-if="showIngredients[i]">
                                    <v-divider></v-divider>

                                    <v-card-text class="mt-2 anta-regular" >
                                        {{ parseInstructions(recipe?.analyzedInstructions) }}
                                    </v-card-text>
                                </div>
                            </v-expand-transition>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-row>
    </div>
</template>

<script>

export default {
    name: 'Explore',
    data: () => ({
        search: '',
        url: `https://api.spoonacular.com/recipes/complexSearch?`,
        apiKey: '',
        recipeCount: 100,
        recipes: [],
        maxWidth: 310,
        showDescription: [],
        showIngredients: []
    }),
    methods: {
        searchRecipeWithKey() {
            fetch (this.url + `query=${this.search}&number=${this.recipeCount}&addRecipeInformation=true&addRecipeInstructions=true&apiKey=${this.apiKey}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error searching for recipe')
                }
                return response.json();
            })
            .then((recipes) => {
                this.recipes = recipes.results;
            })
            .catch((error) => {
                console.log('Error fetching search recipes from spoonacular')
            })
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
        updateMyRecipes(recipe) {
            this.itemsAdded++;
            this.myList.addRecipe(recipe)
            // this.$emit('update-my-custom-recipes', this.myList)
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
    .title {
        font-size: medium;
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
</style>
