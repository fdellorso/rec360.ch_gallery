'use strict'

function testFragmentPrecision (gl, precision) {
  const fragmentSource = 'precision ' + precision + ' float;\nvoid main(){}'
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

  gl.shaderSource(fragmentShader, fragmentSource)
  gl.compileShader(fragmentShader)

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    return false
  }

  return true
}

function isWebGLCompatible () {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl')

  if (gl && gl instanceof window.WebGLRenderingContext) {
    if (testFragmentPrecision(gl, 'highp')) {
      return true
    }
  }

  return false
}

export { isWebGLCompatible }
