/*
 * Starter file
 */
(function () {
  'use strict'

  /**
   * The starting point in our program, setting up a listener
   * for the "load" event on the window, signalling the HTML DOM has been constructed
   * on the page. When this event occurs, the attached function (init) will be called.
   */
  window.addEventListener('load', init)

  /**
   * TODO: Write a function comment using JSDoc.
   */
  function init () {
    // Note: In this function, we usually want to set up our event handlers
    // for UI elements on the page.
    const encryptItButton = document.getElementById('encrypt-it')
    encryptItButton.addEventListener('click', encryptItButtonClick)

    const resetButton = document.getElementById('reset')
    resetButton.addEventListener('click', resetButtonClick)

    const fontSizeButtons = document.getElementsByName('text-size')
    fontSizeButtons[0].addEventListener('change', changeFontSize)
    fontSizeButtons[1].addEventListener('change', changeFontSize)

    const allCapsButton = document.getElementById('all-caps')
    allCapsButton.addEventListener('change', allCapsChange)
  }

  // Add any other functions in this area (you should not implement your
  // entire program in the init function, for similar reasons that
  // you shouldn't write an entire Java program in the main method).
  /**
 * Returns an encrypted version of the given text, where
 * each letter is shifted alphabetically ahead by 1 letter,
 * and 'z' is shifted to 'a' (creating an alphabetical cycle).
 */
  function encryptItButtonClick () {
    const inputTxt = document.getElementById('input-text')
    const outputTxt = document.getElementById('result')
    const cipherTypeSelect = document.getElementById('cipher-type')

    if (cipherTypeSelect.value === 'shift') {
      const editedTxt = shiftCipher(inputTxt.value)
      outputTxt.textContent = editedTxt
    } else if (cipherTypeSelect.value === 'decode') {
      const editedTxt = reverseShiftCipher(inputTxt.value)
      outputTxt.textContent = editedTxt
    }
  }

  function resetButtonClick () {
    const inputTxt = document.getElementById('input-text')
    const outputTxt = document.getElementById('result')
    inputTxt.value = ''
    outputTxt.textContent = ''
  }

  function changeFontSize (event) {
    const outputTxt = document.getElementById('result')
    if (event.target.value === '12pt') {
      outputTxt.style.fontSize = '1em'
    } else if (event.target.value === '24pt') {
      outputTxt.style.fontSize = '2em'
    }
  }

  function allCapsChange (event) {
    const outputTxt = document.getElementById('result')
    if (event.target.checked) {
      outputTxt.style.textTransform = 'uppercase'
    } else {
      outputTxt.style.textTransform = 'lowercase'
    }
  }

  function shiftCipher (text) {
    text = text.toLowerCase()
    let result = ''
    for (let i = 0; i < text.length; i++) {
      if (text[i] < 'a' || text[i] > 'z') {
        result += text[i]
      } else if (text[i] === 'z') {
        result += 'a'
      } else { // letter is between 'a' and 'y'
        const letter = text.charCodeAt(i)
        const resultLetter = String.fromCharCode(letter + 1)
        result += resultLetter
      }
    }
    return result
  }

  function reverseShiftCipher (text) {
    text = text.toLowerCase()
    let result = ''
    for (let i = 0; i < text.length; i++) {
      if (text[i] < 'a' || text[i] > 'z') {
        result += text[i]
      } else if (text[i] === 'a') {
        result += 'z'
      } else { // letter is between 'b' and 'z'
        const letter = text.charCodeAt(i)
        const resultLetter = String.fromCharCode(letter - 1)
        result += resultLetter
      }
    }
    return result
  }
})()
