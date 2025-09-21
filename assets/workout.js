// Enhanced Workout Generator with improved UX
const workouts = {
  full: [
    { name: "Jumping Jacks", duration: 30, description: "Full body cardio exercise" },
    { name: "Push-ups", duration: 45, description: "Upper body strength" },
    { name: "Squats", duration: 45, description: "Lower body strength" },
    { name: "Plank", duration: 60, description: "Core stability" },
    { name: "Mountain Climbers", duration: 30, description: "Full body cardio" }
  ],
  arms: [
    { name: "Bicep Curls", duration: 45, description: "Bicep strength" },
    { name: "Tricep Dips", duration: 45, description: "Tricep strength" },
    { name: "Push-ups", duration: 45, description: "Chest and arms" },
    { name: "Arm Circles", duration: 30, description: "Shoulder mobility" }
  ],
  legs: [
    { name: "Squats", duration: 45, description: "Quadriceps and glutes" },
    { name: "Lunges", duration: 45, description: "Leg strength and balance" },
    { name: "Calf Raises", duration: 30, description: "Calf muscles" },
    { name: "Wall Sit", duration: 60, description: "Leg endurance" }
  ],
  core: [
    { name: "Plank", duration: 60, description: "Core stability" },
    { name: "Crunches", duration: 45, description: "Abdominal strength" },
    { name: "Russian Twists", duration: 45, description: "Obliques" },
    { name: "Dead Bug", duration: 45, description: "Core coordination" }
  ]
};

const equipmentMap = {
  none: " (Bodyweight)",
  dumbbells: " (With Dumbbells)"
};

const workoutForm = document.getElementById('workout-form');
let currentWorkout = [];
let workoutInterval = null;

workoutForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const part = document.getElementById('body-part').value;
  const equip = document.getElementById('equipment').value;
  const planDiv = document.getElementById('workout-plan');
  
  // Clear any existing timer
  if (workoutInterval) {
    clearInterval(workoutInterval);
    workoutInterval = null;
  }
  
  const selected = workouts[part];
  currentWorkout = [...selected]; // Create a copy
  
  let plan = `<h3>Your ${part.charAt(0).toUpperCase() + part.slice(1)} Workout Plan${equipmentMap[equip]}</h3>`;
  plan += `<div class="workout-summary">
    <p><strong>Total Exercises:</strong> ${selected.length}</p>
    <p><strong>Estimated Time:</strong> ${Math.ceil(selected.reduce((acc, ex) => acc + ex.duration, 0) / 60)} minutes</p>
  </div>`;
  plan += `<div class="exercise-list">`;
  
  selected.forEach((ex, index) => {
    plan += `
      <div class="exercise-item" data-index="${index}">
        <div class="exercise-info">
          <h4>${ex.name}</h4>
          <p class="exercise-description">${ex.description}</p>
          <span class="exercise-duration">${ex.duration}s</span>
        </div>
        <button class="start-exercise-btn" onclick='startExerciseTimer(${index}, ${ex.duration}, this)'>
          Start ${ex.duration}s
        </button>
      </div>
    `;
  });
  
  plan += `</div>`;
  plan += `<button class="start-full-workout-btn" onclick="startFullWorkout()">Start Full Workout</button>`;
  
  planDiv.classList.remove('is-hidden');
  planDiv.innerHTML = plan;
  
  // Scroll to results
  planDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Enhanced countdown timer with animations and sound
function startExerciseTimer(exerciseIndex, seconds, btn) {
  if (workoutInterval) {
    clearInterval(workoutInterval);
  }
  
  btn.disabled = true;
  btn.classList.add('loading');
  btn.textContent = 'Starting...';
  
  const timerDiv = document.getElementById('timer');
  timerDiv.classList.remove('is-hidden');
  
  const exercise = currentWorkout[exerciseIndex];
  let timeLeft = seconds;
  
  // Add visual feedback to current exercise
  document.querySelectorAll('.exercise-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`[data-index="${exerciseIndex}"]`).classList.add('active');
  
  updateTimerDisplay(timerDiv, exercise.name, timeLeft);
  
  // Immediately update button with initial time
  btn.textContent = `${timeLeft}s remaining`;
  
  workoutInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(timerDiv, exercise.name, timeLeft);
    
    // Update button text with countdown
    btn.textContent = `${timeLeft}s remaining`;
    
    // Warning at 5 seconds
    if (timeLeft === 5) {
      timerDiv.classList.add('warning');
      playBeep('warning');
    }
    
    if (timeLeft <= 0) {
      clearInterval(workoutInterval);
      workoutInterval = null;
      
      timerDiv.innerHTML = `
        <div class="timer-complete">
          <h3>✅ ${exercise.name} Complete!</h3>
          <p>Great job! Take a short rest.</p>
        </div>
      `;
      
      timerDiv.classList.remove('warning');
      timerDiv.classList.add('complete');
      
      // Reset button
      btn.disabled = false;
      btn.classList.remove('loading', 'active');
      btn.textContent = `Restart ${seconds}s`;
      
      // Mark exercise as completed
      document.querySelector(`[data-index="${exerciseIndex}"]`).classList.add('completed');
      
      playBeep('complete');
      
      // Hide timer after 3 seconds
      setTimeout(() => {
        timerDiv.classList.add('is-hidden');
        timerDiv.classList.remove('complete');
      }, 3000);
    }
  }, 1000);
}

function updateTimerDisplay(timerDiv, exerciseName, timeLeft) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  timerDiv.innerHTML = `
    <div class="timer-display">
      <h3>${exerciseName}</h3>
      <div class="time-remaining">${timeString}</div>
      <div class="progress-ring">
        <div class="progress-fill" style="animation-duration: ${timeLeft}s"></div>
      </div>
      <button onclick="stopTimer()" class="stop-timer-btn">Stop</button>
    </div>
  `;
}

function stopTimer() {
  if (workoutInterval) {
    clearInterval(workoutInterval);
    workoutInterval = null;
  }
  
  const timerDiv = document.getElementById('timer');
  timerDiv.classList.add('is-hidden');
  timerDiv.classList.remove('warning', 'complete');
  
  // Reset all buttons
  document.querySelectorAll('.start-exercise-btn').forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('loading', 'active');
  });
  
  // Reset exercise states
  document.querySelectorAll('.exercise-item').forEach(item => {
    item.classList.remove('active');
  });
}

// Full workout functionality
function startFullWorkout() {
  if (currentWorkout.length === 0) return;
  
  let currentExerciseIndex = 0;
  const restTime = 15; // 15 seconds rest between exercises
  
  function runNextExercise() {
    if (currentExerciseIndex >= currentWorkout.length) {
      showWorkoutComplete();
      return;
    }
    
    const exercise = currentWorkout[currentExerciseIndex];
    const btn = document.querySelector(`[data-index="${currentExerciseIndex}"] .start-exercise-btn`);
    
    startExerciseTimer(currentExerciseIndex, exercise.duration, btn);
    
    // Wait for exercise to complete, then rest, then next exercise
    setTimeout(() => {
      if (currentExerciseIndex < currentWorkout.length - 1) {
        startRestPeriod(() => {
          currentExerciseIndex++;
          runNextExercise();
        });
      } else {
        setTimeout(showWorkoutComplete, 3000);
      }
    }, (exercise.duration + 3) * 1000); // Exercise time + 3 seconds for completion message
  }
  
  runNextExercise();
}

function startRestPeriod(callback) {
  const timerDiv = document.getElementById('timer');
  let restTimeLeft = 15;
  
  timerDiv.classList.remove('is-hidden', 'complete');
  
  const restInterval = setInterval(() => {
    timerDiv.innerHTML = `
      <div class="rest-display">
        <h3>🧘 Rest Time</h3>
        <div class="time-remaining">${restTimeLeft}</div>
        <p>Get ready for the next exercise!</p>
      </div>
    `;
    
    restTimeLeft--;
    
    if (restTimeLeft <= 0) {
      clearInterval(restInterval);
      callback();
    }
  }, 1000);
}

function showWorkoutComplete() {
  const timerDiv = document.getElementById('timer');
  
  timerDiv.innerHTML = `
    <div class="workout-complete">
      <h2>🎉 Workout Complete!</h2>
      <p>Congratulations! You've finished your entire workout.</p>
      <p>Remember to cool down and stay hydrated!</p>
    </div>
  `;
  
  timerDiv.classList.remove('is-hidden');
  timerDiv.classList.add('complete');
  
  playBeep('workout-complete');
  
  // Store workout completion in localStorage
  const completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '[]');
  completedWorkouts.push({
    date: new Date().toISOString(),
    type: document.getElementById('body-part').value,
    exercises: currentWorkout.length,
    duration: currentWorkout.reduce((acc, ex) => acc + ex.duration, 0)
  });
  localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));
}

// Enhanced sound system
function playBeep(type = 'default') {
  if (!('AudioContext' in window) && !('webkitAudioContext' in window)) {
    return; // No audio support
  }
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different sounds for different events
    switch (type) {
      case 'warning':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
      case 'complete':
        // Two beeps for completion
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        
        setTimeout(() => {
          const osc2 = audioContext.createOscillator();
          const gain2 = audioContext.createGain();
          osc2.connect(gain2);
          gain2.connect(audioContext.destination);
          osc2.frequency.setValueAtTime(1200, audioContext.currentTime);
          gain2.gain.setValueAtTime(0.1, audioContext.currentTime);
          osc2.start(audioContext.currentTime);
          osc2.stop(audioContext.currentTime + 0.1);
        }, 150);
        break;
      case 'workout-complete':
        // Celebration sound
        [523, 659, 784, 1047].forEach((freq, index) => {
          setTimeout(() => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.setValueAtTime(freq, audioContext.currentTime);
            gain.gain.setValueAtTime(0.1, audioContext.currentTime);
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 0.2);
          }, index * 100);
        });
        break;
    }
  } catch (error) {
    console.log('Audio not available:', error);
  }
}
