class Recipe{

    /**
     * Defines a single recipe
     * @constructor 
     * @param {string} name - name of recipe
     * @param {string} id - recipe identification
     * @param {list} ingredients - list of ingredients that make the dish
     * @param {object} process - steps and difficulty of recipe
     * @param {object} restrictions - dietary restrictions: vegan, spicy, gluten free, vegetarian
     * @param {object} nutrition - additional nutritional facts for given recipe
     */
    constructor(name, id, ingredients, process, restrictions, nutrition){
        this.name = name;
        this.id = id;
        this.ingredients = ingredients;
        this.process = process;
        this.restrictions = restrictions;
        this.nutrition = nutrition;
    }


}