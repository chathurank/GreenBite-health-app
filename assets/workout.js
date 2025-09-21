// Workout Generator
const workouts = {
  full: ["Jumping Jacks", "Push-ups", "Squats", "Plank"],
  arms: ["Bicep Curls", "Tricep Dips", "Push-ups"],
  legs: ["Squats", "Lunges", "Calf Raises"],
  core: ["Plank", "Crunches", "Russian Twists"]
};
const equipmentMap = {
  none: " (Bodyweight)",
  dumbbells: " (Dumbbells)"
};
const workoutForm = document.getElementById('workout-form');
workoutForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  const part = document.getElementById('body-part').value;
  const equip = document.getElementById('equipment').value;
  const planDiv = document.getElementById('workout-plan');
  const timerDiv = document.getElementById('timer');
  const selected = workouts[part];
  let plan = `<h3>Your Workout Plan</h3>`;
  plan += `<div id="timer"></div>`;
  plan += `<ul>`;
  selected.forEach(ex => {
    plan += `<li>${ex}${equipmentMap[equip]} <button onclick='startTimer(30, this)'>Start 30s</button></li>`;
  });
  plan += `</ul>`;
  planDiv.classList.remove('is-hidden');
  planDiv.innerHTML = plan;
  // Move timer block to top and clear previous timer
  timerDiv.textContent = "";
});

// Countdown timer
function startTimer(seconds, btn) {
  btn.disabled = true;
  const timerDiv = document.getElementById('timer');
  timerDiv.classList.remove('is-hidden');
  let time = seconds;
  timerDiv.textContent = `Time left: ${time}s`;
  const interval = setInterval(() => {
    time--;
    timerDiv.textContent = `Time left: ${time}s`;
    if (time <= 0) {
      clearInterval(interval);
      timerDiv.textContent = "Done!";
      btn.disabled = false;
      // Optional: play sound
      const beep = new Audio('https://www.soundjay.com/buttons/sounds/beep-07.mp3');
      beep.play();
    }
  }, 1000);
}
