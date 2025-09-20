// Guided Breathing Animation
const breathingDiv = document.getElementById('breathing-animation');
if (breathingDiv) {
  breathingDiv.innerHTML = `
    <div id='breath-circle' style='width:120px;height:120px;background:#2ecc71;border-radius:50%;margin:auto;transition:all 4s;display:flex;align-items:center;justify-content:center;position:relative;'>
      <span id='breath-text' style='color:#fff;font-size:1.3rem;font-weight:600;letter-spacing:1px;position:absolute;width:100%;text-align:center;'>Inhale</span>
    </div>
  `;
  let inhale = true;
  setInterval(() => {
    const circle = document.getElementById('breath-circle');
    const text = document.getElementById('breath-text');
    if (inhale) {
      circle.style.transform = 'scale(1.3)';
      text.textContent = 'Exhale';
    } else {
      circle.style.transform = 'scale(1)';
      text.textContent = 'Inhale';
    }
    inhale = !inhale;
  }, 4000);
}

// Timer Tool (Pomodoro/Meditation)
const timerTool = document.getElementById('timer-tool');
if (timerTool) {
  timerTool.innerHTML = `<input type='number' id='session-minutes' min='1' max='60' value='5'> <button id='start-session'>Start Session</button> <span id='session-timer'></span>`;
  document.getElementById('start-session').onclick = function() {
    let mins = +document.getElementById('session-minutes').value;
    let secs = mins * 60;
    const timerSpan = document.getElementById('session-timer');
    timerSpan.textContent = `${mins}:00`;
    const interval = setInterval(() => {
      secs--;
      let m = Math.floor(secs / 60);
      let s = secs % 60;
      timerSpan.textContent = `${m}:${s.toString().padStart(2,'0')}`;
      if (secs <= 0) {
        clearInterval(interval);
        timerSpan.textContent = "Session Complete!";
        // Track completed session
        let completed = +(localStorage.getItem('sessionsCompleted') || 0);
        localStorage.setItem('sessionsCompleted', completed + 1);
        document.getElementById('session-tracker').textContent = `Sessions completed: ${completed + 1}`;
      }
    }, 1000);
  };
}

// Ambient Sounds
let sound;
document.getElementById('play-sound')?.addEventListener('click', () => {
  sound = new Audio('https://www.soundjay.com/nature/sounds/rain-01.mp3');
  sound.loop = true;
  sound.play();
});
document.getElementById('stop-sound')?.addEventListener('click', () => {
  sound?.pause();
});

// Session Tracker
const tracker = document.getElementById('session-tracker');
if (tracker) {
  let completed = +(localStorage.getItem('sessionsCompleted') || 0);
  tracker.textContent = `Sessions completed: ${completed}`;
}
