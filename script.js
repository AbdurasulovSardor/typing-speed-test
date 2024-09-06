const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".mistake span")

let charIndex = mistakes = isTyping = 0
let maxTime = 60
let timeLeft = maxTime
let timer

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length)
  paragraphs[randIndex].split("").forEach(span => {
    let spanTag = `<span>${span}</span>`
    typingText.innerHTML += spanTag
  })

  document.addEventListener("keydown", () => inpField.focus())
  typingText.addEventListener("click", () => inpField.focus())
}

function initTyping() {
  const character = typingText.querySelectorAll("span")
  let typedChar = inpField.value.split("")[charIndex]
  if (!isTyping) {
    timer = setInterval(initTimer, 1000)
    isTyping = true
  }
  if (typedChar == null) {
    charIndex--
    if (character[charIndex].classList.contains("incorrect")) {
      mistakes--
    }
    character[charIndex].classList.remove("correct", "incorrect")
  } else {
    if (character[charIndex].innerHTML === typedChar) {
      character[charIndex].classList.add("correct")
    } else {
      character[charIndex].classList.add("incorrect")
    }
    charIndex++
  }

  character.forEach(span => span.classList.remove("active"))
  character[charIndex].classList.add("active")

  let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60)
  mistakeTag.innerText = mistakes
  wpmTag.innerText = wpm
  cpmTag.innerText = charIndex - mistakes
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--
    timeTag.innerText = timeLeft
  } else {
    clearInterval(timer)
  }
}

randomParagraph()
inpField.addEventListener("input", initTyping)