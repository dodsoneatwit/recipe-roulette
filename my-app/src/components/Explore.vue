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
        >
        </v-text-field>
        <v-card>
            <template v-slot:text>
                <div v-for="i in recipes.length/2" :key="i">
                    <v-row class="gallery-row">
                        <div v-for="j in 2" :key="j">
                            <v-col>
                                <v-card class="recipe" max-width="500" elevation="6">
                                    <img :src="recipes[i * 2 + j].image" alt="Recipe Image">
                                    <v-card-title class="mt-2 anta-regular title" > <b>{{ recipes[i * 2 + j].title }}</b></v-card-title>
                                </v-card>
                            </v-col>
                        </div>
                    </v-row>
                </div>
            </template>
        </v-card>
    </div>
</template>

<script>

export default {
    name: 'Explore',
    data: () => ({
        search: '',
        url: `https://api.spoonacular.com/recipes/complexSearch?`,
        apiKey: 'df1234e4fcad4177a07f6ba789141cd0',
        recipeCount: 100,
        recipes: []
    }),
    methods: {
        searchRecipeWithKey() {
            fetch (this.url + `query=${this.search}&number=${this.recipeCount}&apiKey=${this.apiKey}`)
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
        font-size: large;
    }
    .gallery-row {
        display:flex;
        justify-content: center;
        justify-content:space-evenly;
    }
</style>
