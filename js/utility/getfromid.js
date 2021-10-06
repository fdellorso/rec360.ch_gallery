'use strict'

function getCategoryFromId (id) {
  return id.split('_')[1]
}

function getCommandFromId (id) {
  return id.split('_')[2]
}

function getCategoryFromObject (htmlObject) {
  return htmlObject.id.split('_')[1]
}

function getPropertiesFromObject (htmlObject) {
  return htmlObject.id.split('_')[2]
}

export { getCategoryFromId, getCategoryFromObject, getCommandFromId, getPropertiesFromObject }
