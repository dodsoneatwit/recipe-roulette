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
import Account from './../lib/Classes/Account'
import CustomUserList from '@/lib/Classes/CustomUserList';
export default {
    name: 'CustomList',
    data: () => ({
        showDescription: [],
        showIngredients: [],
        temp: 'Not Yet',
        customList: new CustomUserList(),
        url: `https://api.spoonacular.com/recipes/`,
        apiKey: '',
    }),
    props: {
        username: {
            type: String
        },
        password: {
            type: String
        }
    },
    created: function() {
        this.initializeCustomlist()
    },
    mounted() {
        // Setting data value to the value of the prop
        this.tempList = this.propValue;
    },
    methods: {
        async initializeCustomlist() {
            const account = await this.getAccountDetails();
            console.log('Account: ' + account)
            //https://api.spoonacular.com/recipes/{id}/information
            account.getRecipeIds().forEach((id, index) => {
                fetch (this.url + `${id}/information?apiKey=${this.apiKey}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error searching for recipe')
                    }
                    return response.json();
                })
                .then((recipe) => {
                    this.customList.addRecipe(recipe);
                    console.log('CustomList: ' + this.customList.getNumberOfRecipes())
                    console.log('Recipe: ' + recipe.id)
                })
                .catch((error) => {
                    console.log('Error fetching search recipes from spoonacular')
                })
            })
            let firstRecipe = this.customList.getRecipeAtIndex(0);
            //console.log('My List First Item: ' + firstRecipe.getTitle())
        },
        async getAccountDetails() {
            try {

                let response = await fetch(`http://localhost:8080/getuserAccount?param1=${this.username}&param2=${this.password}`, {
                    method: 'GET',
                    headers: {
                        'If-Modified-Since': 'YourLastModifiedTime'
                    }
                });
                let data = ''
                if (response.status === 304) {

                } else if (response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        data = await response.json(); // Parse JSON response
                    } else {
                        data = await response.text(); // Return plain text response
                    }
                } else {
                    throw new Error(`Failed to retrieve response data: ${response.status}`)
                }
                let account = new Account(data.Name, data.Password__c, data.Id, data.RecipeIds__c == null ? [] : data.RecipeIds__c.split('\n'))
                console.log('Recipe Ids: ' + account.getRecipeIds())
                return account;

            } catch(error) {
                console.error('Error occurred while fetching account details: ' + error)
            }
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
