import Recipe from './Recipe'

class CustomUserList {

    myRecipesList = [];

    /**
     * Creates a unique custom list for an Account
     * to manipulate freely 
     * @constructor
     */
    constructor() {}

    
    getNumberOfRecipes() {
        return this.myRecipesList.length()
    }

    addRecipe(recipe) {
        this.myRecipesList.push(recipe)
    }

    removeRecipe(recipe) {
        this.myRecipesList = this.myRecipesList.filter((e) => e.name !== recipe.name)
    }

    getRecipesList() {
        return this.myRecipesList
    }

    sort() {
        this.myRecipesList.sort((curr, next) => {
            return curr.name < next.name ? -1 :
                   curr.name > next.name ? 1 : 0;
        })
    }

}