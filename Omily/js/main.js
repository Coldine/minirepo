function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let config2 = [{ tableA: { sobres: 1, cartas: 0 }, tableB: { sobres: 0, cartas: random(1, 3) } } ];
let config3 = [{ tableA: { sobres: 1, cartas: random(1, 4) }, tableB: { sobres: 0, cartas: random(5, 8) } } ];
let s2 = random(1, 4);
let config = [{ tableA: { sobres: s2, cartas: random(3, 4) }, tableB: { sobres: s2 + 1, cartas: random(1, 2) } } ];

const TA_S = `<img class="i" src="data:image/png;base64,${sobre}" data-type="sobre" data-table="one" data-status="0">`;
const TA_C = `<img class="i" src="data:image/png;base64,${carta}" data-type="carta" data-table="one" data-status="0">`;
const TB_S = `<img class="i" src="data:image/png;base64,${sobre}" data-type="sobre" data-table="two" data-status="0">`;
const TB_C = `<img class="i" src="data:image/png;base64,${carta}" data-type="carta" data-table="two" data-status="0">`;
let contentA = [];
let contentB = [];

let TA = document.getElementsByClassName("tableA")[0];
let TB = document.getElementsByClassName("tableB")[0];
situation = Math.floor(Math.random() * config.length);

for (let i = 0; i < config[situation].tableA.cartas; i++) contentA.push(TA_C);
for (let i = 0; i < config[situation].tableA.sobres; i++) contentA.push(TA_S);
for (let i = 0; i < config[situation].tableB.cartas; i++) contentB.push(TB_C);
for (let i = 0; i < config[situation].tableB.sobres; i++) contentB.push(TB_S);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
let Ca = shuffle(contentA).join("\n");
let Cb = shuffle(contentB).join("\n");
if (Math.random() > 0.5) {
  TB.innerHTML = Ca;
  TA.innerHTML = Cb;
} else {
  TA.innerHTML = Ca;
  TB.innerHTML = Cb;
}

/******************************************************/

let imgs = Array.from(document.getElementsByClassName("i"));

imgs.forEach((e) => e.addEventListener("click", (e) => setNewStatus(e)));

function setNewStatus(e) {
  e.preventDefault();
  let currentImg = e.target;
  imgs = Array.from(document.getElementsByClassName("i"));
  let statuses = imgs.filter((ii) => ii.dataset.status == 1);
  let imgAlreadySelected = statuses[0];
  let tableA = currentImg.dataset.table;
  let tableB = imgAlreadySelected?.dataset.table;
  let typeA = currentImg.dataset.type;
  let typeB = imgAlreadySelected?.dataset.type;

  if (statuses.length > 0) {
    if (currentImg === imgAlreadySelected) {
      currentImg.dataset.status = "0";
      return 0;
    }
    if (tableA != tableB && typeA == typeB)
      runDeleteAnimation(currentImg, imgAlreadySelected);
    // window.setTimeout(function () {
    //   runDeleteAnimation(currentImg, imgAlreadySelected);
    //   }, 800);
    if (!(tableA != tableB && typeA == typeB))
      runNoValidAnimation(currentImg, imgAlreadySelected);
  } else {
    currentImg.dataset.status = "1";
  }
  console.log({ currentImg, imgAlreadySelected });
}
function runNoValidAnimation(e1, e2) {
  e1.dataset.status = "1";
  e1.classList.add("shake");
  e2.classList.add("shake");
  window.setTimeout(function () {
    e1.dataset.status = "0";
    e2.dataset.status = "0";
    e1.classList.remove("shake");
    e2.classList.remove("shake");
  }, 500);
}
function runDeleteAnimation(e1, e2) {
  e1.dataset.status = "1";
  e2.dataset.status = "1";
  window.setTimeout(function () {
    e1.classList.add("delete");
    e2.classList.add("delete");
    e1.dataset.status = "0";
    e2.dataset.status = "0";
  }, 300);
}
/******************************************************/

document.getElementById('modelo-carta').setAttribute("src", `data:image/png;base64,${carta}`);
document.getElementById('modelo-sobre').setAttribute("src", `data:image/png;base64,${sobre}`);

const modelo = document.getElementById("modelo-carta");
const tableB = document.querySelector(".tableB");

let isTouching = false;

function crearCopia() {
  const copia = modelo.cloneNode(true);
  copia.removeAttribute("id"); // Evita duplicados de ID
  tableB.appendChild(copia);
}

// --- Soporte de mouse ---
modelo.addEventListener("dragstart", e => {
  e.dataTransfer.setData("text/plain", "modelo-carta");
});

tableB.addEventListener("dragover", e => e.preventDefault());

tableB.addEventListener("drop", e => {
  e.preventDefault();
  crearCopia();
});

// --- Soporte táctil (móviles/tablets) ---
modelo.addEventListener("touchstart", () => {
  isTouching = true;
});

modelo.addEventListener("touchend", e => {
  if (!isTouching) return;
  isTouching = false;

  const touch = e.changedTouches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  
  if (tableB.contains(target)) {
    crearCopia();
  }
});
