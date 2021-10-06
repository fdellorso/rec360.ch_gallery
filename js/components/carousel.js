'use strict'

import { createElement } from '../utility/createelement.js'

function createCarousel (imagesArray) {
  const imagesObject = createImagesObject(imagesArray)

  const divCarousel = createElement('div', 'carousel', 'carousel')

  const divCursors = createElement('div', null, 'cursors', divCarousel)
  const divCursorLeft = createElement('div', null, 'left', divCursors)
  const divCursorRight = createElement('div', null, 'right', divCursors)

  const divImages = createElement('div', null, 'images', divCarousel)
  const divThumbnails = createElement('div', null, 'thumbnails', divCarousel)

  const inputAttribute = [
    { name: 'type', value: 'radio' },
    { name: 'name', value: 'selector' }
  ]
  const checkedAttribute = [
    { name: 'checked', value: 'checked' }
  ]

  imagesObject.forEach((image, index) => {
    createElement('img', null, 'image', divImages, [
      { name: 'alt', value: image.name },
      { name: 'src', value: image.src }
    ])

    const divThumbnail = createElement('div', null, null, divThumbnails)

    let inputAttr = inputAttribute.concat([
      { name: 'value', value: index + 1 }
    ])

    if (index === 0) {
      inputAttr = inputAttr.concat(checkedAttribute)
    }

    const input = createElement('input', null, 'selector', divThumbnail, inputAttr)
    input.addEventListener('change', event => {
      carouselSwitch(parseInt(event.target.value, 10))
      event.target.blur()
    })
    const label = createElement('label', null, null, divThumbnail, [
      { name: 'for', value: input.id }
    ])
    createElement('img', null, null, label, [
      { name: 'alt', value: image.name },
      { name: 'src', value: image.src }
    ])
  })

  document.addEventListener('keydown', carouselRoll)

  return divCarousel
}

function destroyCarousel () {
  const carousel = document.getElementById('carousel')

  carousel.parentNode.removeChild(carousel)

  document.removeEventListener('keydown', carouselRoll)
}

function createImagesObject (imagesArray) {
  const imagesObject = []

  imagesArray.forEach((element) => {
    const arrayPath = element.split('/')
    const nameValue = arrayPath[arrayPath.length - 1]

    imagesObject.push(
      {
        name: nameValue,
        src: element
      }
    )
  })

  return imagesObject
}

function imagesInfoToArray (name, folder, quantity) {
  const imagesArray = []

  // const name = imagesInfo.name
  // const folder = imagesInfo.folder
  // const quantity = imagesInfo.quantity

  for (let index = 1; index <= quantity; index++) {
    imagesArray.push(
      '/' + folder + '/' + name + '_' + index.toString().padStart(2, '0') + '.jpg'
    )
  }

  return imagesArray
}

function carouselSwitch (position) {
  const images = document.getElementsByClassName('image')
  for (const image of images) {
    const translate = (position - 1) * 100
    image.style.transform = 'translateX(-' + translate.toString() + '%)'
  }
}

function carouselRoll (event) {
  const selector = [...document.querySelectorAll('input[name="selector"]')]
  const current = selector.findIndex(selected => selected.checked)

  let selected = null

  if (event.key === 'ArrowLeft') {
    if ((current - 1) >= 0) {
      selected = selector[(current - 1) % selector.length]
      selected.checked = true
      const newEvent = new window.Event('change')
      selected.dispatchEvent(newEvent)
    }
  }

  if (event.key === 'ArrowRight') {
    if ((current + 1) < selector.length) {
      selected = selector[(current + 1) % selector.length]
      selected.checked = true
      const newEvent = new window.Event('change')
      selected.dispatchEvent(newEvent)
    }
  }
}

export { createCarousel, destroyCarousel, imagesInfoToArray }

// <div id="carousel" class="carousel">
//   <div id="cursors" class="cursors">
//     <div id="left" class="left"></div>
//     <div id="right" class="right"></div>
//   </div>
//   <div id="images" class="images">
//     <img class="image" alt="1_01.jpg" src="/1/1_01.jpg" style="transform: translateX(0%);">
//     <img class="image" alt="1_02.jpg" src="/1/1_02.jpg" style="transform: translateX(0%);">
//     <img class="image" alt="1_03.jpg" src="/1/1_03.jpg" style="transform: translateX(0%);">
//     <img class="image" alt="1_04.jpg" src="/1/1_04.jpg" style="transform: translateX(0%);">
//   </div>
//   <div id="thumbnails" class="thumbnails">
//     <div>
//       <input id="selector1" class="selector" type="radio" name="selector" value="1" checked="checked">
//       <label for="selector1">
//         <img alt="1_01.jpg" src="/1/1_01.jpg">
//       </label>
//     </div>
//     <div>
//       <input id="selector2" class="selector" type="radio" name="selector" value="2">
//       <label for="selector2">
//         <img alt="1_02.jpg" src="/1/1_02.jpg">
//       </label>
//     </div>
//     <div>
//       <input id="selector3" class="selector" type="radio" name="selector" value="3">
//       <label for="selector3">
//         <img alt="1_03.jpg" src="/1/1_03.jpg">
//       </label>
//     </div>
//     <div>
//       <input id="selector4" class="selector" type="radio" name="selector" value="4">
//       <label for="selector4">
//         <img alt="1_04.jpg" src="/1/1_04.jpg">
//       </label>
//     </div>
//   </div>
// </div>
