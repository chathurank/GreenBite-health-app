let recipes = [];

// Fetch recipes from JSON file
fetch('assets/recipes.json')
  .then(response => {
    if (!response.ok) throw new Error(`Failed to load recipes: ${response.status}`);
    return response.json();
  })
  .then(data => {
    recipes = data;
    renderRecipes();
    setupRecipeCardListeners();
  })
  .catch(err => {
    const container = document.getElementById('recipe-cards');
    if (container) container.innerHTML = `<p role="alert">${err.message}. If running locally, please use a local web server.</p>`;
    console.error(err);
  });

function renderRecipes(filter = "all", search = "") {
  const container = document.getElementById('recipe-cards');
  container.innerHTML = "";
  let filtered = recipes.filter(r => (filter === "all" || r.category === filter) && r.title.toLowerCase().includes(search.toLowerCase()));
  filtered.forEach(recipe => {
    const card = document.createElement('div');
    card.className = "card";
    card.innerHTML = `
      <div style="position:relative;">
        <img src="${recipe.image}" alt="${recipe.title}" />
        <span class="card-category">${recipe.category}</span>
      </div>
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
      <div class="card-meta">
        <span><span class="icon">⏱️</span> ${recipe.prepTime}</span>
        <span><span class="icon">👥</span> ${recipe.servings} servings</span>
        <span><span class="icon">${recipe.difficulty === 'Easy' ? '😊' : recipe.difficulty === 'Medium' ? '😐' : '🔥'}</span> ${recipe.difficulty}</span>
      </div>
      <button class="view-btn" data-id="${recipe.id}">View Recipe</button>
    `;
    container.appendChild(card);
  });
}

function setupRecipeCardListeners() {
  const container = document.getElementById('recipe-cards');
  container.addEventListener('click', function(e) {
    if (e.target.classList.contains('view-btn')) {
      openModal(Number(e.target.dataset.id));
    }
  });
}

function openModal(id) {
  const recipe = recipes.find(r => r.id === id);
  const dialog = document.getElementById('recipe-dialog');
  const body = document.getElementById('dialog-body');
  if (!recipe || !dialog || !body) return;

  const titleId = 'recipe-title';
  
  // Check if recipe is saved
  const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
  const isSaved = savedRecipes.some(saved => saved.id === recipe.id);
  
  body.innerHTML = `
    <h2 id="${titleId}">${recipe.title}</h2>
    <div class="recipe-actions">
      <button class="btn-secondary save-recipe-btn ${isSaved ? 'saved' : ''}" onclick="toggleSaveRecipe(${recipe.id})">
        ${isSaved ? '❤️ Saved' : '🤍 Save Recipe'}
      </button>
      <div class="recipe-meta">
        <span class="recipe-category">${recipe.category}</span>
        <span class="recipe-difficulty">${recipe.difficulty}</span>
      </div>
    </div>
    <img src="${recipe.image}" alt="${recipe.title}" style="width:100%;border-radius:8px;" loading="lazy" decoding="async">
    
    <div class="recipe-details">
      <div class="recipe-info-grid">
        <div class="info-item">
          <strong>⏱️ Prep Time:</strong> ${recipe.prepTime}
        </div>
        <div class="info-item">
          <strong>👥 Servings:</strong> ${recipe.servings}
        </div>
        <div class="info-item">
          <strong>📊 Difficulty:</strong> ${recipe.difficulty}
        </div>
      </div>
    </div>
    
    <div class="recipe-content-container">
      <div class="recipe-content-section">
        <h4>Ingredients</h4>
        <ul class="ingredients-list">
          ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>
      
      <div class="recipe-content-section">
        <h4>Instructions</h4>
        <ol class="steps-list">
          ${recipe.steps.map((s, index) => `<li><span class="step-number">${index + 1}</span>${s}</li>`).join('')}
        </ol>
      </div>
    </div>
    
    <h4>Nutrition Information</h4>
    <table class="nutrition-table">
      <thead>
        <tr>
          <th>Nutrient</th>
          <th>Amount</th>
          <th>% Daily Value*</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Calories</td>
          <td>${recipe.nutrition.calories}</td>
          <td>${Math.round((recipe.nutrition.calories / 2000) * 100)}%</td>
        </tr>
        <tr>
          <td>Protein</td>
          <td>${recipe.nutrition.protein}</td>
          <td>${Math.round((parseInt(recipe.nutrition.protein) / 50) * 100)}%</td>
        </tr>
        <tr>
          <td>Carbohydrates</td>
          <td>${recipe.nutrition.carbs}</td>
          <td>${Math.round((parseInt(recipe.nutrition.carbs) / 300) * 100)}%</td>
        </tr>
        <tr>
          <td>Fat</td>
          <td>${recipe.nutrition.fat}</td>
          <td>${Math.round((parseInt(recipe.nutrition.fat) / 65) * 100)}%</td>
        </tr>
      </tbody>
    </table>
    <p class="nutrition-note">*Percent Daily Values are based on a 2,000 calorie diet.</p>
  `;

  // Remember the last focused element and restore on close
  const active = document.activeElement;
  dialog.addEventListener('close', () => active?.focus(), { once: true });

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
}

// Recipe saving functionality
function toggleSaveRecipe(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;
  
  let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
  const existingIndex = savedRecipes.findIndex(saved => saved.id === recipeId);
  
  if (existingIndex > -1) {
    // Remove from saved
    savedRecipes.splice(existingIndex, 1);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    
    // Update button
    const btn = document.querySelector('.save-recipe-btn');
    btn.textContent = '🤍 Save Recipe';
    btn.classList.remove('saved');
    
    if (typeof window.showCustomAlert === 'function') {
      window.showCustomAlert('Recipe removed from saved recipes.', 'info');
    }
  } else {
    // Add to saved
    const savedRecipe = {
      ...recipe,
      savedDate: new Date().toISOString()
    };
    savedRecipes.push(savedRecipe);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    
    // Update button
    const btn = document.querySelector('.save-recipe-btn');
    btn.textContent = '❤️ Saved';
    btn.classList.add('saved');
    
    if (typeof window.showCustomAlert === 'function') {
      window.showCustomAlert('Recipe saved to your favorites!', 'success');
    }
  }
}

document.getElementById('dialog-close')?.addEventListener('click', () => {
  const dialog = document.getElementById('recipe-dialog');
  if (typeof dialog.close === 'function') {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
  }
});

// Filter/search listeners
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
searchInput?.addEventListener('input', () => {
  renderRecipes(categoryFilter.value, searchInput.value);
  setupRecipeCardListeners();
});
categoryFilter?.addEventListener('change', () => {
  renderRecipes(categoryFilter.value, searchInput.value);
  setupRecipeCardListeners();
});

// Guarded DOM ready setup
window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('recipe-cards');
  if (container && !container.__hasListener) {
    container.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.classList && target.classList.contains('view-btn')) {
        const id = Number(target.dataset.id);
        if (!Number.isNaN(id)) openModal(id);
      }
    });
    container.__hasListener = true;
  }

  const closeBtn = document.getElementById('dialog-close');
  const dialog = document.getElementById('recipe-dialog');
  closeBtn?.addEventListener('click', () => {
    if (dialog?.close) dialog.close(); else dialog?.removeAttribute('open');
  });

  // Close when clicking backdrop (only works with native <dialog>)
  if (dialog && typeof dialog.addEventListener === 'function') {
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const clickInside = (
        event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom
      );
      if (!clickInside) {
        if (dialog.close) dialog.close(); else dialog.removeAttribute('open');
      }
    });
  }
});
