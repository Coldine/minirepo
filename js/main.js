let player = document.querySelector("main[data-player]");
let selectors = document.querySelector('aside[class="selectors"]');
let imgIdex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
let imgList = (()=>{
  for (let i = imgIdex.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imgIdex[i], imgIdex[j]] = [imgIdex[j], imgIdex[i]];
  }
  return imgIdex;
})();

let numOfEls = 11 - Math.floor(Math.random() * 4);

for (let i = 0; i < numOfEls; i++) {
  let img = document.createElement("img");
  img.setAttribute("src", `img/${imgList[i]}.png`);
  img.setAttribute("draggable", `false`);
  player.appendChild(img);
  
  let span = document.createElement("span");
  span.setAttribute("draggable", `false`);
  span.classList.add("label");
  // span.innerText="180.5";
  
  let div = document.createElement("div");
  div.setAttribute("draggable", `false`);
  div.setAttribute("data-related", `img/${imgList[i]}.png`);
  selectors.appendChild(div);
  
  div.appendChild(span);
}
