<template>
    <div class="container">
      <center>
        <v-card max-width="500" elevation="6" class="recipe">
          <div v-if="fetched">
            <center><img :src="recipes[randomNum]?.image" alt="Recipe Image"></center>
            <v-row>
              <v-col>
                <v-card-title class="mt-2 anta-regular"> 
                  {{ recipes[randomNum]?.title !== undefined && recipes[randomNum]?.title !== null ? recipes[randomNum]?.title : '' }}
                </v-card-title>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn class="addToList" @click="updateMyRecipes(recipes[randomNum])">
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
              </v-col>
            </v-row>
            <v-card-actions>
                <v-card-subtitle class="mt-2 anta-regular">Description</v-card-subtitle>
                <v-btn
                    :icon="showDescription ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    @click="showDescription = !showDescription"
                ></v-btn>
                <v-spacer/>
                <v-card-subtitle class="mt-2 anta-regular" >Instructions</v-card-subtitle>
                <v-btn
                    :icon="showIngredients ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    @click="showIngredients = !showIngredients"
                ></v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-if="showDescription">
                    <v-divider></v-divider>

                    <v-card-text class="mt-2 anta-regular">
                        {{ removeHtmlTags(recipes[randomNum].summary) }}
                        <v-row :id="diet" class="diet">
                            <div v-if="recipes[randomNum].vegetarian" class="diet-icons" v:on:mouseover="showVegetarian">
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
                            <div v-if="recipes[randomNum].vegan" class="diet-icons">
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
                            <div v-if="recipes[randomNum].glutenFree" class="diet-icons">
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
                <div v-if="showIngredients">
                    <v-divider></v-divider>

                    <v-card-text class="mt-2 anta-regular" >
                        {{ removeHtmlTags(recipes[randomNum].instructions) }}
                    </v-card-text>
                </div>
            </v-expand-transition>
          </div>
        </v-card>
      </center>
        <v-slider
         v-model="range"
         :min="1"
         :max="maxGenerations"
         show-ticks="always"
         thumb-label="always"
         step="1"
         color="black"
         track-color="red"
         elevation="5"
         density="comfortable"
         class="align-center slider"
        />
        <center>
          <v-btn class="mt-2 anta-regular" @click="getRandomRecipe()">
              {{ buttonTitle }}
          </v-btn>
        </center>
    </div>
  </template>
  
  <script>
import CustomList from './CustomList.vue';
import CustomUserList from '../lib/Classes/CustomUserList'

  export default {
    name: 'Generation',
    data: () => ({
      buttonTitle: 'Generate',
      range: 1,
      maxGenerations: 4,
      fetched: false,
      recipes: [],
      myList: new CustomUserList(),
      randomNum: 0,
      showDescription: false,
      showIngredients: false
    }),
    components: {
    },
    created: function () {
      this.retrieveRecipesInBulk();
    },
    methods: {
      async retrieveRecipesInBulk() {
        try {
          const response = await fetch('http://localhost:8080/getRecipesFromBulk', {
                method: 'GET',
                headers: {
                    'If-Modified-Since': 'YourLastModifiedTime'
                }
            })
                if (response.status === 304) {
                // Handle not modified response
            } else if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const result = await response.json(); // Parse JSON response
                    this.recipes = result.recipes; // Update component data
                    this.fetched = true;
                } else {
                    const result = await response.text(); // Parse plain text response
                    // Handle text response
                }
            } else {
                throw new Error(`Failed to retrieve response data: ${response.status}`);
            }
        } catch (error) {
          console.log('Failed to retrieve recipes: ', error)
        }
      },
      getRandomRecipe() {
        this.randomNum = Math.floor(Math.random() * this.recipes.length);
        this.fetched = true
      },
      removeHtmlTags(text) {
        return text?.replace(/<[^>]*>?/gm, '');
      },
      updateMyRecipes(recipe) {
            this.myList.addRecipe(recipe)
            this.$emit('update-my-custom-recipes', this.myList)
        }
    }
  }
  //
  </script>
  <style scoped>
    .container {
        height: 150rem;
        margin-top: 7%;
        margin-left: 15%;
        margin-right: 15%;
    }
    .slider{
      font-size: 5.0rem
    }
    .anta-regular {
      font-family: "Anta", sans-serif;
      font-weight: 400;
      font-style: normal;
    }
    .prefetchedText {
      font-size: xx-large;
    }
    .diet-icons {
        margin-left: 1rem;
        margin: 1rem
    }
    .diet {
        margin-top:1rem;
    }
    .addToList {
      margin-bottom:1rem
    }
  </style>
  