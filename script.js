const searchForm = document.querySelector('form')
const searchInput = document.querySelector('#search')
const resultsList = document.querySelector('#results')
function openNav() {
  document.getElementById('nav').style.width = '250px'
  document.getElementsByClassName('container').style.marginLeft = '250px'
  document.getElementsByTagName('span').style.marginLeft = '0px'
}
function closeNav() {
  document.getElementById('nav').style.width = '0px'
  document.getElementsByClassName('container').style.marginLeft = '0px'
  document.getElementsByTagName('span').style.marginLeft = '0px'
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  searchRecipes()
})

async function searchRecipes() {
  const searchValue = searchInput.value.trim()

  if (!searchValue) {
    resultsList.innerHTML = '<p>Please enter a search term</p>'
    return
  }

  resultsList.innerHTML = '<p>Searching...</p>'

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(
        searchValue
      )}`,
      {
        headers: {
          'X-Api-Key': 'juTkmLh97FdPYDThZDnCwQ==hHecN7jtm7D9SwaN',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    displayRecipes(data)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    resultsList.innerHTML = `<p>Error fetching recipes: ${error.message}</p>`
  }
}

function displayRecipes(recipes) {
  let html = ''

  if (!recipes || recipes.length === 0) {
    resultsList.innerHTML = '<p>No recipes found. Try another search term.</p>'
    return
  }

  recipes.forEach((recipe) => {
    const ingredientsArray = recipe.ingredients
      .split('|')
      .map((item) => item.trim())

    html += `
      <div class="recipe-card">
        <h3>${recipe.title}</h3>
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <p><strong>Cooking Time:</strong> ${
          recipe.cook_time_minutes
        } minutes</p>
        <h4>Ingredients:</h4>
        <ul>
          ${ingredientsArray
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join('')}
        </ul>
        <h4>Instructions:</h4>
        <p>${recipe.instructions}</p>
      </div>
    `
  })

  resultsList.innerHTML = html
}
