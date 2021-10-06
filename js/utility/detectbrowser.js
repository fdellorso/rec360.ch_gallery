'use strict'

function isMobile () {
  if (navigator.userAgentData) {
    return navigator.userAgentData.mobile
  } else {
    if (navigator.maxTouchPoints) {
      return true
    } else {
      return false
    }
  }
}

function detectBrowser (log) {
  // Opera 8.0+
  const isOpera =
    (!!window.opr && !!window.opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(' OPR/') >= 0

  // Firefox 1.0+
  const isFirefox = typeof InstallTrigger !== 'undefined'

  // Safari 3.0+ "[object HTMLElementConstructor]"
  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]'
    })(
      !window.safari ||
        (typeof safari !== 'undefined' && window.safari.pushNotification)
    )

  // Internet Explorer 6-11
  const isIE = /* @cc_on!@ */ false || !!document.documentMode

  // Edge 20+
  const isEdge = !isIE && !!window.StyleMedia

  // Chrome 1 - 79
  // var isChrome =
  //   !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  const isChrome = navigator.userAgent.indexOf('Chrome') !== -1

  // Edge (based on chromium) detection
  const isEdgeChromium = isChrome && navigator.userAgent.indexOf('Edg') !== -1

  // Blink engine detection
  const isBlink = (isChrome || isOpera) && !!window.CSS

  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  // Windows Phone must come first because its UA also contains "Android"
  const isWPhone = /windows phone/i.test(userAgent)

  const isAndroid = /android/i.test(userAgent)

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  const isIos = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream

  // if (
  //   (navigator.userAgent.indexOf('Opera') ||
  //     navigator.userAgent.indexOf('OPR')) != -1
  // ) {
  //   alert('Opera');
  // } else if (navigator.userAgent.indexOf('Chrome') != -1) {
  //   alert('Chrome');
  // } else if (navigator.userAgent.indexOf('Safari') != -1) {
  //   alert('Safari');
  // } else if (navigator.userAgent.indexOf('Firefox') != -1) {
  //   alert('Firefox');
  // } else if (
  //   navigator.userAgent.indexOf('MSIE') != -1 ||
  //   !!document.documentMode == true
  // ) {
  //   //IF IE > 10
  //   alert('IE');
  // }

  if (log) {
    let output = 'Detecting browsers by ducktyping:\n'
    output += 'isFirefox: ' + isFirefox + '\n'
    output += 'isChrome: ' + isChrome + '\n'
    output += 'isSafari: ' + isSafari + '\n'
    output += 'isOpera: ' + isOpera + '\n'
    output += 'isIE: ' + isIE + '\n'
    output += 'isEdge: ' + isEdge + '\n'
    output += 'isEdgeChromium: ' + isEdgeChromium + '\n'
    output += 'isBlink: ' + isBlink + '\n'
    output += 'isWPhone: ' + isWPhone + '\n'
    output += 'isAndroid: ' + isAndroid + '\n'
    output += 'isIos: ' + isIos
    console.log(output)
  } else {
    if (isOpera) {
      return 'idOpera'
    }
    if (isFirefox) {
      return 'isFirefox'
    }
    if (isSafari) {
      return 'isSafari'
    }
    if (isIE) {
      return 'isIE'
    }
    if (isEdge) {
      return 'isEdge'
    }
    if (isChrome) {
      return 'isChrome'
    }
    if (isEdgeChromium) {
      return 'isEdgeChromium'
    }
    if (isBlink) {
      return 'isBlink'
    }
    if (isWPhone) {
      return 'isWPhone'
    }
    if (isAndroid) {
      return 'isAndroid'
    }
    if (isIos) {
      return 'isIos'
    }
  }
}

export { isMobile, detectBrowser }
