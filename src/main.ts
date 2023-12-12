import p5 from 'p5'
import Footprint, { FootprintType } from './Footprint'
import { Vec2, angleBwtween, distance } from './utils'

let footprints: Footprint[] = []
const INTERVAL: number = 120
let footprintType: FootprintType = "rabbit"

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(240, 246, 255)
  }

  p.draw = () => {
    p.background(240, 246, 255, 0.01 * 255)
    drawFootprint()
  }

  p.mouseClicked = () => {
    footprintType = footprintType === "rabbit" ? "bear" : "rabbit"
  }

  const drawFootprint = () => {
    const currentPosition: Vec2 = { x: p.mouseX, y: p.mouseY }
    const previousPosition: Vec2 = footprints.length ? footprints.slice(-1)[0].position : { x: 0, y: 0 }
    if (footprints.length && distance(currentPosition, previousPosition) < INTERVAL) { return }

    const angle = -angleBwtween(currentPosition, previousPosition) - 90
    const footprint = new Footprint(currentPosition, angle, footprints.length, p)
    footprint.footprintType = footprintType
    footprint.draw()
    footprints.push(footprint)
  }
}

new p5(sketch)