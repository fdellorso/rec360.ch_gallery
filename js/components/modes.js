'use strict'

import { createElement } from '../utility/createelement.js'

function createModes (modesId = 'modes', modesCategory = '', modesEvent = '',
  option = null, faicon = 'fa-circle', modesText = false, modesContrast = false) {
  const modesName = modesId.split('_')[1]
  const divModes = createElement('div', null, 'modes', null, [
    { name: 'title', value: modesName }
  ])

  if (option !== null) {
    const inputCheck = createElement('input', 'switch' + modesId, null, divModes, [
      { name: 'type', value: 'checkbox' }
    ])
    const labelCheck = createElement('label', null, null, divModes, [
      { name: 'for', value: inputCheck.id }
    ])
    const iphen = createElement('i', null, null, labelCheck)
    // iphen.classList.add(faicon)
    faicon.split(' ').map(icon => iphen.classList.add(icon))

    const div = createElement('div', null, null, divModes)
    const span = createElement('span', null, null, div)
    span.innerHTML = modesName

    for (let index = 0; index < option.length; index++) {
      const inputRadio = createElement('input', 'i_' + modesId + '_' + option[index], null, div, [
        { name: 'type', value: 'radio' },
        { name: 'name', value: modesCategory }
      ])
      const labelRadio = createElement('label', null, null, div, [
        { name: 'for', value: inputRadio.id }
      ])
      const spanRadio = createElement('span', null, null, labelRadio)
      spanRadio.innerHTML = option[index]

      if (modesContrast) {
        spanRadio.classList.add('modesContrast')
      }
    }

    if (!modesText) {
      divModes.classList.add('modesIconDiv')
      span.classList.add('modesIcon')
    }

    if (modesContrast) {
      iphen.classList.add('modesContrast')
      span.classList.add('modesContrast')
    }
  } else {
    const input = createElement('input', 'i_' + modesId, null, divModes, [
      { name: 'type', value: 'radio' },
      { name: 'name', value: modesCategory }
    ])

    const label = createElement('label', null, null, divModes, [
      { name: 'for', value: input.id }
    ])
    const iphen = createElement('i', null, null, label)
    // iphen.classList.add(faicon)
    faicon.split(' ').map(icon => iphen.classList.add(icon))
    const span = createElement('span', null, null, label)
    span.innerHTML = modesName

    if (modesText) {
      divModes.classList.add('modesTextDiv')
      iphen.classList.add('modesText')
    }

    if (modesContrast) {
      iphen.classList.add('modesContrast')
      span.classList.add('modesContrast')
    }
  }

  return divModes
}

export { createModes }

// <div class="modes" title="modes1">
//   <input type="radio" name="modes" id="switchModes1">
//   <label for="switchModes1">
//     <i class="fas fa-circle"></i>
//     <span>Modes1</span>
//   </label>
// </div>

// or

// <div class="modes" title="modes1">
//   <input type="checkbox" id="switchModes<%= subkey %>">
//   <label for="switchModes<%= subkey %>" class="">
//     <i class="<%= jsonButtonBackend[key][subkey].faicon %>"></i>
//   </label>
//   <div class="">
//     <span class="modesIcon"><%= subkey %></span>
//     .
//     .
//     .
//     <input type="radio" name="option" id="switchModesN">
//     <label for="switchModesM">
//       <span>optionN</span>
//     </label>
//     .
//     .
//     .
//   </div>
// </div>
