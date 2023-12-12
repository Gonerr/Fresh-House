var svg = document.getElementById("Base");

function applySepiaEffect() {
    svg.classList.add("sepia-effect");
  };
  
svg.addEventListener("click", () => {
    const letter1 = document.getElementById("letter1");
    if (letter1) {
      // отражение и компенсация смещения
      letter1.setAttribute("transform", `scale(-1, 1) translate(-125 30)`);
    }
  
    const letter2 = document.getElementById("letter2");
    if (letter2) {
      letter2.setAttribute("transform", `scale(-1, 1) translate(-165 65)`);
    }
  });
  
  document.addEventListener("click", (event) => {
    const letter1 = document.getElementById("letter1");
    const letter2 = document.getElementById("letter2");
  
    if (svg.contains(event.target)) {
      // Клик внутри SVG, ничего не делаем
      return;
    }
  
    // Сброс всех изменений
    if (letter1) {
      letter1.setAttribute("transform", 'translate(45 30)');
    }
  
    if (letter2) {
      letter2.setAttribute("transform", 'translate(80 67)');
    }
  });

  var svg1 = document.getElementById("Base1");
  svg1.addEventListener("click", () => {
    const letter1 = document.getElementById("letter3");
    if (letter1) {
      // отражение и компенсация смещения
      letter1.setAttribute("transform", `scale(-1, 1) translate(-125 30)`);
    }
  
    const letter2 = document.getElementById("letter4");
    if (letter2) {
      letter2.setAttribute("transform", `scale(-1, 1) translate(-165 65)`);
    }
  });

  // var svg2 = document.getElementById("Base3");
  // svg2.addEventListener("click", () => {
  //   const letter1 = document.getElementById("letter5");
  //   if (letter1) {
  //     // отражение и компенсация смещения
  //     letter1.setAttribute("transform", `scale(-1, 1) translate(-125 30)`);
  //   }
  
  //   const letter2 = document.getElementById("letter6");
  //   if (letter2) {
  //     letter2.setAttribute("transform", `scale(-1, 1) translate(-165 65)`);
  //   }
  // });