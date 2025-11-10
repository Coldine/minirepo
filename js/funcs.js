let resizeTimeout;
window.onload = putSelectorsInPos();
setTimeout(putSelectorsInPos, 128);
setTimeout(putSelectorsInPos, 520);
setTimeout(putSelectorsInPos, 1040);

function putSelectorsInPos() {
  selectors.childNodes.forEach((el) => {
    let ref = player.querySelector(`img[src='${el.dataset.related}']`);
    el.style.left = `${ref.x + (ref.clientWidth/2)-(el.clientWidth/2)}px`;
    el.style.top = `${ref.y - el.clientHeight}px`;
  });
  window.onresize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(putSelectorsInPos, 130);
  };
}
(()=>{
  let img = document.createElement("img");
  img.setAttribute("src", `img/0.png`);
  img.setAttribute("id", `control`);
  img.classList.add("control");
  player.appendChild(img);
})();
// window.addEventListener("beforeunload", (event) => event.preventDefault());
