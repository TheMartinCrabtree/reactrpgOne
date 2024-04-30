import React from "react";
import styled from "styled-components";
// import "./App.css";

class Resources {
  constructor() {
    this.toLoad = {
      sky: "./sprites/sky.png",
      hero: "./sprites/hero-sheet.png",
      ground: "./sprites/ground.png",
      shadow: "./sprites/shadow.png",
    };
    this.images = {};
    // Load in images
    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = {
        image: img,
        isLoaded: false,
      };
      img.onload = () => (this.images[key].isLoaded = true);
    });
  }
}

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
  let assets = new Resources();
  console.log("Resources", assets);
  return (
    <MainContainer>
      <div>MainContainer Heading</div>
      <StyledCanvas></StyledCanvas>
    </MainContainer>
  );
}

export default App;
