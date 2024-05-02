import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { resources } from "./bin/Resources";
import { Sprite } from "./bin/Sprites";
import { Vector2 } from "./bin/Vector2";

const MainContainer = styled.div`
  padding: 2vh 2vw;
  overflow: hidden;
  image-rendering: pixelated;
`;
const StyledCanvas = styled.canvas`
  width: 320;
  height: 180;
  background-color: blue;
`;

const draw = (resources, ctx) => {
  console.log("drawing resources", resources);
  const heroPos = new Vector2(16 * 5, 16 * 5);
  // for initial canvas testing
  // const sky = resources.images.sky;
  // if (sky.isLoaded) {
  //   ctx.drawImage(sky.image, 0, 0);
  // }
  // need validation for loading in sprites

  /*
  const heroSprite = new Sprite({
    resource: resources.images.hero,
    frameSize: new Vector2(32, 32),
    hframes: 3,
    vframes: 8,
    frame: 1,
  });
  
  const groundSprite = new Sprite({
      resource: resources.images.ground,
      frameSize: new Vector2(320, 180),
  });
  */
  const drawImage = (sprite, x, y) => {
    // let frameCoordX = 0;
    // let frameCoordY = 0;
    // const frame = sprite.frameMap.get(this.frame);
    // if (frame) {
    //   frameCoordX = frame.x;
    //   frameCoordY = frame.y;
    // }

    ctx.drawImage(
      sprite.resource.image,
      sprite.frameCoordX ?? 0, // position x of frame on sprite sheet
      sprite.frameCoordY ?? 0, // position y of frame on sprite sheet
      sprite.frameSize.x ?? 0, // size of sprite on the sheet
      sprite.frameSize.y ?? 0, // size of sprite on the sheet
      x, // position on canvas
      y, // position on canvas
      sprite.scale, // relative scale x
      sprite.scale // relative scale y
    );
  };

  const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180),
  });
  console.log("Sprite class values: ", skySprite);
  drawImage(skySprite, 0, 0);
  // skySprite.drawImage(ctx, 0, 0);
  // groundSprite.drawImage(ctx, 0, 0);
  // heroSprite.drawImage(ctx, heroPos.x, heroPos.y);
};

function App() {
  const [canDraw, setCanDraw] = useState(false);
  const [ctx, setCtx] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    setCtx(canvas.getContext("2d"));
    const checkIsLoaded = () => {
      let counter = 0;

      const getResourceStatus = () => {
        console.log("getting resource status");
        let allLoaded = true;
        Object.keys(resources.images).forEach((key) => {
          if (!resources.images[key].isLoaded) {
            allLoaded = false;
          }
        });
        return allLoaded;
      };

      var interval = setInterval(function () {
        counter++;
        console.log("hit interval function", counter);
        if (getResourceStatus()) {
          setCanDraw(true);
          clearInterval(interval);
        }
        counter > 20 && clearInterval(interval);
      }, 100);
    };

    !canDraw && checkIsLoaded();
  }, []);

  if (ctx && canDraw) {
    draw(resources, ctx);
  }

  return (
    <MainContainer>
      <div>MainContainer Heading</div>
      <StyledCanvas ref={canvasRef} />
    </MainContainer>
  );
}

export default App;
