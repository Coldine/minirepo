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
  TA.innerHTML = Ca;
  TB.innerHTML = Cb;
  if (Math.random() > 0.5) {
    let table1 = TA.getAttribute("class");
    let table2 = TB.getAttribute("class");
    TA.setAttribute("class", table2);
    TB.setAttribute("class", table1);
    let iTA = TA.innerHTML;
    let iTB = TB.innerHTML;
    TA.innerHTML = iTB; 
    TB.innerHTML = iTA; 
  }
  /******************************************************/

let imgs = Array.from(document.getElementsByClassName("i"));
// console.log(imgs);
const handleImgClick = (ev) => setNewStatus(ev);

imgs.forEach((img) => img.addEventListener("click", handleImgClick));

let temporal; 
function setNewStatus(e) {
  e.preventDefault();
  let currentImg = e.target;
  imgs = Array.from(document.getElementsByClassName("i"));
  currentImg.addEventListener('animationend', e => {
    if (e.animationName === 'small-transparent') {
      currentImg.style.display = 'none';
    }
  });
//  console.log({currentImg});

  let statuses = imgs.filter((ii) => ii.dataset.status == 1);
  // console.log({statuses});
  
  let imgAlreadySelected = statuses[0] ?? null;
  // console.log({imgAlreadySelected});
  let tableA = currentImg.dataset.table;
  let typeA = currentImg.dataset.type;
  let tableB = imgAlreadySelected?.dataset.table;
  let typeB = imgAlreadySelected?.dataset.type;
  // console.log({tableA,tableB, typeA, typeB, s: statuses.length});
  
  if (statuses.length > 0) {
    if (currentImg === imgAlreadySelected) {
      currentImg.dataset.status = "0";
      currentImg = null;
      imgAlreadySelected = null;
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
  temporal = { currentImg, imgAlreadySelected };
  // console.log(temporal);
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


const modelos = document.querySelector(".adder").childNodes;
const zonas = document.querySelectorAll("[name='table']");
let flotante = null;
let isTouching = false;

let lastAdded = null;
// Clona el elemento y lo inserta en la zona
function crearCopia(modelo, zona) {
  const copia = modelo.cloneNode(true);
  copia.removeAttribute('id');
  zona.appendChild(copia);
  let _table = (zona.classList.contains("tableA"))?"one":"two";
  copia.classList.add("i");
  copia.dataset.table = _table;
  Array.from(document.getElementsByClassName("i")).forEach((img) => {
    img.removeEventListener("click", handleImgClick);
    img.addEventListener("click", handleImgClick);
  });
  if (lastAdded) {
    let tableA = copia.dataset.table;
    let typeA = copia.dataset.type;
    let tableB = lastAdded?.dataset.table;
    let typeB = lastAdded?.dataset.type;    
    if (!(tableA != tableB && typeA == typeB)) {
      removeLastAdded(copia);
    }else{
      lastAdded = null;
    }
  }else{
    lastAdded = copia; 
  }

}
function removeLastAdded(copia) {
  lastAdded?.remove();
  lastAdded = null;
  copia.remove();
}

// --- Soporte mouse ---
modelos.forEach(modelo => {
  modelo.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', modelo.id);
    modelo.classList.add('flotando');
  });

  modelo.addEventListener('dragend', e => {
    modelo.classList.remove('flotando');
  });
});

zonas.forEach(zona => {
  zona.addEventListener('dragover', e => e.preventDefault());
  zona.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const modelo = document.getElementById(id);
    crearCopia(modelo, zona);
  });
});

// --- Soporte táctil ---
modelos.forEach(modelo => {
  modelo.addEventListener('touchstart', e => {
    isTouching = true;
    const touch = e.touches[0];
    flotante = modelo.cloneNode(true);
    flotante.removeAttribute('id');
    flotante.classList.add('flotando');
    flotante.style.left = touch.pageX + 'px';
    flotante.style.top = touch.pageY + 'px';
    flotante.style.width = modelo.width + 'px';
    flotante.style.height = modelo.height + 'px';
    document.querySelector(".adder").appendChild(flotante);
  });

  modelo.addEventListener('touchmove', e => {
    if (!flotante) return;
    const touch = e.touches[0];
    flotante.style.left = touch.pageX + 'px';
    flotante.style.top = touch.pageY + 'px';
  });

  modelo.addEventListener('touchend', e => {
    if (!isTouching) return;
    isTouching = false;

    const touch = e.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    zonas.forEach(zona => {
      if (zona.contains(target)) {
        crearCopia(modelo, zona);
      }
    });

    flotante?.remove();
    flotante = null;
  });
});
