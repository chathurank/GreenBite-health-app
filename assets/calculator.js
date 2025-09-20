// Calorie & Nutrition Calculator
const calcForm = document.getElementById('calc-form');
calcForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  const age = +document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const height = +document.getElementById('height').value;
  const weight = +document.getElementById('weight').value;
  const activity = +document.getElementById('activity').value;
  let bmr = 0;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  const tdee = Math.round(bmr * activity);
  // Macronutrient breakdown
  const carbs = Math.round((tdee * 0.5) / 4);
  const protein = Math.round((tdee * 0.2) / 4);
  const fat = Math.round((tdee * 0.3) / 9);
  document.getElementById('calc-results').innerHTML = `
    <h3>Your Results</h3>
    <div class="result-summary">
      <div><strong>BMR:</strong> ${Math.round(bmr)} kcal/day</div>
      <div><strong>TDEE:</strong> ${tdee} kcal/day</div>
    </div>
    <table>
      <tr><th>Macro</th><th>Grams</th><th>Progress</th></tr>
      <tr><td>Carbs (50%)</td><td>${carbs}g</td><td><div class="progress-bar"><div class="progress" style="width:50%"></div></div></td></tr>
      <tr><td>Protein (20%)</td><td>${protein}g</td><td><div class="progress-bar"><div class="progress" style="width:20%"></div></div></td></tr>
      <tr><td>Fat (30%)</td><td>${fat}g</td><td><div class="progress-bar"><div class="progress" style="width:30%"></div></div></td></tr>
    </table>
  `;
});
