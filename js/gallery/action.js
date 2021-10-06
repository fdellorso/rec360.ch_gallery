'use strict'

import { fillModal, showModal } from '../components/modal.js'
import { createCarousel, destroyCarousel, imagesInfoToArray } from '../components/carousel.js'
import * as threesixty from './threesixty.js'
import { getModal } from '../components/modal_old.js'

import { getData, deleteData } from '../utility/fetch.js'
import { createElement } from '../utility/createelement.js'
import { detectBrowser } from '../utility/detectbrowser.js'

// <img id="jsv-image" alt="example" src="https://360-javascriptviewer.com/images/ipod/ipod.jpg">

function cardModal (clickedId) {
  let mediaModal = null

  const anchorElement = document.getElementById(clickedId)
  const mediaId = anchorElement.getAttribute('data-name')
  const mediaType = anchorElement.getAttribute('data-media')
  const mediaQuantity = anchorElement.getAttribute('data-quantity')

  // TODO switch to carousel when implemented
  if (mediaType === 'photo') {
    if (mediaQuantity > 1) {
      const imageArray = imagesInfoToArray(mediaId, 'gallery/img/' + mediaId, mediaQuantity)
      mediaModal = createCarousel(imageArray)
    } else {
      mediaModal = createElement('img', null, 'centeredCropped', null, [
        { name: 'alt', value: mediaId },
        { name: 'src', value: 'img/' + mediaId + '/' + mediaId + '_' + mediaQuantity.padStart(2, '0') + '.jpg' }
      ])
    }
    fillModal(mediaModal)
    showModal(true)
  }

  if (mediaType === 'photo360') {
    const div360Element = createElement('div', 'div360')
    const img360Element = createElement('img', 'img360', 'centeredCropped', div360Element, [
      { name: 'data-quantity', value: mediaQuantity },
      { name: 'src', value: 'img/' + mediaId + '/' + mediaId + '.jpg' }
    ])
    fillModal(div360Element)
    showModal(true)
    threesixty.start(div360Element, img360Element)
  }

  if (mediaType === 'video') {
    mediaModal = createElement('img', null, 'centeredCropped', null, [
      { name: 'src', value: '/' + mediaId + '/' + mediaId + '.jpg' }
    ])
    showModal(true)
  }
}

function galleryView (clickedId) {
  let subfolder = '/'
  const filename = clickedId.substr(
    clickedId.search(/\./) + 1,
    clickedId.lastIndexOf('_') - clickedId.search(/\./) - 1
  )

  if (window.location.pathname.split('/').length - 1 > 2) {
    subfolder =
      window.location.pathname.substr(
        window.location.pathname.lastIndexOf('/')
      ) + '/'
  }

  // const myModal = new bootstrap.Modal(document.getElementById('galleryModal'), {
  //   keyboard: true
  // })

  const modalGallery = getModal('#modalGallery', true, true)

  const myModalImage = document.getElementById('img.modalGallery')
  const myModalVideo = document.getElementById('vid.modalGallery')
  const myModalVideoSrc = document.getElementById('vidsrc.modalGallery')
  let myPhotoSrc = ''

  if (clickedId.search('photo') >= 0) {
    myPhotoSrc = subfolder + filename + '.jpg'

    myModalVideo.style.display = 'none'
    myModalImage.style.display = 'block'
    myModalImage.src = myPhotoSrc

    // myModal.show()
    modalGallery.show()
  }

  if (clickedId.search('video') >= 0) {
    const myVideoSrc = subfolder + filename + '.h264'

    myModalImage.style.display = 'none'
    myModalVideo.style.display = 'block'

    // NOTE Safari or Chrome
    if (detectBrowser(0) === 'isChrome') {
      myModalVideo.src = myVideoSrc
    }
    if (detectBrowser(0) === 'isSafari' || detectBrowser(0) === 'isIos') {
      myModalVideoSrc.src = myVideoSrc
    }

    // myModal.show()
    modalGallery.show()
  }

  if (clickedId.search('folder') >= 0) {
    window.location.href = window.location.pathname + subfolder + filename
  }

  if (clickedId.search('360') >= 0) {
    myPhotoSrc = subfolder + filename + '/' + filename + '.jpg'

    myModalVideo.style.display = 'none'
    myModalImage.style.display = 'block'
    myModalImage.src = myPhotoSrc

    threesixty.add(myModalImage)

    // myModal.show()
    modalGallery.show()
  }
}

function galleryShare (clickedId) {
  const filesForDownload = []
  let subfolder = '/'
  const filename = clickedId.substr(0, clickedId.lastIndexOf('_'))

  if (window.location.pathname.lastIndexOf('/') > 0) {
    subfolder =
      window.location.pathname.substr(
        window.location.pathname.lastIndexOf('/'),
        window.location.pathname.length -
          window.location.pathname.lastIndexOf('/')
      ) + '/'
  }

  let srcfile = subfolder + filename
  let destfile = filename

  if (subfolder.length > 1) {
    destfile = subfolder.substr(1, subfolder.length - 2) + '_' + filename
  }

  if (clickedId.search('photo') >= 0) {
    srcfile = srcfile + '.jpg'
    destfile = destfile + '.jpg'
    filesForDownload.push({ path: srcfile, name: destfile })
    downloadFile(filesForDownload)
  }

  if (clickedId.search('video') >= 0) {
    srcfile = srcfile + '.h264'
    destfile = destfile + '.h264'
    window.alert(srcfile, destfile)
    filesForDownload.push({ path: srcfile, name: destfile })
    downloadFile(filesForDownload)
  }

  if (clickedId.search('folder') >= 0) {
    //   const xhr = new XMLHttpRequest()
    //   xhr.open('post', window.location.pathname + srcfile)
    //   xhr.onreadystatechange = () => {
    //     if (xhr.readyState === 4) {
    //       const array = JSON.parse(xhr.responseText)
    //       for (let index = 0; index < array.length; index++) {
    //         const srcfilefolder =
    //           '/' + srcfile.substr(1, srcfile.length - 1) + '/' + array[index]
    //         const destfilefolder =
    //           srcfile.substr(1, srcfile.length - 1) + '_' + array[index]
    //         filesForDownload.push({ path: srcfilefolder, name: destfilefolder })
    //         // alert(srcfilefolder + ' - ' + destfilefolder);
    //       }
    //       downloadFile(filesForDownload)
    //     }
    //   }
    //   xhr.send(null)
    // }

    const url = window.location.pathname + 'download/' + srcfile

    getData(url)
      .then(data => {
        const array = JSON.parse(data)
        console.log(array)
        for (let index = 0; index < array.length; index++) {
          const srcfilefolder = '/' + srcfile.substr(1, srcfile.length - 1) + '/' + array[index]
          const destfilefolder = srcfile.substr(1, srcfile.length - 1) + '_' + array[index]
          filesForDownload.push({ path: srcfilefolder, name: destfilefolder })
        // alert(srcfilefolder + ' - ' + destfilefolder);
        }
        downloadFile(filesForDownload)
      })
  }
}

async function downloadFile (downloadArray) {
  const temporaryDownloadLink = document.createElement('a')
  temporaryDownloadLink.style.display = 'none'

  document.body.appendChild(temporaryDownloadLink)

  for (let n = 0; n < downloadArray.length; n++) {
    const download = downloadArray[n]
    temporaryDownloadLink.setAttribute('href', download.path)
    temporaryDownloadLink.setAttribute('download', download.name)

    temporaryDownloadLink.click()

    await timeout(100)
  }

  document.body.removeChild(temporaryDownloadLink)
}

function timeout (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function galleryDelete (clickedId) {
  const url = window.location.pathname + '/' + clickedId.substr(0, clickedId.lastIndexOf('_'))

  // const xhr = new XMLHttpRequest()
  // xhr.open('delete',window.location.pathname + '/' + clickedId.substr(0, clickedId.lastIndexOf('_')))
  // xhr.onreadystatechange = () => {
  //   if (this.readyState === 4) {
  //     window.location.reload()
  //   }
  // }
  // xhr.send(null)

  deleteData(url)
    .then(data => {
      window.location.reload()
    })
}

// function add360 (image360) {
//   const imageParent = image360.parentElement
//   const div360 = document.createElement('div')
//   const idPrefix = image360.id.substr(image360.id.search(/\./) + 1)
//   div360.id = 'div.' + idPrefix
//   div360.appendChild(image360)
//   imageParent.appendChild(div360)

//   const viewer = new window.JavascriptViewer({
//     mainHolderId: div360.id,
//     mainImageId: image360.id,
//     totalFrames: 72,
//     speed: 70,
//     zoom: 1,
//     defaultProgressBar: true
//   })

//   viewer.events().loadImage.on((progress) => {
//     // use this for your own progress bar
//   })

//   viewer.events().started.on((result) => {
//     // use a promise or a start event to trigger things
//   })

//   viewer.start().then(() => {
//     // use a promise or a start event to trigger things
//   })
// }

// function remove360 (image360, div360) {
//   const divParent = div360.parentElement
//   image360.removeAttribute('style')
//   divParent.appendChild(image360)
//   div360.remove()
// }

// function gallery360 (clickedId) {
//   const div360 = document.getElementById('div.' + clickedId)
//   const image360 = document.getElementById('img.' + clickedId)
//   const anchor360 = document.getElementById('a.' + clickedId)

//   if (!div360) {
//     anchor360.removeAttribute('onclick')
//     add360(image360)
//   } else {
//     remove360(image360, div360)
//     anchor360.setAttribute('onclick', 'galleryView(this.id)')
//   }
// }

// document.addEventListener('DOMContentLoaded', function (event) {
//   // Gets the video src from the data-src on each button
//   $('#modalGallery').on('hidden.bs.modal', function (event) {
//     // stop playing the youtube video when I close the modal
//     $('#vid\\.modalGallery').get(0).pause() // a poor man's stop video
//     $('#vid\\.modalGallery').get(0).currentTime = 0 // a poor man's stop video

//     const div360 = document.getElementById('div.modalGallery')
//     if (div360) {
//       const image360 = document.getElementById('img.modalGallery')
//       remove360(image360, div360)
//     }
//   })
// })

window.galleryView = galleryView
window.galleryShare = galleryShare
window.galleryDelete = galleryDelete
// window.gallery360 = gallery360

window.cardModal = cardModal
