class Generate {

    constructor(recipes) {
        this.recipes = recipes;
    }

    generateRandomRecipe() {
        let recipeIndex = Math.floor(Math.random() * this.recipes.length())
        return this.recipes[recipeIndex];
    }
}