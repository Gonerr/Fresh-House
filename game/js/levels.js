var timerInterval;
var seconds;
var root;
var answerClick;
var ScoreInLevel;
var currentLevel = 0;
var currentSublevel = 0;

var level_1 = [{
    answer: ["Слон","Арбуз","Дыня","Радуга","Жизнь","Яблоко","Лес","Белка","Книга","Язык","Память","Кот"], 
    annotation: "В специальном окне, расположенном ниже, быстро и без ошибок нажимайте на слова в алфавитном порядке (сначала нажимайте на слова, начинающиеся на А, потом на Б и т.д.)",
    right_answer: {}
},

];
//"Арбуз","Дыня","Радуга","Жизнь","Учеба","Яблоко","Лес","Белка","Книга","Язык","Память","Кот"
level_1[0].right_answer = level_1[0].answer.slice().sort((a, b) => a.localeCompare(b));


// Создаем массив для хранения очков
let Score = [];
for (let i = 0; i < 3; i++) {
  let levelArray = [];
  for (let j = 0; j < 5; j++) {
    let sublevelArray = 0;
    levelArray.push(sublevelArray);
  }
  Score.push(levelArray);
}

//Так как от уровня сложности зависит время, которое дается на уровень, то разные уровни сложности
//имеют свои временные этапы для легкого, среднего и сложного уровня соответственно
//первый элемент - нижняя граница времени,второй - средняя граница времени,третий - верхняя граница времени
//четвертый - коэффициент для уровня
var rangeOfDifficults = [[20,40,60,1],[10,20,30,2],[5,10,15,3]]
var currentLevelOfDifficult = []

//Выбор уровня
function choiceOfLevel(level){
    currentLevelOfDifficult = rangeOfDifficults[level];
    let ChoiceOfDifficult = document.querySelector(".choiceOfLevel");
    ChoiceOfDifficult.remove();

    let ContentOfGame = document.querySelector(".content");
    ContentOfGame.style.display = "flex";
}


answerClick = 0;
root = document.querySelector(".main-back .task");
var word = document.createElement('span');
var annotation = document.createElement('span');
var text_task = document.getElementById("annotation");

function ShowWords(){
    answerClick = 0;
    let btn = document.getElementById("StartLevel");
    btn.remove(); //удаляем кнопку (начать)
    startTimer();
    

    for (var j = 0; j<1; j++){
        ScoreInLevel = 0;
        annotation[j] = document.createElement('span');
        annotation[j].id = 'secondLine';
        annotation[j].innerHTML = level_1[0].annotation;
        text_task.appendChild(annotation[j]);

        // var RightAnswer = level_1.answer.slice().sort((a, b) => a.localeCompare(b));
        // console.log(RightAnswer);

        var WordsIndexes = [];
        for (var i = 0; i < level_1[0].answer.length; i++) {
            WordsIndexes.push(i);
        }
        // Перемешиваем индексы вопросов, чтобы они были в случайном порядке
        shuffleArray(WordsIndexes);

        root = document.querySelector(".main-back .task");
        var answered = new Array(level_1[0].answer.length).fill(false);
        for (var i = 0; i < level_1[0].answer.length; i++) {               //tasks.length
            let index = WordsIndexes[i];
            
            word[i] = document.createElement('span');
            word[i].className = 'words';
            word[i].innerText =  level_1[0].answer[index].toUpperCase();
           
            word[i].addEventListener('click', (function(clickedWord, wordIndex) {
                return function(event) {
                    // Проверяем условие правильности ответа 
                    var isCorrect = clickedWord.innerText == level_1[0].right_answer[answerClick].toUpperCase(); 
                    
                    if (isCorrect && !answered[wordIndex]) { //меняем цвет в зависимости от ответа
                        event.target.style.color = 'green'; 
                        answered[wordIndex] = true;    // Устанавливаем флаг answered в true, чтобы предотвратить повторное нажатие
                        answerClick++;
                        ScoreInLevel+=5*currentLevelOfDifficult[3];
                        if (answerClick==level_1[0].right_answer.length){
                            stopTimer();
                            deleteAllWords(root);
                        }
                    } else if (!answered[wordIndex]){
                        event.target.style.color = 'red'; 
                        setTimeout(function() {
                            event.target.style.color = '#598bb1';
                        }, 700);
                        if (ScoreInLevel>0){
                            ScoreInLevel-=2.5*currentLevelOfDifficult[3];
                        }
                    }
                    
                }
            })(word[i],index));
            root.appendChild(word[i]);
        }
        
    }
    ScoreInLevel = 0; // Сбрасываем значение для нового уровня
    currentSublevel = 0; // Сбрасываем подуровень для нового уровня
    // currentLevel++; // Переходим к следующему уровню
    
}

function deleteAllWords(root) {
    // Удаляем все элементы внутри root
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    var messageElement = document.createElement('span');
    messageElement.className =  'words'; 
    if (level_1[0].right_answer.length==answerClick){
        messageElement.innerText = 'Вы нашли все слова!'.toUpperCase();
    } else {
        messageElement.style.height='auto';
        messageElement.innerText = 'В следующий раз всё обязательно получится!'.toUpperCase();
    }

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id="NextLevel"
    svg.style.display="block";
    svg.setAttribute("viewBox", "0 0 1024 1024");

    let path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM512 928c-229.75 0-416-186.25-416-416s186.25-416 416-416 416 186.25 416 416-186.25 416-416 416z");
    path1.style.fill="#598bb1";
    svg.appendChild(path1);

    let path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M354.744 706.744l90.512 90.512 285.254-285.256-285.256-285.254-90.508 90.508 194.744 194.746z");
    path2.style.fill="#598bb1";
    svg.appendChild(path2);

    root.appendChild(messageElement);
    root.appendChild(svg);

    console.log('КОНЕЦ УРОВНЯ. Баллы:',Score);

  }

  function startTimer() {
    seconds = 0;
    timerInterval = setInterval(updateTimer, 1000);
  }


  function updateTimer() {
    seconds++;
    var timer = document.getElementById("Timer");
    timer.innerText = seconds;
    var Clock = document.querySelector(".container3");

    if (seconds>=currentLevelOfDifficult[0] && seconds<currentLevelOfDifficult[1]){
        Clock.style.borderColor = "Orange";
        timer.style.color="Orange";

    } else if (seconds>=currentLevelOfDifficult[1] && seconds<currentLevelOfDifficult[2]){
        Clock.style.borderColor = "Red";
        timer.style.color="Red";

    } else if (seconds>=currentLevelOfDifficult[2]){
        stopTimer();
        deleteAllWords(root);
    };
}

function stopTimer() {
    clearInterval(timerInterval);
    console.log("Последнее значение секунд:", seconds);
    if (seconds<=currentLevelOfDifficult[0]){
        ScoreInLevel+=20*currentLevelOfDifficult[3];
    } else if (seconds <=currentLevelOfDifficult[1]) {
        ScoreInLevel+=10*currentLevelOfDifficult[3];
    };
    Score[currentLevel][currentSublevel] = ScoreInLevel;

    //для следующего уровня
    ScoreInLevel = 0; 
  }


//функция, меняющая местами элементы массива
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function Exit(){
    document.querySelector(".exitWindow").style.display = "flex";
}

function CancelExit(){
    document.querySelector(".exitWindow").style.display = "none";
}