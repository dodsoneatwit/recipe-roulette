<template>
    <div class="container">
      <center>
        <v-card max-width="500" elevation="6" class="recipe">
        <div v-if="!fetched">
          <v-card-text class="text-center anta-regular prefetchedText">Press the "Generate" button to generate a random recipe</v-card-text>
        </div>
        <div v-if="fetched">
          <center><img :src="recipes[randomNum].image" alt="Recipe Image"></center>
          <v-card-title class="mt-2 anta-regular"> {{ recipes[randomNum].title }}</v-card-title>
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
              <div v-show="showDescription">
                  <v-divider></v-divider>

                  <v-card-text class="mt-2 anta-regular">
                      {{ removeHtmlTags(recipes[randomNum].summary) }}
                  </v-card-text>
              </div>
          </v-expand-transition>
          <v-expand-transition>
              <div v-show="showIngredients">
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
  
  export default {
    name: 'Generation',
    data: () => ({
      buttonTitle: 'Generate',
      range: 1,
      maxGenerations: 4,
      fetched: false,
      recipes: [],
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
      retrieveRecipesInBulk() {
            fetch('http://localhost:8080/getRecipesFromBulk', {
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
            })
            .catch((error) => {
                console.log('Failed to retrieve recipes: ', error)
            })
      },
      getRandomRecipe() {
        this.randomNum = Math.floor(Math.random() * this.recipes.length);
        this.fetched = true
      },
      removeHtmlTags(text) {
        return text.replace(/<[^>]*>?/gm, '');
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
    .recipe {

    }
  </style>
  