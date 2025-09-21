// Guided Breathing Animation
const breathingDiv = document.getElementById('breathing-animation');
if (breathingDiv) {
  breathingDiv.innerHTML = `
    <div id='breath-circle' class='breath-circle'>
      <span id='breath-text' class='breath-text'>Inhale</span>
    </div>
  `;
  let inhale = true;
  setInterval(() => {
    const circle = document.getElementById('breath-circle');
    const text = document.getElementById('breath-text');
    if (inhale) {
      circle.classList.add('exhale');
      circle.classList.remove('inhale');
      text.textContent = 'Exhale';
    } else {
      circle.classList.add('inhale');
      circle.classList.remove('exhale');
      text.textContent = 'Inhale';
    }
    inhale = !inhale;
  }, 4000);
}

// Timer Tool (Pomodoro/Meditation)
const timerTool = document.getElementById('timer-tool');
let sessionInterval = null;
let isSessionActive = false;

if (timerTool) {
  timerTool.innerHTML = `
    <div id='timer-container' class='timer-container'>
      <input type='number' id='session-minutes' min='1' max='60' value='5'> 
      <div id='timer-display' class='timer-display hidden'></div>
    </div>
    <button id='start-session' class='btn'>Start Session</button> 
    <button id='stop-session' class='btn-secondary hidden'>Stop Session</button>
  `;
  
  const startBtn = document.getElementById('start-session');
  const stopBtn = document.getElementById('stop-session');
  const timerDisplay = document.getElementById('timer-display');
  const minutesInput = document.getElementById('session-minutes');
  
  startBtn.onclick = function() {
    if (isSessionActive) return;
    
    let mins = +minutesInput.value;
    let secs = mins * 60;
    isSessionActive = true;
    
    // Update UI - hide input and show timer display
    startBtn.classList.add('hidden');
    stopBtn.classList.remove('hidden');
    minutesInput.classList.add('hidden');
    timerDisplay.classList.remove('hidden');
    timerDisplay.textContent = `${mins}:00`;
    
    sessionInterval = setInterval(() => {
      secs--;
      let m = Math.floor(secs / 60);
      let s = secs % 60;
      timerDisplay.textContent = `${m}:${s.toString().padStart(2,'0')}`;
      if (secs <= 0) {
        clearInterval(sessionInterval);
        timerDisplay.textContent = "Session Complete!";
        // Track completed session
        let completed = +(localStorage.getItem('sessionsCompleted') || 0);
        localStorage.setItem('sessionsCompleted', completed + 1);
        document.getElementById('session-tracker').textContent = `Sessions completed: ${completed + 1}`;
        
        // Reset UI after 3 seconds
        setTimeout(() => {
          resetSessionUI();
        }, 3000);
      }
    }, 1000);
  };
  
  stopBtn.onclick = function() {
    if (!isSessionActive) return;
    
    // Stop the timer
    clearInterval(sessionInterval);
    timerDisplay.textContent = "Session Stopped";
    
    // Reset UI after 2 seconds
    setTimeout(() => {
      resetSessionUI();
    }, 2000);
  };
  
  function resetSessionUI() {
    isSessionActive = false;
    startBtn.classList.remove('hidden');
    stopBtn.classList.add('hidden');
    minutesInput.classList.remove('hidden');
    timerDisplay.classList.add('hidden');
  }
}

// Ambient Sounds
let sound;
const playBtn = document.getElementById('play-sound');
const stopBtn = document.getElementById('stop-sound');

playBtn?.addEventListener('click', () => {
  sound = new Audio('https://www.soundjay.com/nature/sounds/rain-01.mp3');
  sound.loop = true;
  sound.play();
  
  // Update UI - hide play button, show stop button
  const status = document.getElementById('sound-status');
  
  if (playBtn) playBtn.classList.add('hidden');
  if (stopBtn) stopBtn.classList.remove('hidden');
  if (status) {
    status.classList.add('active');
    status.textContent = 'Ambient sound is playing...';
  }
});

stopBtn?.addEventListener('click', () => {
  sound?.pause();
  sound = null; // Clear the audio object
  
  // Update UI - show play button, hide stop button
  const status = document.getElementById('sound-status');
  
  if (playBtn) playBtn.classList.remove('hidden');
  if (stopBtn) stopBtn.classList.add('hidden');
  if (status) {
    status.classList.remove('active');
    status.textContent = '';
  }
});

// Session Tracker
const tracker = document.getElementById('session-tracker');
if (tracker) {
  let completed = +(localStorage.getItem('sessionsCompleted') || 0);
  tracker.textContent = `Sessions completed: ${completed}`;
}
