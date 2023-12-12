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

function Start(event) {
    event.preventDefault();  // Отменить действие по умолчанию (переход по ссылке)

    let inputElement = document.querySelector("#InputNameForm input");
    var Name = inputElement.value;

    // Удаление пробелов и проверка на пустую строку
    if (Name.replace(/\s/g, '').length === 0) {

        inputElement.style.borderColor = "red";
        console.log("Имя не может быть пустым.");
    } else {

        inputElement.style.borderColor = "";
        console.log("Введенное имя:", Name);
        // Теперь можно перейти по ссылке, так как имя введено
        window.location.href = "levels.html";
    }
}
document.getElementById("Continue").addEventListener('click', Start);