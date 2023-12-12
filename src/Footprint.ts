import { Vec2 } from './utils'
import p5 from "p5"

export type FootprintType = "rabbit" | "bear"

export default class Footprint {

  private p: p5
  readonly position: Vec2
  readonly angle: number
  public footprintType: FootprintType = "rabbit"
  private index: number

  constructor(position: Vec2, angle: number, index: number, p: p5) {
    this.p = p
    this.position = position
    this.angle = angle
    this.index = index
  }

  public draw() {
    const p = this.p
    p.push()
    p.translate(this.position.x, this.position.y)
    p.rotate(this.angle / 180 * p.PI)
    p.noStroke()
    p.fill(140, 186, 255)

    if (this.footprintType === "rabbit") {
      this.drawRabbitFootprint()
    } else {
      this.drawBearFootprint(this.index)
    }

    p.pop()
  }

  private drawRabbitFootprint() {
    const p = this.p
    p.ellipse(10, 0, 10, 25)
    p.ellipse(-10, 0, 10, 25)
    p.ellipse(0, 20, 8, 15)
    p.ellipse(0, 40, 8, 15)
  }

  private drawBearFootprint(index: number) {
    const p = this.p
    p.push()
    if (index % 2 === 0) {
      p.translate(35, 0)
    } else {
      p.translate(-35, 0)
    }
    p.ellipse(25, 3, 15, 20)
    p.ellipse(0, 0, 17, 22)
    p.ellipse(-25, 3, 15, 20)
    p.ellipse(0, 35, 40, 35)
    p.pop()
  }

}