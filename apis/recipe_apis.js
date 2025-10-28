/**
 * template for APIs in AWS lambda
 * @param {*} event 
 * @returns event handler for API response
 */
export const handler = async (event) => {

  const numberOfResults = 50; // number of recipes you want to retrieve
  const spoonacular_url = process.env.spoonacular_url; // Spoonacular service API url
  const api_key = process.env.spoonacular_api_key // Spoonacular service API key

  // Spoonacular necessary request metadeta
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': api_key,
      'x-rapidapi-host': spoonacular_url
    }
  };

  // headers for API response
  const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
  };

  // API retrieves random set of recipes
  if (event.path === '/api/get_recipes') {
    try {
      const response = await fetch(
        `https://${spoonacular_url}/recipes/random?number=${numberOfResults}`, options
      );
  
      if (!response.ok) {
        throw new Error(`Spoonacular API error: ${response.status}`);
      }
  
      // logs Recipe ID and title name
      const data = await response.json();
      data.recipes.forEach((recipe) => {
        console.log(`Recipe ID: ${recipe.id}, Title: ${recipe.title}`);
      });
      // returns recipes and additional data
      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
          success: true,
          count: data.recipes.length,
          recipes: data.recipes,
        }),
      };
  
    } catch (error) {
      console.error("Fetch error:", error);
  
      return {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({
          success: false,
          message: "Failed to retrieve recipes",
          error: error.message,
        }),
      };
    }
  }

  // API retrieves random set of recipes in bulk 
  if (event.path === '/api/get_recipes_bulk') {
    try {
      const response = await fetch(
        `https://${spoonacular_url}/recipes/random?number=${100}`, options
      );
      if (!response.ok) {
        throw new Error(`Spoonacular API error: ${response.status}`);
      }
      // logs Recipe ID and title name
      const data = await response.json();
      data.recipes.forEach((recipe) => {
        console.log(`Recipe ID: ${recipe.id}, Title: ${recipe.title}`);
      });
      // returns recipes and additional data
      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
          success: true,
          count: data.recipes.length,
          recipes: data.recipes,
        }),
      };
  
    } catch (error) {
      console.error("Fetch error:", error);
  
      return {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({
          success: false,
          message: "Failed to retrieve recipes",
          error: error.message,
        }),
      };
    }
  }
};
