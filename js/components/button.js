'use strict'

import { createElement } from '../utility/createelement.js'

function createButton (buttonId = 'button', buttonEvent = '',
  faicon = 'fa-circle', button = true, compact = true) {
  const buttonName = buttonId.split('_')[1]
  const divButton = createElement('div', null, 'button', null, [
    { name: 'title', value: buttonName }
  ])

  const buttonElement = createElement('button', 'button_' + buttonId, null, divButton, [
    { name: 'type', value: 'button' },
    { name: 'onclick', value: buttonEvent + '(this.id)' }
  ])
  buttonElement.innerHTML = buttonName

  const label = createElement('label', null, null, divButton, [
    { name: 'for', value: buttonElement.id }
  ])

  if (button) {
    label.classList.add('buttonExtended')
  } else {
    buttonElement.classList.add('buttonText')
  }

  const iphen = createElement('i', null, null, label)
  // iphen.classList.add(faicon)
  faicon.split(' ').map(icon => iphen.classList.add(icon))
  const span = createElement('span', null, null, label)
  span.innerHTML = buttonName

  if (compact) {
    span.classList.add('buttonCompact')
  }

  return divButton
}

export { createButton }

// <div class="button" title="button">
//   <button type="button" id="button">button</button>
//   <label for="button" class="buttonExtended">
//     <i class="fas fa-circle"></i>
//     <span class="">button</span>
//   </label>
// </div>
