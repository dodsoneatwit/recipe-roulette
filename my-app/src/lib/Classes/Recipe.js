export default class Recipe{

    /**
     * Defines a single recipe
     * @constructor 
     * @param {string} title - name of recipe
     * @param {string} id - recipe identification
     * @param {string} image - image url of recipe
     * @param {string} instructions - list of ingredients that make the dish
     * @param {string} description - steps and difficulty of recipe
     * @param {object} restrictions - dietary restrictions: vegan, spicy, gluten free, vegetarian
     */
    constructor(title, id, imageUrl, instructions, description, restrictions){
        this.title = title;
        this.id = id;
        this.imageUrl = imageUrl
        this.instructions = instructions;
        this.description = description;
        this.restrictions = restrictions;
    }



    getTitle() {
        return this.title;
    }

    getID() {
        return this.id
    }

    getImageUrl() {
        return this.imageUrl
    }

    getInstructions() {
        return this.instructions;
    }

    getDescription() {
        return this.description
    }

    isVegan() {
        return this.restrictions.vegan
    }

    isVegetarian() {
        return this.restrictions.vegetarian
    }

    isGlutenFree() {
        return this.restrictions.glutenFree
    }


}