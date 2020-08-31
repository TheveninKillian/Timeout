const htmlBody = document.body
const inputHour = document.getElementById('hour')
const inputMinute = document.getElementById('minute')
const inputPause = document.getElementById('pause')
const tips = document.getElementById('tips')

inputHour.value = localStorage.getItem('hour')
inputMinute.value = localStorage.getItem('minute')
inputPause.value = localStorage.getItem('pause')

inputHour.addEventListener('input', (e) => {
  addValue(e, 0, 24, 'hour', 0)
})

inputMinute.addEventListener('input', (e) => {
  addValue(e, 0, 59, 'minute', 25)
})

inputPause.addEventListener('input', (e) => {
  addValue(e, 0, 2880, 'pause', 5)
})

focusEvent(inputHour, `Définir l'heure du timer avec un nombre compris entre 0 et 24`, 0)
focusEvent(inputMinute, `Définir les minutes du timer avec un nombre compris entre 0 et 59`, 25)
focusEvent(inputPause, `Définir le temps de pause avec un nombre (en minutes) compris entre 0 et 2880. Si valeur = 0, arrête le timer automatiquement`, 5)

function addValue(e, min, max, time, defaut) {

  if (e.target.value >= min && e.target.value <= max && e.target.value !== '') {
    localStorage.setItem(time, e.target.value)
    localStorage.setItem('change', true)
  }

  e.target.addEventListener('blur', () => {
    if (e.target.value === '') {
      localStorage.setItem(time, defaut)
      localStorage.setItem('change', true)
      e.target.value = defaut
    }
  })

}

function focusEvent(input, text, defaut) {

  input.addEventListener('focusin', () => {
    tips.innerHTML = text
  })

  input.addEventListener('focusout', () => {
    tips.innerHTML = ''

    if (input === inputHour) {
      if (input.value > 24) {
        input.value = defaut
        tips.innerHTML = 'error'
        localStorage.setItem('hour', defaut)
      }
    }

    if (input === inputMinute) {
      if (input.value > 59) {
        input.value = defaut
        tips.innerHTML = 'error'
        localStorage.setItem('minute', defaut)
      }
    }

    if (input === inputPause) {
      if (input.value > 2880) {
        input.value = defaut
        tips.innerHTML = 'error'
        localStorage.setItem('pause', defaut)
      }
    }

  })

}