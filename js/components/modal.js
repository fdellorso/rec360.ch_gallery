'use strict'

import { createElement } from '../utility/createelement.js'

function createModal () {
  const divModal = createElement('div', 'modal', 'modal')
  divModal.classList.add('modalNone')

  const input = createElement('input', 'modalSwitch', 'modalSwitch', divModal, [
    { name: 'type', value: 'checkbox' }
  ])
  input.addEventListener('change', (event) => {
    const body = document.body
    const modal = document.getElementById('modal')
    const modalContent = document.getElementById('modalContent')

    if (event.target.checked) {
      body.classList.add('modalOpen')
      modal.classList.remove('modalNone')
      modalContent.classList.add('modalOpenContent')
      document.addEventListener('keydown', keyCloseModal)
    } else {
      body.classList.remove('modalOpen')
      modal.classList.add('modalNone')
      modalContent.classList.remove('modalOpenContent')
      emptyModal()
      document.removeEventListener('keydown', keyCloseModal)
    }
  })
  const label = createElement('label', null, null, divModal, [
    { name: 'for', value: input.id }
  ])
  label.innerHTML = input.id

  const divModalContent = createElement('div', 'modalContent', 'modalContent', divModal)
  createElement('div', 'modalHeader', 'modalHeader', divModalContent)
  createElement('div', 'modalBody', 'modalBody', divModalContent)
  createElement('div', 'modalFooter', 'modalFooter', divModalContent)

  return divModal
}

function fillModal (bodyElement, headerElement = null, footerElement = null) {
  const modalContent = document.getElementById('modalContent')
  const modalHeader = document.getElementById('modalHeader')
  const modalBody = document.getElementById('modalBody')
  const modalFooter = document.getElementById('modalFooter')

  if (headerElement !== null) {
    modalContent.classList.add('modalContentBackground')
    modalHeader.classList.remove('modalNoneHdFt')
    modalHeader.appendChild(headerElement)
  } else {
    modalHeader.classList.add('modalNoneHdFt')
  }

  modalBody.appendChild(bodyElement)

  if (footerElement !== null) {
    modalFooter.classList.remove('modalNoneHdFt')
    modalFooter.appendChild(footerElement)
  } else {
    modalFooter.classList.add('modalNoneHdFt')
  }
}

function showModal (state) {
  const modalSwitch = document.getElementById('modalSwitch')

  modalSwitch.checked = state
  const event = new window.Event('change')
  modalSwitch.dispatchEvent(event)
}

// TODO receive function to extra empty istruction
function emptyModal () {
  const modalHeader = document.getElementById('modalHeader')
  const modalBody = document.getElementById('modalBody')
  const modalFooter = document.getElementById('modalFooter')

  while (modalHeader.hasChildNodes()) {
    modalHeader.removeChild(modalHeader.lastChild)
  }

  while (modalBody.hasChildNodes()) {
    modalBody.removeChild(modalBody.lastChild)
  }

  while (modalHeader.hasChildNodes()) {
    modalFooter.removeChild(modalFooter.lastChild)
  }
}

function keyCloseModal (event) {
  if (event.key === 'Escape') {
    showModal(false)
  }
}

export { createModal, fillModal, showModal }

// <div id="modal" class="modal">
//   <input id="modalSwitch" class="modalSwitch" type="checkbox">
//   <label for="modalSwitch">modalSwitch</label>
//   <div id="modalContent" class="modalContent">
//     <div id="modalHeader" class="modalHeader modalNone"></div>
//     <div id="modalBody" class="modalBody"></div>
//     <div id="modalFooter" class="modalFooter modalNone"></div>
//   </div>
// </div>
