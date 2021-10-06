'use strict'

import { createElement } from '../utility/createelement.js'

function createForm (formId = 'form', formEvent = '', placeholder = '',
  faicon = 'fa-circle', staticForm = true) {
  const formName = formId.split('_')[1]
  const divForm = createElement('div', null, 'form', null, [
    { name: 'title', value: formName }
  ])

  const inputCheck = createElement('input', 'switch_' + formId, null, divForm, [
    { name: 'type', value: 'checkbox' }
  ])
  const labelCheck = createElement('label', null, null, divForm, [
    { name: 'for', value: inputCheck.id }
  ])
  const iphen = createElement('i', null, null, labelCheck)
  // iphen.classList.add(faicon)
  faicon.split(' ').map(icon => iphen.classList.add(icon))

  const div = createElement('div', null, null, divForm)
  const span = createElement('span', null, 'spanForm', div)
  span.innerHTML = formName
  createElement('input', 'i_' + formId, null, div, [
    { name: 'type', value: 'text' },
    { name: 'placeholder', value: placeholder }
  ])
  const buttonElement = createElement('button', 'button_' + formId, null, div, [
    { name: 'type', value: 'button' },
    { name: 'onclick', value: formEvent + '(this.id)' }
  ])
  buttonElement.innerHTML = 'Send'

  if (staticForm) {
    labelCheck.classList.add('formText')
    div.classList.add('formTextDiv')
  }

  return divForm
}

export { createForm }

// <div class="form" title="form">
//   <input type="checkbox" id="switch">
//   <label for="switch" class="formStaticLabel">
//     <i class="fas fa-circle"></i>
//   </label>
//   <div class="formStaticDiv">
//     <span class="spanForm">form</span>
//     <input type="text" id="form" placeholder="form">
//     <button type="button" id="buttonForm">button</button>
//   </div>
// </div>
