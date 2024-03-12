<template>
    <v-card>
        <template v-slot:text>
            <div v-for="i in recipes.length/2" :key="i">
                <v-row class="gallery-row">
                    <div v-for="j in 2" :key="j">
                        <v-col>
                            <v-card class="recipe" max-width="500" elevation="6">
                                <img :src="recipes[i * 2 + j].image" alt="Recipe Image">
                                <v-card-title class="mt-2 anta-regular title" > <b>{{ recipes[i * 2 + j].title }}</b></v-card-title>
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
                                            {{ removeHtmlTags(recipes[i * 2 + j].summary) }}
                                            <v-row :id="diet" class="diet">
                                                <div v-if="recipes[i * 2 + j].vegetarian" class="diet-icons" v:on:mouseover="showVegetarian">
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
                                                <div v-if="recipes[i * 2 + j].vegan" class="diet-icons">
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
                                                <div v-if="recipes[i * 2 + j].glutenFree" class="diet-icons">
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
                                            {{ removeHtmlTags(recipes[i * 2 + j].instructions) }}
                                        </v-card-text>
                                    </div>
                                </v-expand-transition>
                            </v-card>
                        </v-col>
                    </div>
                </v-row>
            </div>
        </template>
    </v-card>
</template>

<script>

export default {
    name: 'Gallery',
    data: () => ({
        recipes: [],
        showDescription: [],
        showIngredients: []
    }),
    created: function() {
        this.retrieveRecipes();
    },
    methods: {
        retrieveRecipes() {
            fetch('http://localhost:8080/getRecipes', {
                method: 'GET',
                headers: {
                    'If-Modified-Since': 'YourLastModifiedTime'
                }
            })
            .then(response =>{
                if (response.status === 304) {

                } else if (response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        return response.json(); // Parse JSON response
                    } else {
                        return response.text(); // Return plain text response
                    }
                } else {
                    throw new Error(`Failed to retrieve response data: ${response.status}`)
                }
            })
            .then((result) => {
                this.recipes = result.recipes;
                this.fillShow();
            })
            .catch((error) => {
                console.log('Failed to retrieve recipes: ', error)
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
<style>
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
.title {
    font-size: large;
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
    margin-top:1rem;
}
</style>
