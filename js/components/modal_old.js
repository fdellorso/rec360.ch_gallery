'use strict'

import { loadJSON } from '../utility/loadJson.js'

function getModal (modal, backdrop, keyboard) {
  return new window.BSN.Modal(
    modal,
    {
      backdrop: backdrop,
      keyboard: keyboard
    }
  )
}

function setModalAlert (modal) {
  loadJSON('modal', function (response) {
    const modalJson = JSON.parse(response)
    const alertMode = modal.substr(0, modal.search(/\./))
    const category = modal.substr(
      modal.search(/\./) + 1,
      modal.lastIndexOf('.') - modal.search(/\./) - 1
    )
    const operation = modal.substr(modal.lastIndexOf('.') + 1)

    document.getElementById('modalAlertTitle').innerHTML =
      modalJson[alertMode][category][operation].title
    document.getElementById('modalAlertBody').innerHTML =
      modalJson[alertMode][category][operation].body
    document.getElementById('modalAlertFooter').innerHTML =
      modalJson[alertMode][category][operation].footer

    // $('#modalAlert').modal({
    //   backdrop: modalJson[alertMode][category][operation].backdrop
    // })
    const modalAlert = getModal('#modalAlert', modalJson[alertMode][category][operation].backdrop, false)

    // $('#modalAlert').modal('show')
    modalAlert.show()
  })
}

export { getModal, setModalAlert }
