// Enhanced Calorie & Nutrition Calculator
const calcForm = document.getElementById('calc-form');
calcForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const ageInput = document.getElementById('age');
  const genderInput = document.getElementById('gender');
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const activityInput = document.getElementById('activity');
  const resultsDiv = document.getElementById('calc-results');
  
  const age = +ageInput.value;
  const gender = genderInput.value;
  const height = +heightInput.value;
  const weight = +weightInput.value;
  const activity = +activityInput.value;
  
  // Reset any previous error styles
  [ageInput, genderInput, heightInput, weightInput, activityInput].forEach(input => {
    input.style.borderColor = '';
  });
  
  // Enhanced validation
  let hasErrors = false;
  
  if (!age || age < 10 || age > 120) {
    showFieldError(ageInput, 'Age must be between 10 and 120 years.');
    hasErrors = true;
  }
  
  if (!gender) {
    showFieldError(genderInput, 'Please select your gender.');
    hasErrors = true;
  }
  
  if (!height || height < 100 || height > 250) {
    showFieldError(heightInput, 'Height must be between 100 and 250 cm.');
    hasErrors = true;
  }
  
  if (!weight || weight < 30 || weight > 300) {
    showFieldError(weightInput, 'Weight must be between 30 and 300 kg.');
    hasErrors = true;
  }
  
  if (!activity) {
    showFieldError(activityInput, 'Please select your activity level.');
    hasErrors = true;
  }
  
  if (hasErrors) {
    resultsDiv.classList.add('is-hidden');
    return;
  }
  
  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr = 0;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  const tdee = Math.round(bmr * activity);
  
  // Macronutrient breakdown (corrected percentages from instructions)
  const carbsCalories = tdee * 0.5; // 50%
  const proteinCalories = tdee * 0.2; // 20% (instructions show 0% but that's clearly an error)
  const fatCalories = tdee * 0.3; // 30%
  
  const carbs = Math.round(carbsCalories / 4); // 4 kcal per gram
  const protein = Math.round(proteinCalories / 4); // 4 kcal per gram
  const fat = Math.round(fatCalories / 9); // 9 kcal per gram
  
  // Display results with enhanced UI
  resultsDiv.classList.remove('is-hidden');
  resultsDiv.innerHTML = `
    <div class="results-header">
      <h3>Your Nutrition Results</h3>
      <p class="results-date">${new Date().toLocaleDateString()}</p>
    </div>
    <div class="result-summary">
      <div class="result-card">
        <h4>BMR</h4>
        <div class="result-value">${Math.round(bmr)}</div>
        <div class="result-unit">kcal/day</div>
        <div class="result-description">Calories at rest</div>
      </div>
      <div class="result-card primary">
        <h4>TDEE</h4>
        <div class="result-value">${tdee}</div>
        <div class="result-unit">kcal/day</div>
        <div class="result-description">Total daily calories</div>
      </div>
    </div>
    
    <div class="macros-section">
      <h4>Daily Macronutrient Breakdown</h4>
      <div class="macro-grid">
        <div class="macro-item">
          <div class="macro-header">
            <span class="macro-name">Carbohydrates</span>
            <span class="macro-percentage">50%</span>
          </div>
          <div class="macro-amount">${carbs}g</div>
          <div class="progress-bar">
            <div class="progress carbs" data-width="50"></div>
          </div>
        </div>
        
        <div class="macro-item">
          <div class="macro-header">
            <span class="macro-name">Protein</span>
            <span class="macro-percentage">20%</span>
          </div>
          <div class="macro-amount">${protein}g</div>
          <div class="progress-bar">
            <div class="progress protein" data-width="20"></div>
          </div>
        </div>
        
        <div class="macro-item">
          <div class="macro-header">
            <span class="macro-name">Fat</span>
            <span class="macro-percentage">30%</span>
          </div>
          <div class="macro-amount">${fat}g</div>
          <div class="progress-bar">
            <div class="progress fat" data-width="30"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="recommendations">
      <h4>💡 Recommendations</h4>
      <ul>
        ${getPersonalizedRecommendations(bmr, tdee, age, gender)}
      </ul>
    </div>
  `;
  
  // Animate progress bars
  setTimeout(() => {
    document.querySelectorAll('.progress').forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    });
  }, 300);
  
  // Animate result cards
  document.querySelectorAll('.result-card').forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate-in');
    }, index * 100);
  });
  
  // Scroll to results
  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  // Show success message
  if (typeof window.showCustomAlert === 'function') {
    window.showCustomAlert('Calculation complete!', 'success');
  }
});

// Enhanced error display function
function showFieldError(field, message) {
  field.style.borderColor = '#e74c3c';
  field.style.borderWidth = '2px';
  
  // Remove existing error messages
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Add new error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #e74c3c;
    font-size: 0.9rem;
    margin-top: 5px;
    font-weight: 500;
  `;
  
  field.parentNode.appendChild(errorDiv);
  
  // Remove error on focus
  field.addEventListener('focus', function() {
    field.style.borderColor = '';
    field.style.borderWidth = '';
    errorDiv.remove();
  }, { once: true });
}

// Personalized recommendations based on results
function getPersonalizedRecommendations(bmr, tdee, age, gender) {
  const recommendations = [];
  
  if (tdee < 1500) {
    recommendations.push('<li>Consider consulting a nutritionist for a personalized meal plan.</li>');
  } else if (tdee > 3000) {
    recommendations.push('<li>You have high energy needs - make sure to eat nutrient-dense foods.</li>');
  }
  
  if (age < 25) {
    recommendations.push('<li>Focus on building healthy eating habits that will last a lifetime.</li>');
  } else if (age > 50) {
    recommendations.push('<li>Consider increasing protein intake to maintain muscle mass.</li>');
  }
  
  recommendations.push('<li>Stay hydrated - drink at least 8 glasses of water daily.</li>');
  recommendations.push('<li>Include a variety of colorful fruits and vegetables in your diet.</li>');
  recommendations.push('<li>Consider meal prep to help meet your nutrition goals.</li>');
  
  return recommendations.join('');
}
