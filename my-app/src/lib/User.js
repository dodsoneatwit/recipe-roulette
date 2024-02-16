class User {

    /**
     * Represents an abstract user
     * @constructor
     * @param {string} username - username of user
     * @param {string} password - password of user
     * @param {string} email - email of user
     */
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
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

    /**
     * Gets the email of current user
     * 
     * @returns {string} email
     */
    getEmail() {
        return this.email;
    }
}