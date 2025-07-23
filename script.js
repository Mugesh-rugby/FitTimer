let workTime, restTime, totalRounds, currentRound = 0;
let isWork = true, timer, remainingTime = 0, paused = false;

const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');
const roundDisplay = document.querySelector('.round');
const beep = document.getElementById('beep');

function startTimer() {
  if (paused) {
    paused = false;
    countdown();
    return;
  }

  workTime = parseInt(document.getElementById('work').value);
  restTime = parseInt(document.getElementById('rest').value);
  totalRounds = parseInt(document.getElementById('rounds').value);

  if (!workTime || !restTime || !totalRounds) {
    alert('Please fill all fields!');
    return;
  }

  currentRound = 1;
  isWork = true;
  remainingTime = workTime;
  updateDisplay();
  countdown();
}

function countdown() {
  timer = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else {
      beep.play();
      if (isWork) {
        remainingTime = restTime;
        isWork = false;
        statusDisplay.textContent = '😌 Rest';
      } else {
        if (currentRound >= totalRounds) {
          clearInterval(timer);
          statusDisplay.textContent = '🎉 Workout Complete!';
          timerDisplay.textContent = '00:00';
          return;
        }
        currentRound++;
        remainingTime = workTime;
        isWork = true;
        statusDisplay.textContent = '💪 Work';
      }
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  paused = true;
  statusDisplay.textContent = '⏸️ Paused';
}

function resetTimer() {
  clearInterval(timer);
  timerDisplay.textContent = '00:00';
  statusDisplay.textContent = '⏱️ Ready';
  roundDisplay.textContent = 'Round: 0';
  paused = false;
  currentRound = 0;
}

function updateDisplay() {
  let minutes = Math.floor(remainingTime / 60);
  let seconds = remainingTime % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  statusDisplay.textContent = isWork ? '💪 Work' : '😌 Rest';
  roundDisplay.textContent = `Round: ${currentRound}`;
}
