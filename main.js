function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function purge(el) {
    return "<span class = 'blue'>" + el.replace(/[AEIOUÁÉÍÓÚÄËÏÖÜaeiouáéíóúäëïöü]/g, "") + "</span>";   
}

let ans = document.getElementById("ans");
document.getElementById("mix").addEventListener("click", (e) => {
  ans.innerHTML = "";
  let txs = document
    .getElementById("tx")
    .value.split("\n")
    .map((e) => e.trim())
    .filter((e) => e.length > 0);
  txs.forEach((el) => {
    let elsOfel = el
      .split(" ")
      .map((e) => e.trim())
      .filter((e) => e.length > 0);
    let p = document.createElement("p");
    let span = document.createElement("span");
    // Aquí les cambio el orden
    let mixed = shuffle([...elsOfel]);
    // Aquí les elimino las vocales a la tercera y sexta palabra
    mixed[2] = purge(mixed[2]);
    mixed[5] = purge(mixed[5]);
    // Acá duplico la última
    mixed[10] = mixed[9];

    // Acá pongo un signo ? al final
    if (mixed[10].slice(-1)!= "?") mixed[10] += "?";
    // Acá las agrego al doc 
    span.innerHTML = mixed.join(" ");
    if (elsOfel.length != 10) {
        span.classList.add("red");
        span.innerText = el;
    }else{
        let spanOrg = document.createElement("span");
        spanOrg.innerHTML = el + "<br>";
        spanOrg.classList.add("gray");
        p.appendChild(spanOrg);
    }
    p.appendChild(span);
    ans.appendChild(p);
  });
});
