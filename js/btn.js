const btnPaused = document.getElementById('btn-startPaused');
const btnStop = document.getElementById('btn-stop');
const btnStart = document.getElementById('btn-startTimer');
const time = document.getElementById('time');

if (btnPaused !== null) {
  let parsePause = parseInt(localStorage.getItem('pause'));

  if (parsePause !== 0) {
    time.textContent = localStorage.getItem('pause') + ' minutes';

    btnPaused.addEventListener('click', () => {
      localStorage.setItem('isPause', 'activePause');
    });
  } else {
    time.textContent = 'No pause !';

    btnPaused.style.display = 'none';
  }
}

if (btnStart !== null) {
  let parseHour = parseInt(localStorage.getItem('hour'));
  let parseMinute = parseInt(localStorage.getItem('minute'));

  if (parseHour > 0 && parseMinute > 0) {
    time.textContent = parseHour + 'h' + parseMinute + 'min';
  } else if (parseHour === 0 && parseMinute > 0) {
    time.textContent = parseMinute + ' minutes';
  } else if (parseHour > 1 && parseMinute === 0) {
    time.textContent = parseHour + ' hours';
  } else if (parseHour === 1 && parseMinute === 0) {
    time.textContent = parseHour + ' hour';
  } else {
    time.textContent = '????';
  }

  btnStart.addEventListener('click', () => {
    localStorage.setItem('isActive', 'activeWork');
  });
}

btnStop.addEventListener('click', () => {
  localStorage.setItem('isStop', 'activeStop');
});
