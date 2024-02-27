import User from './User'
import Recipe from './Recipe'
import CustomUserList from './CustomUserList'

class Account extends User {

    
    mySettings = {
        user_name: username,
        password: password
    };

    email = '';

    /**
     * Initializes an official account for a given user
     * within the app
     * @constructor
     * @param {string} username 
     * @param {string} password
     */
    constructor(username, password, id) {
        super(username, password);
        this.id = id
    }

    getUserName() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }

    getId() {
        return this.id;
    }

    logIntoAccount() {
        
    }

    addPreviouslyViewed() {

    }

}