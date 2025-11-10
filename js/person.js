// class People {
//   constructor(peopleList) {
//     this.peopleList = peopleList;
//     this.imgs = Array.from(
//       document.querySelector("main[data-player]").childNodes
//     );
//     this.selectors = Array.from(
//       document.querySelector('aside[class="selectors"]').childNodes
//     );
//     this.model = {};
//   }

//   updateModel() {
//     this.model.heigth = this.imgs.at(-1);
//   }
// }

const LIMIT = 400; // límite inferior en px
const draggables = document.querySelectorAll('.selectors > div');

draggables.forEach(el => {
  let startY, startTop, dragging = false;

  el.addEventListener('mousedown', e => {
    dragging = true;
    startY = e.clientY;
    startTop = parseInt(window.getComputedStyle(el).top);
    el.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;

    const deltaY = e.clientY - startY;
    let newTop = startTop + deltaY;

    // Evitar que suba más de su posición inicial ni baje más del límite
    newTop = Math.max(startTop, Math.min(newTop, LIMIT));
    el.style.top = newTop + 'px';
  });

  window.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      el.style.cursor = 'grab';
    }
  });
});