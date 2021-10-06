'use strict'

import { createModal } from '../components/modal.js'

import './action.js'

import { createCard } from './createcard.js'
// import * as threesixty from './threesixty.js'
// import { getModal } from '../components/modal.js'
// import '../vendor/hammer.js'

window.addEventListener('DOMContentLoaded', function (event) {
  document.body.appendChild(createModal())
  // const cards = document.getElementsByClassName('cards')
  // for (const card of cards) {
  //   const mc = new Hammer(card)

  //   // listen to events...
  //   mc.on('tap', function (ev) {
  //     window.alert(ev.target.id)
  //   })
  // }

  const cards = document.getElementById('cards')
  createCard(cards)
})

window.addEventListener('load', function (event) {
  // const modalGallery = getModal('#modalGallery', 'static', true)
  // const modalGallery = document.getElementById('modalGallery')
  // modalGallery.addEventListener('hidden.bs.modal', function (event) {
  //   const video = document.getElementById('vid.modalGallery')
  //   video.pause()
  //   video.currentTime = 0

  //   const div360 = document.getElementById('div.modalGallery')
  //   if (div360) {
  //     const image360 = document.getElementById('img.modalGallery')
  //     threesixty.remove(image360, div360)
  //   }
  // }, false)
})

window.addEventListener('beforeunload', function (event) {
})

// window.addEventListener('unload', function (event) {
// })
