const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const mistakeTag = document.querySelector(".mistake span")

let charIndex = mistakes = 0

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

  mistakeTag.innerText = mistakes
}

randomParagraph()
inpField.addEventListener("input", initTyping)