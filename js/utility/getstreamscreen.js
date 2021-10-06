'use strict'

import { isMobile } from './detectbrowser.js'
import { isWebGLCompatible } from './webgl.js'

function getStreamScreen (streamQuality) {
  // const heightGoal = window.screen.height < window.screen.width ? window.screen.height : window.screen.width
  let heightGoal = document.body.scrollHeight < document.body.scrollWidth ? document.body.scrollHeight : document.body.scrollWidth
  let element = 0

  if (!isWebGLCompatible()) {
    return false
  }

  if (isMobile()) {
    heightGoal *= window.devicePixelRatio
  }

  for (let index = 0; index < Object.keys(streamQuality).length - 1; index++) {
    let currHeight = 0
    let nextHeight = 0

    if (isMobile()) {
      currHeight = streamQuality[Object.keys(streamQuality)[index]].height
      nextHeight = streamQuality[Object.keys(streamQuality)[index + 1]].height
    } else {
      currHeight = streamQuality[Object.keys(streamQuality)[index]].width
      nextHeight = streamQuality[Object.keys(streamQuality)[index + 1]].width
    }

    if (Math.abs(currHeight - heightGoal) < Math.abs(nextHeight - heightGoal)) {
      element = index
      break
    }

    element = index + 1
  }

  return streamQuality[Object.keys(streamQuality)[element]]
}

export { getStreamScreen }
