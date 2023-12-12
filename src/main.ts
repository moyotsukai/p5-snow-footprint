import p5 from 'p5'
import Footprint, { FootprintType } from './Footprint'
import { Vec2, angleBwtween, distance } from './utils'
import { fs, vs } from './shader'

let footprints: Footprint[] = []
const INTERVAL: number = 120
let footprintType: FootprintType = "rabbit"
let shader: p5.Shader | null = null

const sketch = (p: p5) => {

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
    shader = p.createShader(vs, fs)
    p.background(240, 246, 255)
  }

  p.draw = () => {
    drawFootprint()

    p.noStroke()
    p.fill(240, 246, 255)
  }

  p.mouseClicked = () => {
    footprintType = footprintType === "rabbit" ? "bear" : "rabbit"
  }

  const drawFootprint = () => {
    if (!shader) { return }
    const currentPosition: Vec2 = { x: p.mouseX - p.width / 2, y: p.mouseY - p.height / 2 }
    const previousPosition: Vec2 = footprints.length ? footprints.slice(-1)[0].position : { x: 0, y: 0 }
    if (footprints.length && distance(currentPosition, previousPosition) < INTERVAL) { return }

    const angle = -angleBwtween(currentPosition, previousPosition) - 90
    const footprint = new Footprint(currentPosition, angle, footprints.length, p)
    footprint.footprintType = footprintType

    shader.setUniform('u_resolution', [p.width * p.displayDensity(), p.height * p.displayDensity()]);

    p.shader(shader)
    footprint.draw()
    footprints.push(footprint)
    p.resetShader()
  }

}

new p5(sketch)