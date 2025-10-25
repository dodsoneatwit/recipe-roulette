import { raw } from 'body-parser';
import Recipe from './Recipe'

export default class CustomUserList {

    myRecipesList = [];

    /**
     * Creates a unique custom list for an Account
     * to manipulate freely 
     * @constructor
     */
    constructor() {}

    
    getNumberOfRecipes() {
        return this.myRecipesList.length
    }

    addRecipe(raw_recipe) {

        let recipe = new Recipe(
            raw_recipe.title,
            raw_recipe.id,
            raw_recipe.image,
            raw_recipe.instructions,
            raw_recipe.summary,
            { 
              vegan: raw_recipe.vegan,
              vegetarian: raw_recipe.vegetarian,
              glutenFree: raw_recipe.glutenFree
            }
        )

        let titles = this.myRecipesList.map((e) => e.getTitle())
        let found = false;
        titles.forEach((title) => {
            if (title === recipe.getTitle()) {
                found = true;
            }
        })
        if (!found) {
            this.myRecipesList.push(recipe);
        }
    }

    removeRecipe(recipe) {
        this.myRecipesList = this.myRecipesList.filter((e) => e.title !== recipe.title)
    }

    setRecipesList(new_list) {
        this.myRecipesList = new_list
    }

    getRecipesList() {
        return this.myRecipesList
    }

    getRecipeAtIndex(index) {
        return this.myRecipesList[index]
    }

    sort() {
        this.myRecipesList.sort((curr, next) => {
            return curr.name < next.name ? -1 :
                   curr.name > next.name ? 1 : 0;
        })
    }

}