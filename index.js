const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  const zeroStart = {
    0: '00',
    1: '01',
    2: '02',
    3: '03',
    4: '04',
    5: '05',
    6: '06',
    7: '07',
    8: '08',
    9: '09'
  }

  let date
  let timerId
  const setTime = () => {
    let m = zeroStart[date.getUTCMinutes()] || date.getUTCMinutes() 
    let s = zeroStart[date.getUTCSeconds()] || date.getUTCSeconds()
    let h = zeroStart[date.getUTCHours()] || date.getUTCHours()
    timerEl.innerText = `${h}:${m}:${s}`
  }

  return (seconds) => {
    clearInterval(timerId)
    date = new Date(seconds * 1000)
    
    setTime()

    timerId = setInterval(() => {
      date.setTime(date - 1000)
      setTime()
      if (date.getTime() === 0) {
        clearInterval(timerId)
      }
    }, 1000)
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  if (e.data < '0' || e.data > '9') {
    inputEl.value = inputEl.value.slice(0, -1)
  }
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
