const p = ["maça", "banana","morango"];
const PalavraSecreta = p[Math.floor(Math.random() * p.length)];
const LetrasErradas = [];
const LetrasCorretas = [];

document.addEventListener("keydown", (evento) => {
    const codigo = evento.keyCode; // 65 - 90 (intervalo)
    if (isLetra(codigo)) {
      const letra = evento.key;
      if (LetrasErradas.includes(letra)) {
        mostrarAvisoLetraRepetida();
      } else {
        if (PalavraSecreta.includes(letra)) {
          LetrasCorretas.push(letra);
        } else {
          LetrasErradas.push(letra);
        }
      }
      atualizarJogo();
    }
  });

  function atualizarJogo(){
    mostrarLetrasErradas();
    mostrarLetrasCertas();
    desenharForca();
    checarJogo();
  }

  function mostrarLetrasErradas() {
    const div = document.querySelector(".letras-erradas-container");
    div.innerHTML = "<h3>Letras erradas</h3>";
    LetrasErradas.forEach((letra) => {
        div.innerHTML += `<span>${letra}</span>`;
      });
  }

  function mostrarLetrasCertas() {
    const container = document.querySelector(".palavra-secreta-container");
    container.innerHTML = "";
    PalavraSecreta.split("").forEach((letra) => {
      if (LetrasCorretas.includes(letra)) {
        container.innerHTML += `<span>${letra}</span>`;
      } else {
        container.innerHTML += `<span>_</span>`;
      }
    });
  }

  function checarJogo(){
    let mensagem = "";
    const container = document.querySelector(".palavra-secreta-container");
    const partesCorpo = document.querySelectorAll(".forca-parte");

    if (LetrasErradas.length === partesCorpo.length){
        mensagem = "fim de jogo, perdeu otário";
    }

    if (PalavraSecreta === container.innerText){
        mensagem = "ganhou";
    }

    if (mensagem) {
        document.querySelector("#mensagem").innerHTML = mensagem;
        document.querySelector(".popup-container").style.display = "flex";
    }
  }

  function desenharForca() {
    const partesCorpo = document.querySelectorAll(".forca-parte");
    for (let i = 0; i < LetrasErradas.length; i++) {
      partesCorpo[i].style.display = "block";
    }
  }

  function mostrarAvisoLetraRepetida(){
    const aviso = document.querySelector(".aviso-palavra-repetida");
    aviso.classList.add("show");
    setTimeout(() => {
        aviso.classList.remove("show");
      }, 1000);
  }

  function isLetra(codigo) {
    return codigo >= 65 && codigo <= 90;
  }

  function ReiniciarJogo() {
    window.location.reload();
  }