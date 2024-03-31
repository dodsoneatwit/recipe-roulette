// modules for handling api requests
const express = require('express');
const jsforce = require('jsforce');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

// API key and query for recipes
const apiKey = 'df1234e4fcad4177a07f6ba789141cd0';
const query = 'pasta';
const numberOfResults = 100; // Number of recipes you want to retrieve

// Construct the URL
const spoonacular_url = `https://api.spoonacular.com/recipes/random?number=${numberOfResults}&apiKey=${apiKey}`;

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

// // Create a Salesforce connection
const conn = new jsforce.Connection({
    loginUrl: 'https://login.salesforce.com' // Use the appropriate login URL
});

const admin_username = 'dodsone@empathetic-panda-irq575.com';
const admin_password = 'Elijah85VyMqp5lWjFrZxedJzSnwynE2t';

app.get('/getAccounts', (req, res) => {
    conn.login(admin_username, admin_password, (err, userInfo) => {
        if (err) { return console.error(err); }
        conn.query("SELECT Id, Name, Password__c, RecipeIds__c FROM Account", (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.json(result.records);
            }
            res.send(result)
        });
    });
});

app.get('/getUserAccount', (req, res) => {
    const { param1, param2 } = req.query;
    conn.login(admin_username, admin_password, (err, userInfo) => {
        if (err) { return console.error(err); }
        conn.query('SELECT Id, Name, Password__c, RecipeIds__c FROM Account', (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
            }
            result.records.forEach((record) => {
                if (record.Name === param1 && record.Password__c === param2) {
                    res.json(record);
                    res.send(record);
                }
            })
        });
    });
});


app.post('/addAccount', (req, res) => {
    const { username, password } = req.body;

    conn.login(admin_username, admin_password, (err, userInfo) => {
        if (err) { return console.error(err); }

        // Define the Account update data
        const newAccountData = {
            Name: username, // Field to be updated
            Password__c: password
        };

        // Creating the Account record
        conn.sobject('Account').create(newAccountData, function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log('Created Account Id: ', ret.id);
        });
    });
});

app.get('/getRecipes', (req, res) => {
    // Fetch data from Spoonacular API
    fetch(spoonacular_url)
    .then(response => {
    // Check if request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Extract recipe information
        res.send(data)
        data.recipes.forEach(recipe => {
            const recipeId = recipe.id;
            const recipeTitle = recipe.title;
            const recipeImage = recipe.image;
            console.log(`Recipe ID: ${recipeId}, Title: ${recipeTitle}, Image URL: ${recipeImage}`);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

})

app.get('/getRecipesFromBulk', (req, res) => {
    // Fetch data from Spoonacular API
    fetch(`https://api.spoonacular.com/recipes/random?number=${100}&apiKey=${apiKey}`)
    .then(response => {
    // Check if request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Extract recipe information
        res.send(data)
        data.recipes.forEach(recipe => {
            const recipeId = recipe.id;
            const recipeTitle = recipe.title;
            const recipeImage = recipe.image;
            console.log(`Recipe ID: ${recipeId}, Title: ${recipeTitle}, Image URL: ${recipeImage}`);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

})

app.post('/updateAccount', (req, res) => {
    const { id, username, password, recipeIds } = req.body;

    conn.login(admin_username, admin_password, (err, userInfo) => {
        if (err) { return console.error(err); }

        // Define the Account update data
        const updatedAccountData = {
            Id: id,
            Name: username, // Field to be updated
            Password__c: password,
            RecipeIds__c: recipeIds
        };

        // Updating the Account record
        conn.sobject("Account").update(updatedAccountData, function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log('Updated Successfully : ' + ret.id);
          });
    });
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});