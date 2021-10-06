'use strict'

import { getData } from './fetch.js'

function loadJSON (type, callback) {
  const page = window.location.pathname.split('/').pop()
  const pageCap = page.charAt(0).toUpperCase() + page.slice(1)
  const jsonUrl = '/json/' + type + pageCap + '.json'

  // const xhr = new XMLHttpRequest()
  // xhr.overrideMimeType('application/json');
  // xhr.open('GET', jsonUrl, true)
  // xhr.setRequestHeader('Content-Type', 'application/json')
  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
  //     // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
  //     callback(xhr.responseText)
  //   }
  // }
  // xhr.send()

  const url = jsonUrl

  getData(url)
    .then(data => {
      callback(data)
    })
}

export { loadJSON }
