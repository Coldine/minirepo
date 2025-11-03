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
  }, 800);
}
function runDeleteAnimation(e1, e2) {
  e1.classList.add("delete");
  e2.classList.add("delete");
  e1.dataset.status = "0";
  e2.dataset.status = "0";
}

let config = [
  { tableA: { cartas: 6, sobres: 2 }, tableB: { cartas: 3, sobres: 4 } },
  { tableA: { cartas: 3, sobres: 3 }, tableB: { cartas: 3, sobres: 1 } },
  { tableA: { cartas: 5, sobres: 2 }, tableB: { cartas: 7, sobres: 2 } },
  { tableA: { cartas: 4, sobres: 2 }, tableB: { cartas: 1, sobres: 2 } },
];

const TA_S = `<img class="i" src="img/sobre.png" data-type="sobre" data-table="one" data-status="0">`;
const TA_C = `<img class="i" src="img/carta.png" data-type="carta" data-table="one" data-status="0">`;
const TB_S = `<img class="i" src="img/sobre.png" data-type="sobre" data-table="two" data-status="0">`;
const TB_C = `<img class="i" src="img/carta.png" data-type="carta" data-table="two" data-status="0">`;
let contentT = [];

let TA = document.getElementsByClassName("tableA");
let TB = document.getElementsByClassName("tableB");
// for (const key in config[0]) {
//     const types = config[0][key];
//     console.log(types);
    
// }
