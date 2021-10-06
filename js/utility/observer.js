function createObserver (target) {
  const targetNode = document.getElementById(target)
  const config = { attributes: false, childList: true, subtree: false }

  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      console.log(mutation.addedNodes)
    }
  }

  const observer = new window.MutationObserver(callback)
  observer.observe(targetNode, config)

  return observer
}

function disconnectObserver (observer) {
  observer.disconnect()
}
