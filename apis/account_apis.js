import mysql from 'mysql2/promise';

/**
 * template for APIs in AWS lambda
 * @param {*} event 
 * @returns event handler for API response 
 */
export const handler = async (event) => {
    // headers for API response
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    // instantiating connection to MySQL server from AWS RDS
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 3306
    });

    // API logins into user account if valid info
    if (event.path === "/api/login_to_account") {
        try {
            const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
            const {username, password} = body;
            // query lets user with matching username and password
            const [rows] = await connection.execute('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password])
            // throws error if no result
            if (rows.length === 0) {
                return {
                    statusCode: 200,
                    headers: headers,
                    body: JSON.stringify({
                        message: 'Invalid credentials'
                    })
                };
            }
            // retrieves user data and saved recipes in association with user
            const user = rows[0];
            const [savedRecipes] = await connection.execute(
                'SELECT * FROM Saved_Recipes WHERE user_id = ?', [user.user_id]
            );
            const savedRecipesIds = savedRecipes.map(recipe => recipe.recipe_id);
            user.savedRecipes = savedRecipesIds;
            await connection.end();

            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({
                    message: 'Login successful',
                    user: user
                })
            };
        } catch (error) {
            console.error('Error retrieving accounts data:', error);
            return {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({ error: error.message })
            };
        }
    }

    // API creates user account if valid info
    if (event.path === "/api/create_account") {
        try {
            const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
            const {username, password} = body;
            // query lets user with matching username and password
            const [rows] = await connection.execute('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password])
            // throws error is account already exists
            if (rows.length > 0) {
                return {
                    statusCode: 200,
                    headers: headers,
                    body: JSON.stringify({
                        message: 'Account already exists'
                    })
                };
            }

            // adds new user to database
            const [result] = await connection.execute(
                'INSERT INTO Users (username, password) VALUES (?, ?)', [username, password]
            );
            // grabs ID of insertion and queries it for response
            const insertId = result.insertId;
            const [user] = await connection.execute(
                'SELECT * FROM Users WHERE id = ?', [insertId]
            );
            await connection.end();

            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({
                    message: 'Account created successfully',
                    user: user[0]
                })
            };
        } catch (error) {
            console.error('Error creating account:', error);
            return {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({ error: error.message })
            };
        }
    }

    // API adds recipe to user list
    if (event.path === "/api/add_recipe_to_list") {
        try {
            const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
            const {user_id, recipe_id} = body;
            // adds new user to Saved Recipes database
            const [result] = await connection.execute(
                'INSERT INTO Saved_Recipes (user_id, recipe_id) VALUES (?, ?)', [user_id, recipe_id]
            );
            // retrieves updated list
            const [recipe] = await connection.execute(
                'SELECT recipe_id FROM Saved_Recipes WHERE user_id = ?', [user_id]
            );
            await connection.end();
            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({
                    message: 'Recipe successfully added to user list',
                    recipes: recipe.map((recipe) => recipe.recipe_id)
                })
            };
        } catch (error) {
            console.error('Error adding recipe:', error);
            return {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({ error: error.message })
            };
        }
    }

    // API deletes recipe from user list
    if (event.path === "/api/delete_recipe_from_list") {
        try {
            const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
            const {user_id, recipe_id} = body;
            // deletes recipe from table
            const [result] = await connection.execute(
                'DELETE FROM Saved_Recipes WHERE user_id = ? AND recipe_id = ?', [user_id, recipe_id]
            );
            // retrieves updated list
            const [recipe] = await connection.execute(
                'SELECT recipe_id FROM Saved_Recipes WHERE user_id = ?', [user_id]
            );
            await connection.end();
            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({
                    message: 'Recipe successfully deleted from user list',
                    recipes: recipe.map((recipe) => recipe.recipe_id)
                })
            };
        } catch (error) {
            console.error('Error deleting recipe:', error);
            return {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({ error: error.message })
            };
        }
    }
}