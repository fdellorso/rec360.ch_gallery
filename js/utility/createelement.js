'use strict'

function createElement (type, id = null, className = null, appendElement = null, attribute = null) {
  const element = document.createElement(type)

  if (id !== null) {
    element.id = id
  }

  if (className !== null) {
    element.classList.add(className)
  }

  if (attribute !== null) {
    attribute.forEach(attr => {
      element.setAttribute(attr.name, attr.value)
    })
  }

  if (appendElement !== null) {
    let append = null
    if (typeof appendElement === 'string' || appendElement instanceof String) {
      append = document.getElementById(appendElement)
    } else {
      append = appendElement
    }
    append.appendChild(element)
  }

  return element
}

export { createElement }
