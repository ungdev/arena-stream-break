import Sketch from 'sketch-js'
import GLSL from '../assets/glsl.json'

export default (el) => {
  const gl = Sketch.create({
    container: el,
    type: Sketch.WEB_GL,
    brightness: 0.4,
    blobiness: 1.1,
    particles: 30,
    energy: 0.8,
    scanlines: false
  })

  gl.setup = function () {
    let frag = this.createShader(this.FRAGMENT_SHADER)
    let vert = this.createShader(this.VERTEX_SHADER)

    this.clearColor(0.0, 0.0, 0.0, 1.0)

    this.shaderSource(vert, GLSL.vert)
    this.shaderSource(frag, GLSL.frag)
    this.compileShader(vert)
    this.compileShader(frag)

    if (!this.getShaderParameter(vert, this.COMPILE_STATUS)) {
      throw this.getShaderInfoLog(vert)
    }

    if (!this.getShaderParameter(frag, this.COMPILE_STATUS)) {
      throw this.getShaderInfoLog(frag)
    }

    this.shaderProgram = this.createProgram()

    this.attachShader(this.shaderProgram, vert)
    this.attachShader(this.shaderProgram, frag)
    this.linkProgram(this.shaderProgram)

    if (!this.getProgramParameter(this.shaderProgram, this.LINK_STATUS)) {
      throw this.getProgramInfoLog(this.shaderProgram)
    }

    this.useProgram(this.shaderProgram)

    this.shaderProgram.attributes = {
      position: this.getAttribLocation(this.shaderProgram, 'a_position')
    }

    this.shaderProgram.uniforms = {
      resolution: this.getUniformLocation(this.shaderProgram, 'u_resolution'),
      brightness: this.getUniformLocation(this.shaderProgram, 'u_brightness'),
      blobiness : this.getUniformLocation(this.shaderProgram, 'u_blobiness'),
      particles : this.getUniformLocation(this.shaderProgram, 'u_particles'),
      scanlines : this.getUniformLocation(this.shaderProgram, 'u_scanlines'),
      energy    : this.getUniformLocation(this.shaderProgram, 'u_energy'),
      millis    : this.getUniformLocation(this.shaderProgram, 'u_millis')
    }

    this.geometry = this.createBuffer()
    this.geometry.vertexCount = 6

    this.bindBuffer(this.ARRAY_BUFFER, this.geometry)
    this.bufferData(this.ARRAY_BUFFER, new Float32Array(
      [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]
    ), this.STATIC_DRAW)

    this.enableVertexAttribArray(this.shaderProgram.attributes.position)
    this.vertexAttribPointer(this.shaderProgram.attributes.position, 2, this.FLOAT, false, 0, 0)
    return this.resize()
  }

  gl.updateUniforms = function () {
    if (!this.shaderProgram) {
      return
    }

    this.uniform2f(this.shaderProgram.uniforms.resolution, this.width, this.height)
    this.uniform1f(this.shaderProgram.uniforms.brightness, this.brightness)
    this.uniform1f(this.shaderProgram.uniforms.blobiness, this.blobiness)
    this.uniform1f(this.shaderProgram.uniforms.particles, this.particles)
    this.uniform1i(this.shaderProgram.uniforms.scanlines, this.scanlines)

    return this.uniform1f(this.shaderProgram.uniforms.energy, this.energy)
  };

  gl.draw = function () {
    this.uniform1f(this.shaderProgram.uniforms.millis, this.millis + 5000)
    this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT)
    this.bindBuffer(this.ARRAY_BUFFER, this.geometry)

    return this.drawArrays(this.TRIANGLES, 0, this.geometry.vertexCount)
  };

  gl.resize = function () {
    this.viewport(0, 0, this.width, this.height)

    return this.updateUniforms()
  }

  return gl
}

