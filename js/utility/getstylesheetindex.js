'use strict'

function getStylesheetIndex (title) {
  let indexSheet = 0

  for (let index = 0; index < document.styleSheets.length - 1; index++) {
    if (document.styleSheets[index].title === title) {
      indexSheet = index
    }
  }

  return indexSheet
}

export { getStylesheetIndex }
