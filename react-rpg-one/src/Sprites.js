class Sprite {
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
    this.frameSize = frameSize;
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position;
    this.buildFrameMap();
  }

  // Array.find - returns the first matching element
  // Array.filter - returns an array of all the matching elements
  buildFrameMap = () => {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        console.log("frame", h, v);
      }
    }
  };
}

export { Sprite };
