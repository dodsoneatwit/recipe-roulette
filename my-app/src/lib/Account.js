import User from './User'
import Recipe from './Recipe'
import CustomUserList from './CustomUserList'

class Account extends User {

    
    mySettings = {
        user_name: username,
        password: password,
        email: email
    }

    /**
     * Initializes an official account for a given user
     * within the app
     * @constructor
     * @param {string} username 
     * @param {string} password 
     * @param {string} email 
     * @param {string} id 
     */
    constructor(username, password, email, id) {
        super(username, password, email);
        this.id = id
    }

    logIntoAccount() {

    }

    addPreviouslyViewed() {

    }

}