
let config = [
  { tableA: { sobres: 3, cartas:2 }, tableB: { sobres: 4, cartas: 3 } },
  { tableA: { sobres: 9, cartas: 3 }, tableB: { sobres: 3, cartas: 1 } },
  { tableA: { sobres: 2, cartas:1 }, tableB: { sobres: 7, cartas:0 } },
  { tableA: { sobres: 5, cartas: 1 }, tableB: { sobres: 3, cartas: 2 } },
];

const TA_S = `<img class="i" src="data:image/png;base64,${sobre}" data-type="sobre" data-table="one" data-status="0">`;
const TA_C = `<img class="i" src="data:image/png;base64,${carta}" data-type="carta" data-table="one" data-status="0">`;
const TB_S = `<img class="i" src="data:image/png;base64,${sobre}" data-type="sobre" data-table="two" data-status="0">`;
const TB_C = `<img class="i" src="data:image/png;base64,${carta}" data-type="carta" data-table="two" data-status="0">`;
let contentA = [];
let contentB = [];

let TA = document.getElementsByClassName("tableA")[0];
let TB = document.getElementsByClassName("tableB")[0];
situation = Math.floor(Math.random() * (config.length));
for (let i = 0; i < config[situation].tableA.cartas; i++) contentA.push(TA_S);
for (let i = 0; i < config[situation].tableA.sobres; i++) contentA.push(TA_C);
for (let i = 0; i < config[situation].tableB.cartas; i++) contentB.push(TB_S);
for (let i = 0; i < config[situation].tableB.sobres; i++) contentB.push(TB_C);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

TA.innerHTML = shuffle(contentA).join("\n");
TB.innerHTML = shuffle(contentB).join("\n");


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
  e1.classList.add("delete");
  e2.classList.add("delete");
  e1.dataset.status = "0";
  e2.dataset.status = "0";
}
