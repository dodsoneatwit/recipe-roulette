
![Alt text](my-app/public/images/recipe-roulette-title.png)

## About

The Recipe Roulette app is designed to create an ongoing, thrilling, and surprising experience through its random recipe generator, hence the name “Recipe Roulette”. Each recipe within the app allows you to view it’s title, in-depth instructions, description, and dietary restrictions. Moreover, one will also be able to add a recipe to their very own custom list. For first time users, they could create an account, and with this account includes a unique custom list of recipes and profile section of their very own. Every recipe card will contain a button that allows them to save a recipe into this list to their account for later viewing. In addition, three major sections are present: Generate, Gallery, Explore. 

The Generate section will allow a person to press a button and generate a random recipe with each click. There is also a slider that allows them to generate more than one recipe at a time, up to four recipes for quicker suggestions. The Gallery section is unique because for every time a person loads into the tab, a new selection of recipes will be present, making every experience one of a kind. To add on, the user will be able to filter recipes that suit their dietary restrictions. Lastly, the Explore section allows those with more specific preferences to search for a recipe or ingredient of their own. Through use of the search bar, the user could type in ‘cake’ and selection of cake-like recipes will appear for the person. Some apps that exist that incorporate similar functionality would be ShuffleChef, Tomaito, and SuperCook. Thus, the idea of this app is to try and create something simpler, quicker, and more accessible that provides those with a higher incentive to create more homecooked meals. 


![Alt text](my-app/public/images/rr-home-gen.png)

## Initial Setup

Install the latest version of Node.js here at [nodejs.org](https://nodejs.org/en/download/package-manager)!

## Front-End Application

### Starting Application Locally:

1. Change directory to recipe-roulette\my-app
2. Execute command npm i or npm install to install required packages
3. Execute command npm run dev to start client
4. Navigate to URL http://localhost:3000/ to see application running

### Tools:

<li>Vue.js: JavaScript framework for building dynamic and responsive interfaces and components [Vuejs.com](https://vuejs.org/)</li>
<li>Vuetify: A Vue library that offers pre-designed Vue components [Vuetify.com](https://vuetifyjs.com/)</li>

## Frontend and Backend Interaction Sequence

![Alt text](my-app/public/diagrams/images%20developed/seq_diagram_standard_flow.png)

## Amazon Web Services: RDS, Lambda and API Gateway

<li>RDS (Relational Database Service): created instance for MySQL database; database included tables for user accounts and a table for saved recipes</li>
<li>Lambda: utilized to create serverless functions for handling external service API requests and querying to MySQL database</li>
<li>API Gateway: allows user to access public API that triggers AWS lambda functions</li>

## Author

- Elijah Dodson

