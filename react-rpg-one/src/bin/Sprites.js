import { Vector2 } from "./Vector2";

export class Sprite {
  constructor({
    resource, // target image
    frameSize, // cropped image size
    hFrames,
    vFrames,
    frame, // current frame shown
    scale,
    position, //
  }) {
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.buildFrameMap();
  }

  // Array.find - returns the first matching element
  // Array.filter - returns an array of all the matching elements
  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        );
        frameCount++;
      }
    }
  }

  drawImage(ctx, x, y) {
    console.log("sprite class this: ", this);

    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    // canvas context drawImage()
    ctx.drawImage(
      this.resource.image,
      frameCoordX, // position x of frame on sprite sheet
      frameCoordY, // position y of frame on sprite sheet
      this.frameSize.x, // size of sprite on the sheet
      this.frameSize.y, // size of sprite on the sheet
      x, // position on canvas
      y, // position on canvas
      this.scale, // relative scale x
      this.scale // relative scale y
    );
  }
}
