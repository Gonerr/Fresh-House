
function parseString() {
    let inputString = document.getElementById("TextArea").value;
    let words_numbers = inputString.toLowerCase().replace(' ','').split('-');

    let words = [];
    let numbers = [];
    
    for (let value of words_numbers) {
        if (isNaN(value)) {
            words.push(value.trim());
        } else if (value!=''){
            numbers.push(value.trim());
        }
    }

    // Сортировка слов по алфавиту
    words.sort();
    // Сортировка чисел по возрастанию
    numbers.sort((a, b) => a - b);

    var result = new Map();

    for (let i = 0; i < words.length; i++) {
        key = `a${i + 1}`;
        result.set(key,words[i]);
    }

    for (let i = 0; i < numbers.length; i++) {
        key = `n${i + 1}`;
        result.set(key,numbers[i]);
    }
    console.log(result);
    displayResult(result);
}

function displayResult(result) {
    var root = document.getElementById("parse_words");
    let word = document.createElement("div4");

    function removeAllChildren(element) {
        while (element.firstChild) {
            removeAllChildren(element.firstChild);
            element.removeChild(element.firstChild);
        }
    }
    removeAllChildren(root); // Удаляем все дочерние элементы в контейнере

    let count = 0;
    for (let [key, value] of result) {
        count += 1; //для того чтобы выводить слова
    
        word[count] = document.createElement("div");
        word[count].className = "word";
        
        word[count].setAttribute("draggable", "true");
        word[count].ondragstart = dragStart;
    
        //создание индекса
        word[count].id = key;
    
        let text = document.createElement('p3');
        text.innerHTML = key + ' ' + value;
    
        word[count].appendChild(text);
    
        root.appendChild(word[count]);
    }
}

//для элементов, которые будут перетаскиваться
function dragStart(event) {
    event.dataTransfer.setData("id", event.target.id);
}

// Разрешаем перетаскивание при наведении
function dragOver(event) {
    event.preventDefault();
}

function dragDrop(event) {
    var data = event.dataTransfer.getData('id');
    var Element = document.getElementById(data);

    
    //Если элемент был брошен в область objects
    if (event.target.id === "objects") {
        Element.style.width= "40%";
        Element.style.margin = 0;
        Element.style.position = "absolute"; 

        // Получаем текущее количество блоков в контейнере
        var existingBlocks = document.querySelectorAll('.objects .word');
        var newTop = event.clientY; //устанавливаем новую переменную y

        // Если есть блоки, устанавливаем новый блок над предыдущим
        if (existingBlocks.length > 0) {
            var lastBlock = existingBlocks[existingBlocks.length - 1];
            newTop = lastBlock.offsetTop + event.target.getBoundingClientRect().top - 60; // Добавляем отступ
        }

        // Проверяем, чтобы блок не выходил за пределы контейнера по вертикали
        var containerTop = event.target.getBoundingClientRect().top;
        var containerBottom = event.target.getBoundingClientRect().bottom;

        if (newTop < containerTop) { //если элемент выше блока
            newTop = containerBottom - 50;

        } else if (newTop + Element.offsetHeight > containerBottom-40) { //если элемент ниже блока
            newTop = containerBottom - 60;
        }

        // Проверяем, чтобы блок не выходил за пределы контейнера по горизонтали
        var containerLeft = event.target.getBoundingClientRect().left;
        var containerRight = event.target.getBoundingClientRect().right;

        var newLeft = event.clientX - containerLeft;

        if (newLeft < 0) { //если блок вышел за левую границу
            newLeft = 0;
        } else if (newLeft + 200 > containerRight) { //если блок вышел за правую границу
            newLeft = containerRight-200;
        }

        Element.style.left = newLeft + 'px'; // Начальная позиция по горизонтали
        Element.style.top = newTop - event.target.getBoundingClientRect().top + 'px'; // по вертикали

        if (Element.parentElement.id != "objects"){
            addWord(Element); //добавляем слово в вывод
        }
        else { 
            deleteWord(Element); //меняем положение слово
            addWord(Element);
        }
        event.target.append(Element);
    }

        
    else if (event.target.id === "parse_words") { // Если элемент был брошен в область parse_words

            Element.style.width= "70%";
            Element.style.marginTop = "10px";
            Element.style.removeProperty('position');

            deleteWord(Element);
            event.target.append(Element);
    }

    // Обновляем содержимое контейнера output-word - если нужно, чтобы учитывались положения блоков
    // updateOutput();
}




function addWord(Element){
    var outputContainer = document.querySelector('.output-word');
    var outputText = Element.textContent.substring(3).trim();
    let text = document.createElement('p3');
    text.innerHTML = '&nbsp;'+outputText;
    outputContainer.appendChild(text);
}

function deleteWord(Element){
    var outputContainer = document.querySelector('.output-word');
    var outputText = Element.textContent.substring(3).trim();

    // Находим и удаляем элемент с соответствующим текстом
    var textElements = outputContainer.getElementsByTagName('p3');
    for (var i = 0; i < textElements.length; i++) {
        if (textElements[i].textContent.trim() === outputText) {
            outputContainer.removeChild(textElements[i]);
            break; // Выходим из цикла после удаления первого совпадения
        }
    }
}

var wordOrder = [];
// Обновление содержимого контейнера output-word
function updateOutput() {
    var outputContainer = document.querySelector('.output-word');

    // Получаем все блоки из .objects
    var Elements = Array.from(document.querySelectorAll('.objects .word'));

    // Сортируем блоки по верхней координате в порядке убывания
    Elements.sort(function(a, b) {
        var topA = a.getBoundingClientRect().top;
        var topB = b.getBoundingClientRect().top;
        return topB - topA;
    });

    // Собираем текстовое содержимое блоков в порядке убывания верхних координат
    var outputText = Elements.map(function(Element) {
        return Element.textContent.substring(3).trim();
    }).join(' '); 


    outputContainer.innerHTML = '';
    let text = document.createElement('p3');
    text.innerHTML = outputText;
    outputContainer.appendChild(text);
}
