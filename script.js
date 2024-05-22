// Initialize recipes array
let recipes = [];

// Function to load recipes from local storage
function loadRecipesFromStorage() {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
        recipes = JSON.parse(storedRecipes);
        displayRecipes(); // Display loaded recipes
    }
}

// Function to save recipes to local storage
function saveRecipesToStorage() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Function to display all recipes
function displayRecipes() {
    const recipeList = document.querySelector('#recipe-list');
    const noRecipes = document.getElementById('no-recipes');

    recipeList.innerHTML = '';
    if (recipes.length === 0) {
        noRecipes.style.display = 'block'; // Show message when no recipes found
    } else {
        noRecipes.style.display = 'none'; // Hide message when recipes exist
        recipes.forEach((recipe, index) => {
            const recipeDiv = document.createElement('div');
            recipeDiv.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong></p>
                <ul>
                    ${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
                </ul>
                <p><strong>Method:</strong></p>
                <p>${recipe.method}</p>
                <button class="delete-button" data-index="${index}">Delete</button>`;
            recipeDiv.classList.add('recipe');
            recipeList.appendChild(recipeDiv);
        });
    }
}

// Event listener for form submission
document.querySelector('form').addEventListener('submit', handleSubmit);

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    const nameInput = document.querySelector('#recipe-name');
    const ingrInput = document.querySelector('#recipe-ingredients');
    const methodInput = document.querySelector('#recipe-method');
    const name = nameInput.value.trim();
    const ingredients = ingrInput.value.trim().split(',').map(i => i.trim());
    const method = methodInput.value.trim();

    if (name && ingredients.length > 0 && method) {
        const newRecipe = { name, ingredients, method };
        recipes.push(newRecipe);

        // Clear input fields after adding a recipe
        nameInput.value = '';
        ingrInput.value = '';
        methodInput.value = '';

        // Display the newly added recipe
        displayRecipes();

        // Save recipes to local storage
        saveRecipesToStorage();
    }
}

// Function to handle delete button click
function handleDelete(event) {
    const index = parseInt(event.target.dataset.index, 10); // Convert string to integer
    recipes.splice(index, 1);
    displayRecipes(); // Update the UI after deleting a recipe
    saveRecipesToStorage(); // Save changes to local storage
}

// Attach event listener for delete buttons
document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', handleDelete);
});

// Search functionality
const searchBox = document.getElementById('search-box');
searchBox.addEventListener('input', event => {
    const query = event.target.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(query));

    displayFilteredRecipes(filteredRecipes);
});

function displayFilteredRecipes(filteredRecipes) {
    const recipeList = document.querySelector('#recipe-list');
    recipeList.innerHTML = ''; // Clear current list

    if (filteredRecipes.length === 0) {
        noRecipes.style.display = 'block'; // Show message when no recipes match the search
    } else {
        noRecipes.style.display = 'none'; // Hide message when recipes match the search
        filteredRecipes.forEach(recipe => {
            const recipeEl = document.createElement('div');
            recipeEl.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong></p>
                <ul>
                    ${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
                </ul>
                <p><strong>Method:</strong></p>
                <p>${recipe.method}</p>
                <button class="delete-button" data-index="${recipes.indexOf(recipe)}">Delete</button>`;
            recipeEl.classList.add('recipe');
            recipeList.appendChild(recipeEl);
        });
    }
}

// Call loadRecipesFromStorage when the page loads
loadRecipesFromStorage();
