import React, { useRef, useEffect } from "react";
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
  const canvasRef = useRef(null);
  useEffect(() => {
    console.log("resources", resources);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const draw = () => {
      const sky = resources.images.sky;
      if (sky.isLoaded) {
        ctx.drawImage(sky.image, 0, 0);
      }
    };
    draw();
  }, []);

  return (
    <MainContainer>
      <div>MainContainer Heading</div>
      <StyledCanvas ref={canvasRef}></StyledCanvas>
    </MainContainer>
  );
}

export default App;
