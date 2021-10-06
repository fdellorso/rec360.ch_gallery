'use strict'

import { createElement } from '../utility/createelement.js'

function createSwitch (switchId = 'switch', switchClass = '', switchEvent = '',
  faicon = 'fa-circle', compact = false) {
  const switchName = switchId.split('_')[1]
  const divSwitch = createElement('div', null, 'switch', null, [
    { name: 'title', value: switchName }
  ])

  const input = createElement('input', 'i_' + switchId, switchClass, divSwitch, [
    { name: 'type', value: 'checkbox' },
    { name: 'onchange', value: switchEvent + '(this.id)' }
  ])

  const label = createElement('label', null, null, divSwitch, [
    { name: 'for', value: input.id }
  ])

  const iphen = createElement('i', null, null, label)
  // iphen.classList.add(faicon)
  faicon.split(' ').map(icon => iphen.classList.add(icon))
  const span = createElement('span', null, null, label)
  span.innerHTML = switchName
  if (compact) {
    span.classList.add('switchCompact')
  }

  return divSwitch
}

export { createSwitch }

// <div class="switch" title="switch">
//   <input type="checkbox" class="" id="switch">
//   <label for="switch">
//       <i class="fas fa-circle"></i>
//       <span>Switch</span>
//   </label>
// </div>
