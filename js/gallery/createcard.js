'use strict'

// import { getData } from '../utility/fetch.js'
import { createElement } from '../utility/createelement.js'

const galleryDemo = [
  { gallery_id: 1, name_value: 'PHOTO_20211013_122248', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 2, name_value: 'PHOTO_20211013_122248_NOBG', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 3, name_value: 'PHOTO_20211013_132652', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 4, name_value: 'PHOTO_20211013_132652_NOBG', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 5, name_value: 'PHOTO_20211013_134205', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 6, name_value: 'PHOTO_20211013_134205_NOBG', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 7, name_value: 'PHOTO_20211013_134812', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 8, name_value: 'PHOTO_20211013_134812_NOBG', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 9, name_value: 'PHOTO_20211013_140217', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 10, name_value: 'PHOTO_20211013_140217_NOBG', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 11, name_value: 'PHOTO_20211013_141230', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 12, name_value: 'PHOTO_20211013_141230_NOBG', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 13, name_value: 'PHOTO_20211013_142937', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 14, name_value: 'PHOTO_20211013_142937_NOBG', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 15, name_value: 'PHOTO_20211013_143947', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 16, name_value: 'PHOTO_20211013_143947_NOBG', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 17, name_value: 'PHOTO_20211126_115257', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false },
  { gallery_id: 18, name_value: 'PHOTO_20211126_131306', media_value: 'photo360', quantity: 36, date_value: '06-10-2021', time_value: '12:00:00', new: true, published: false }
]

// async function getListGallery () {
//   const pageRoot = window.location.pathname.split('/')
//   const url = '/' + pageRoot[1] + '/db'

//   const listGallery = await getData(url)

//   return listGallery.json()
// }

// function dateShort (dateRequest) {
//   const date = new Date(dateRequest)
//   return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
// }

// async function createCard (parent) {
function createCard (parent) {
  // const listGallery = await getListGallery()
  const listGallery = galleryDemo

  for (let index = 0; index < listGallery.length; index++) {
    // TODO add order css flexbox properties
    const newProperties = listGallery[index].new
    const publishedProperties = listGallery[index].published
    // const dateProperties = dateShort(listGallery[index].date_value)
    const dateProperties = listGallery[index].date_value

    console.info(newProperties, publishedProperties)

    const divAttribute = [{ name: 'data-name', value: listGallery[index].name_value },
      { name: 'data-date', value: dateProperties },
      { name: 'data-time', value: listGallery[index].time_value }]

    const anchorAttribute = [{ name: 'data-id', value: listGallery[index].gallery_id },
      { name: 'data-name', value: listGallery[index].name_value },
      { name: 'data-media', value: listGallery[index].media_value },
      { name: 'data-quantity', value: listGallery[index].quantity },
      { name: 'data-date', value: dateProperties },
      { name: 'data-time', value: listGallery[index].time_value },
      { name: 'data-new', value: listGallery[index].new },
      { name: 'data-published', value: listGallery[index].published },
      { name: 'onclick', value: 'cardModal(this.id)' }]

    const div = createElement('div', 'd' + listGallery[index].name_value, 'card', parent, divAttribute)
    const a = createElement('a', 'a' + listGallery[index].name_value, null, div, anchorAttribute)
    createElement('img', 'img' + listGallery[index].name_value, 'centeredCropped', a, [{ name: 'alt', value: listGallery[index].name_value },
      { name: 'src', value: 'img/' + listGallery[index].name_value + '_thumb.jpg' }])
  }
}

export { createCard }
