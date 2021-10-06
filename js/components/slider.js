'use strict'

import { createElement } from '../utility/createelement.js'

function createSlider (sliderId = 'slider', sliderEvent = '', sliderUpdate = '',
  min = 0, max = 100, step = 10, value = 50,
  faicon = 'fa-circle', iconSlider = true) {
  const sliderName = sliderId.split('_')[1]
  const divSlider = createElement('div', null, 'slider', null, [
    { name: 'title', value: sliderName }
  ])

  const inputCheck = createElement('input', 'switch_' + sliderId, null, divSlider, [
    { name: 'type', value: 'checkbox' }
  ])
  const labelCheck = createElement('label', null, null, divSlider, [
    { name: 'for', value: inputCheck.id }
  ])
  const iphen = createElement('i', null, null, labelCheck)
  // iphen.classList.add(faicon)
  faicon.split(' ').map(icon => iphen.classList.add(icon))

  const div = createElement('div', null, null, divSlider)
  const span = createElement('span', null, 'spanSlider', div)
  span.innerHTML = sliderName
  const inputSlider = createElement('input', 'i_' + sliderId, 'inputSlider', div, [
    { name: 'type', value: 'range' },
    { name: 'min', value: min },
    { name: 'max', value: max },
    { name: 'step', value: step },
    { name: 'value', value: value },
    { name: 'onchange', value: sliderEvent + '(this.id)' },
    { name: 'oninput', value: sliderUpdate + '(this.id)' }
  ])
  const labelSlider = createElement('label', 'l_' + sliderId, 'labelSlider', div, [
    { name: 'for', value: inputSlider.id }
  ])
  labelSlider.innerHTML = value

  if (iconSlider) {
    span.classList.add('sliderIcon')
  } else {
    labelCheck.classList.add('sliderText')
    div.classList.add('sliderTextDiv')
  }

  return divSlider
}

export { createSlider }

// <div class="slider" title="slider">
//   <input type="checkbox" id="switchSlider">
//   <label for="switchSlider" class="">
//     <i class="fas fa-circle"></i>
//   </label>
//   <div class="">
//     <span class="spanSlider sliderIcon">slider</span>
//     <input type="range" id="slider" class="inputSlider glass" min="0" max="100" step="10" value="50" onchange="commandSlider(this.id)" oninput="updateSlider(this.id)">
//     <label for="slider" id="labelSlider" class="labelSlider">50</label>
//   </div>
// </div>
