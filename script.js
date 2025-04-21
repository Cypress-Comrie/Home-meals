const searchForm = document.querySelector('form')
const searchInput = document.querySelector('#search')
const resultsList = document.querySelector('#results')

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  searchRecipes()
})

async function searchRecipes() {
  const searchValue = searchInput.value.trim()
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
  )
  const data = await response.json()
  displayRecipes(data.meals)
}

function displayRecipes(recipes) {
  let html = ''

  if (!recipes) {
    resultsList.innerHTML = '<p>No recipes found. Try another search term.</p>'
    return
  }

  recipes.forEach((recipe) => {
    // Extract ingredients from TheMealDB format
    let ingredients = []
    for (let i = 1; i <= 20; i++) {
      if (
        recipe[`strIngredient${i}`] &&
        recipe[`strIngredient${i}`].trim() !== ''
      ) {
        const ingredient = `${recipe[`strMeasure${i}`] || ''} ${
          recipe[`strIngredient${i}`]
        }`
        ingredients.push(ingredient.trim())
      }
    }

    html += `
      <div>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <h3>${recipe.strMeal}</h3>
        <ul>
          ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
        </ul>
        <a href="https://www.themealdb.com/meal/${
          recipe.idMeal
        }" target="_blank">View Recipe</a>
      </div>
    `
  })

  resultsList.innerHTML = html
}
