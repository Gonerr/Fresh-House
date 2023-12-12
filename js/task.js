var length;
var mechanized = false;

// function pic(a) {
//     document.write("<img src='./images/"+a+"' />") ; 
// }

function SetLength() {
    // let w = document.getElementById("length").value;
    length = parseFloat(document.getElementById("length").value);
}


Mechanical.onclick = function SetMechanical() {
    mechanized = document.getElementById("Mechanical").checked;
}


function calc(){
    SetLength();

    if (length <=0 || isNaN(length)) {
        alert("Пожалуйста, введите корректную длину канавы.");
        return;
    }
    // Если механизирована - каждый работник копает по 4м, если нет - по 3м
    Workers = mechanized ? Math.ceil(length / 4) : Math.ceil(length / 3);
    const resultContainer = document.getElementById("result");

    var question = confirm("Показать ответ?");
    if (question) {
        resultContainer.innerHTML = 
        `<p>Длина канавы: ${length} метров</p>
        <p>Тип бригады: ${mechanized ? "механизированная" : "немеханизированная"}</p>
        <p>Необходимое количество землекопов: ${Workers}</p>
        <img src='./images/землекоп1.png' />`; }
    else {
        resultContainer.innerHTML = 
        `<p>Бригада в отпуске</p>
        <img src='./images/землекоп3.png' />`;
    }
}
