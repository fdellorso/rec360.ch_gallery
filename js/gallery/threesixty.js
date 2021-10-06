'use strict'

// import { JavascriptViewer } from '../vendor/JavascriptViewer.js'

function add (image360) {
  const imageParent = image360.parentElement
  const div360 = document.createElement('div')
  const idPrefix = image360.id.substr(image360.id.search(/\./) + 1)
  div360.id = 'div.' + idPrefix
  div360.appendChild(image360)
  imageParent.appendChild(div360)

  const viewer = new JavascriptViewer({
    mainHolderId: div360.id,
    mainImageId: image360.id,
    totalFrames: 72,
    speed: 70,
    zoom: 1,
    defaultProgressBar: true
  })

  viewer.events().loadImage.on((progress) => {
    // use this for your own progress bar
  })

  viewer.events().started.on((result) => {
    // use a promise or a start event to trigger things
  })

  viewer.start().then(() => {
    // use a promise or a start event to trigger things
  })
}

function remove (image360, div360) {
  const divParent = div360.parentElement
  image360.removeAttribute('style')
  divParent.appendChild(image360)
  div360.remove()
}

function gallery360 (clickedId) {
  const div360 = document.getElementById('div.' + clickedId)
  const image360 = document.getElementById('img.' + clickedId)
  const anchor360 = document.getElementById('a.' + clickedId)

  if (!div360) {
    anchor360.removeAttribute('onclick')
    add(image360)
  } else {
    remove(image360, div360)
    anchor360.setAttribute('onclick', 'galleryView(this.id)')
  }
}

function start (div360Element, img360Element) {
  const mediaQuantity = img360Element.getAttribute('data-quantity')

  console.log(img360Element.id)

  const viewer = new JavascriptViewer({
    mainHolderId: div360Element.id,
    mainImageId: img360Element.id,
    totalFrames: mediaQuantity,
    speed: 70,
    zoom: 1,
    defaultProgressBar: true
  })

  viewer.events().loadImage.on((progress) => {
    // use this for your own progress bar
  })

  viewer.events().started.on((result) => {
    // use a promise or a start event to trigger things
  })

  viewer.start().then(() => {
    // use a promise or a start event to trigger things
  })
}

window.gallery360 = gallery360

export { add, remove, start }
