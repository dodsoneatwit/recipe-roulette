import User from './User'

export default class Account extends User {

    email = '';
    recipe_ids = []
    /**
     * Initializes an official account for a given user
     * within the app
     * @constructor
     * @param {string} username 
     * @param {string} password
     * @param {string} account_id
     * @param {array} recipe_ids
     */
    constructor(account_id, username, password, recipe_ids = []) {
        super(username, password);
        this.account_id = account_id
        this.recipe_ids = recipe_ids
    }

    getUserName() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }

    getId() {
        return this.account_id;
    }

    getRecipeIds() {
        return this.recipe_ids
    }

    updateRecipeIds(value) {
        this.recipe_ids.push(value);
    }

}