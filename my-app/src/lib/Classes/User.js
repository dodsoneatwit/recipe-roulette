export default class User {

    /**
     * Represents an abstract user
     * @constructor
     * @param {string} username - username of user
     * @param {string} password - password of user
     */
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    /**
     * Gets the username of current user
     * 
     * @returns {string} username
     */
    getUsername() {
        return this.username;
    }

    /**
     * Gets the password of current user
     * 
     * @returns {string} password
     */
    getPassword() {
        return this.password;
    }
}