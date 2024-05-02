import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { resources } from "./Resources";
import { Sprite } from "./Sprites";

const MainContainer = styled.div`
  padding: 2vh 2vw;
  overflow: hidden;
  image-rendering: pixelated;
`;
const StyledCanvas = styled.canvas`
  width: 800px;
  height: 600px;
  background-color: blue;
`;

const draw = (resources, ctx) => {
  console.log("drawing resources", resources);
  const sky = resources.images.sky;
  if (sky.isLoaded) {
    ctx.drawImage(sky.image, 0, 0);
  }
};

function App() {
  const [canDraw, setCanDraw] = useState(false);
  const [ctx, setCtx] = useState(null);
  const canvasRef = useRef(null);
  let hero = undefined;

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

  if (canDraw) {
    // need validation for loading in sprites
    hero = new Sprite({
      resource: resources.images.hero,
      hframes: 3,
      vframes: 8,
      frame: 1,
    });

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
