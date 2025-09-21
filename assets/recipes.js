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
  body.innerHTML = `<h2 id="${titleId}">${recipe.title}</h2>` +
    `<img src="${recipe.image}" alt="${recipe.title}" style="width:100%;border-radius:8px;" loading="lazy" decoding="async">` +
    `<h4>Ingredients</h4><ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>` +
    `<h4>Steps</h4><ol>${recipe.steps.map(s => `<li>${s}</li>`).join('')}</ol>` +
    `<h4>Nutrition Info</h4><table><tr><th>Calories</th><th>Protein</th><th>Carbs</th><th>Fat</th></tr><tr><td>${recipe.nutrition.calories}</td><td>${recipe.nutrition.protein}</td><td>${recipe.nutrition.carbs}</td><td>${recipe.nutrition.fat}</td></tr></table>`;

  // Remember the last focused element and restore on close
  const active = document.activeElement;
  dialog.addEventListener('close', () => active?.focus(), { once: true });

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
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
