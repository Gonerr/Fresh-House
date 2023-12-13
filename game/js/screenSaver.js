var Window = document.getElementById("query_user");

function blockLinks() {
    linksToBlock.forEach(link => {
        link.addEventListener('click', preventClick);
    });
}
function unblockLinks() {
    linksToBlock.forEach(link => {
        link.removeEventListener('click', preventClick);
    });
}

function preventClick(event) {
    event.preventDefault();
}

function InputName(){
    Window.style.display= "flex";
    // blockLinks();
}

function CloseWindow(){
    Window.style.display= "none";
    // unblockLinks();
}

document.getElementById("InputNameForm").addEventListener("submit", function(event) {
    event.preventDefault();
    Start();
  });
  
  document.getElementById("nameInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      Start();
    }
  });

function Start(event) {
    if (event) {
        event.preventDefault();
      }

      var inputElement = document.getElementById("nameInput");
      var Name = inputElement.value;
      localStorage.setItem("playerName", Name);

    if (Name.replace(/\s/g, '').length === 0) {
        inputElement.style.borderColor = "red";
        console.log("Имя не может быть пустым.");
    } else {
        inputElement.style.borderColor = "";
        console.log("Введенное имя:", Name);
        window.location.href = "levels.html";
    }
}
