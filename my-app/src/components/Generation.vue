<template>
    <div class="container">
      <v-container>
        <v-row justify="center">
          <v-col v-for="(recipe, i) in chosenRecipes" :key="i" cols="12" sm="10" md="6" lg="4">
            <v-card max-width="500" elevation="6" class="recipe">
              <div v-if="fetched">
                <center><img :src="recipe?.image" alt="Recipe Image"></center>
                <v-row>
                  <v-col>
                    <v-card-title class="mt-2 anta-regular"> 
                      {{ recipe?.title !== undefined && recipe?.title !== null ? recipe?.title : '' }}
                    </v-card-title>
                  </v-col>
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
                        </v-card-text>
                    </div>
                </v-expand-transition>
                <v-expand-transition>
                    <div v-if="showIngredients">
                        <v-divider></v-divider>

                        <v-card-text class="mt-2 anta-regular" >
                            {{ removeHtmlTags(recipe?.instructions) }}
                        </v-card-text>
                    </div>
                </v-expand-transition>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
              {{ generateBtn }}
          </v-btn>
        </center>
    </div>
  </template>
  
  <script>
import CustomUserList from '../lib/Classes/CustomUserList'
import Generate from '../lib/Classes/Generate'

  export default {
    name: 'Generation',
    data: () => ({
      username: '',
      password: '',
      api_url: import.meta.env.VITE_APP_GATEWAY_URL,
      itemsAdded: 0,
      generateBtn: 'Generate',
      saveBtn: 'Save',
      range: 1,
      maxGenerations: 4,
      fetched: false,
      recipes: [],
      chosenRecipes: [],
      myList: new CustomUserList(),
      randomNum: 0,
      showDescription: false,
      showIngredients: false
    }),
    props: {
      myAccount: {
        type: Object
      }
    },
    components: {
    },
    created: function () {
      this.retrieveRecipesInBulk();
      this.tempfunc();
    },
    methods: {
      tempfunc() {
        const savedUser = localStorage.getItem('user')
          if (savedUser) {
            console.log('LOCAL SAVE TEST',JSON.parse(savedUser))
          }
      },
      async retrieveRecipesInBulk() {
          const response = await fetch(`${this.api_url}/dev/api/get_recipes_bulk`, {
                method: "GET",
                headers:    {
                    'Content-Type': 'application/json'
                },
          })
          console.log('--RESPONSE--',response)
          const result = await response.json(); // Parse JSON response
          console.log('--RECIPES DATA--',result)
          this.recipes = new Generate(result.recipes); // Update component data
          this.chosenRecipes[0] = this.recipes.generateRandomRecipe()
          this.fetched = true;
      },
      getRandomRecipe() {
        this.chosenRecipes = []
        for (let i = 0; i < this.range; i++) {
          this.chosenRecipes[i] = this.recipes.generateRandomRecipe();
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
          this.myList.setRecipesList(result.recipes)

          // this.$emit('update-my-custom-recipes', this.myList)
      }
    }
  }
  //
  </script>
  <style scoped>
    .container {
        height: 150rem;
        margin-top: 7%;
        margin-left: 7.5%;
        margin-right: 7.5%;
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
  