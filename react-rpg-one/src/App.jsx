import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { resources } from "./Resources";

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

function App() {
  const [canDraw, setCanDraw] = useState(false);
  const canvasRef = useRef(null);

  const getResourceStatus = () => {
    console.log("updating resource status");
    let allLoaded = true;
    Object.keys(resources.images).forEach((key) => {
      if (!resources.images[key].isLoaded) {
        allLoaded = false;
      }
    });
    allLoaded && setCanDraw(true);
  };

  !canDraw && resources && resources.images && getResourceStatus();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const draw = () => {
      console.log("drawing");
      const sky = resources.images.sky;
      if (sky.isLoaded) {
        ctx.drawImage(sky.image, 0, 0);
      }
    };
    draw();
  }, []);
  console.log("canDraw", canDraw);

  return (
    <MainContainer>
      <div>MainContainer Heading</div>
      <StyledCanvas ref={canvasRef} />
    </MainContainer>
  );
}

export default App;
