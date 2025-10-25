export const handler = async (event) => {
  const numberOfResults = 50; // number of recipes you want to retrieve
  // construct the URL
  const spoonacular_url = process.env.spoonacular_url;
  const api_key = process.env.spoonacular_api_key
  
  // retrieves random recipes from Spoonacular API
  if (event.path === "/api/get_recipes") {
    // fetching API request reponse
    const response = fetch(`${spoonacular_url}recipes/random?number=${numberOfResults}&apiKey=${api_key}`)
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
    return response;
  }

  // retrieves random recipes in bulk from Spoonacular API
  if (event.path === "/api/get_bulk_recipes") {
    // fetching API request reponse
    const response = fetch(`${spoonacular_url}recipes/random?number=${100}&apiKey=${api_key}`)
        .then(response => {
            // checking for successful request
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
    return response;
  }
};