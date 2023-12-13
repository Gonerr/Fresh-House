class Level {
        constructor(answer, annotation, right_answer) {
        this.answer = answer;
        this.annotation = annotation;
        if (right_answer === 0) {
            this.right_answer = [...answer].sort((a, b) => a.localeCompare(b)); //в алфавитном порядке
        } else if (right_answer === 1){
            this.right_answer = [...answer].sort((a, b) => b.localeCompare(a)); //в обратном порядке
        } else if (right_answer === 2){
            this.right_answer = answer.slice().sort((a, b) => b - a); //числа по убыванию
        } else {
            this.right_answer = right_answer;
        }
    }
}
  
class Game {
    constructor() {
        this.timerInterval;
        this.seconds;
        this.root = document.querySelector(".main-back .task");
        this.answerClick;
        this.word = document.createElement('span');
        this.annotation = document.createElement('span');
        this.text_task = document.getElementById("annotation");
        this.QuestionsIndexes = []

        this.ScoreInLevel;
        this.currentLevel = 0;
        this.currentSublevel = 0;
        this.num = 0;

        this.lowertime;
        this.midtime;
        this.uppertime;
        this.coefficient;
        this.currentLevelOfDifficult;

        this.levels = [
        new Level(
            ["Апрель", "Декабрь", "Июль", "Май", "Ноябрь", "Сентябрь", "Февраль", "Январь", "Август"],
            "Кто-то перепутал все месяцы года! Расставьте их в нужном порядке, пока не закончилось время.",
            ["Январь", "Февраль", "Апрель", "Май", "Июль", "Август", "Сентябрь", "Ноябрь", "Декабрь"]
        ),
        
        new Level(
            ["Horse", "Mouse", "day", "April","Pen","Bicycle","cat","frog","onion","tree","rose","queen","wolf"],
            "В специальном окне, расположенном ниже, быстро и без ошибок нажимайте на английские слова в алфавитном порядке",
            0
        ),
        new Level(
            ["Красный", "Оранжевый", "Жёлтый", "Зелёный", "Голубой", "Синий", "Фиолетовый"],
            "В расположенном ниже окне перечислены все цвета радуги. Помогите восстановить их порядок",
            ["Красный", "Оранжевый", "Жёлтый", "Зелёный", "Голубой", "Синий", "Фиолетовый"]
        ),
        new Level(
            [ "Титаник", "Бриллиантовая рука", "Ирония судьбы", "Черная молния", "Драйв", "Сумерки", "Салют-7",  "Экипаж"],
            "Автор игры никак не может вспомнить названия популярных Российских фильмов. Помогите ему, выбрав в алфавитном порядке все их названия.",
            ["Бриллиантовая рука", "Ирония судьбы", "Салют-7", "Черная молния", "Экипаж"]
        )
        ]
        this.Score = Array.from({length: 3}, () => Array(5).fill(0));
    }


    
   /*Так как от уровня сложности зависит время, которое дается на уровень, то разные уровни сложности
    имеют свои временные этапы для легкого, среднего и сложного уровня соответственно
    первый элемент - нижняя граница времени,второй - средняя граница времени,третий - верхняя граница времени
    четвертый - коэффициент для уровня */
      setLevelParameters(level) {
        switch (level) {
          case 0:
                // Простой уровень
                this.lowertime = 20;
                this.midtime = 40;
                this.uppertime = 60;
                this.coefficient = 1;
                this.currentLevelOfDifficult="Лёгкий";

                this.levels.push(
                    new Level(
                        ["Волк","Олень","Зебра","Верблюд","Кошка","Капибара","Рысь","Синица","Щука","Лисица","Аист"],
                        "В специальном окне, расположенном ниже, быстро и без ошибок нажимайте на названия животных в алфавитном порядке (сначала нажимайте на слова, начинающиеся на А, потом на Б и т.д.)",
                        0
                    ),
                    new Level(
                        ["Слива","Арбуз","Дыня","Жвачка","Яблоко","Лимон","Баранка","Капуста","Ягоды","Морковь","Торт"],
                        "В специальном окне, расположенном ниже, быстро и без ошибок нажимайте на названия продуктов в алфавитном порядке (сначала нажимайте на слова, начинающиеся на А, потом на Б и т.д.)",
                        0
                    ),
                );
                break;
          case 1:
                // Средний уровень
                this.lowertime = 10;
                this.midtime = 20;
                this.uppertime = 30;
                this.coefficient = 2;
                this.currentLevelOfDifficult="Средний";

                this.levels.push(
                    new Level(
                        ["1375","1349","328","1257","1224","989","5683","435","1309","1002","483","456","2456"],
                        "В специальном окне, расположенном ниже, нажимайте на числа в порядке убывания",
                        2
                    ),
                    new Level(["Джаз","Поп","Кантри","Блюз","Шансон","Инди","Хип-хоп","Чилаут","Рэп","Рок","Гранж","Рэгги"],
                        "В специальном окне, расположенном ниже, быстро и без ошибок нажимайте на названия музыкальных жанров в обратном алфавитном порядке",
                        1
                    ),
                    new Level(
                        ["Ночь", "улица", "фонарь", "аптека","Бессмысленный","и","тусклый","свет","Живи","еще","хоть","четверть","века", "Все","будет","так", "Исхода","нет"],
                        "Составьте из слов, расположенных ниже, строчку из одного известного произведения А.А. Блока",
                        ["Ночь", "улица", "фонарь", "аптека","Бессмысленный","и","тусклый","свет","Живи","еще","хоть","четверть","века", "Все","будет","так", "Исхода","нет"]
                    )
                );
                break;
          case 2:
                // Сложный уровень
                this.lowertime = 5;
                this.midtime = 10;
                this.uppertime = 15;
                this.coefficient = 3;
                this.currentLevelOfDifficult="Сложный";

                this.levels.push(
                    new Level(
                        ["back","we","could","turn","back","Wish","time","to","the","good","old","days", "When","our", "momma", "sang"],
                        "Составьте из слов, расположенных ниже, строчку из одной популярной песни группы Twenty one pilots",
                        ["Wish","we","could","turn","back","time","to","the","good","old","days", "When","our", "momma", "sang"]
                    ),
                    new Level(
                        ["Snake", "cheese", "apple", "duck","blood","egg","kite","umbrella","house","dog","lion","lawn","racoon"],
                        "В специальном окне, расположенном ниже, быстро и без ошибок нажимайте на английские слова в обратном алфавитном порядке",
                        0
                    ),
                    new Level(
                        ["1375","1349","328","1257","1224","989","5683","435","1309","1002","483","456","2456"],
                        "В специальном окне, расположенном ниже, нажимайте на числа в порядке убывания",
                        2
                    ),
                    new Level(["Джаз","Поп","Кантри","Блюз","Шансон","Инди","Хип-хоп","Чилаут","Рэп","Рок","Гранж","Рэгги"],
                        "В специальном окне, расположенном ниже, быстро и без ошибок нажимайте на названия музыкальных жанров в обратном алфавитном порядке",
                    1),
                );
                break;
          default:
            break;
        }
    }

    //Выбор уровня
    choiceOfLevel(level){
        this.setLevelParameters(level);
        let ChoiceOfDifficult = document.querySelector(".choiceOfLevel");
        ChoiceOfDifficult.remove();

        let ContentOfGame = document.querySelector(".content");
        ContentOfGame.style.display = "flex";
    }

    //Начало уровня
    ShowWords(){
        for (let i = 0; i < this.levels.length; i++) {
           this.QuestionsIndexes.push(i);
        }
        //перемешиваем индексы вопросов
        shuffleArray(this.QuestionsIndexes);
        let btn = document.getElementById("StartLevel");
        btn.remove(); 

        this.answerClick = 0;
        this.startTimer();
        this.showTask();
}


    showTask() {
        this.currentLevel = this.QuestionsIndexes[this.num]
        console.log(this.levels[this.currentLevel]);
        
        this.ScoreInLevel = 0;
        this.annotation = document.createElement('span');
        this.annotation.id = 'secondLine';
        this.annotation.innerHTML = this.levels[this.currentLevel].annotation;
        this.text_task.appendChild(this.annotation);

        this.addWordEventListeners();
        this.currentSublevel = 0; // Сбрасываем подуровень для нового уровня
        // currentLevel++; // Переходим к следующему уровню
}

addWordEventListeners() {
    let WordsIndexes = [];
    for (let i = 0; i < this.levels[this.currentLevel].answer.length; i++) {
        WordsIndexes.push(i);
    }
    //перемешиваем индексы
    shuffleArray(WordsIndexes);

    let answered = new Array(this.levels[this.currentLevel].answer.length).fill(false);
    this.root = document.querySelector(".main-back .task");

    //console.log('Это текущий список ответов', this.levels[this.currentLevel]);

    for (let i = 0; i < this.levels[this.currentLevel].answer.length; i++) {
        let index = WordsIndexes[i];
        this.word[i] = document.createElement('span');
        this.word[i].className = 'words';
        this.word[i].innerText = this.levels[this.currentLevel].answer[index].toUpperCase();
        this.word[i].addEventListener('click', this.wordClickHandler);
        this.word[i].addEventListener('click', (event) => {
            // Проверяем условие правильности ответа 
            //console.log(this.word[i].innerText, this.levels[this.currentLevel].right_answer[this.answerClick].toUpperCase());
            var isCorrect = this.word[i].innerText == this.levels[this.currentLevel].right_answer[this.answerClick].toUpperCase();

            //если ответ правельный и ещё не был выбран
            if (isCorrect && !answered[index]) {
                event.target.style.color = 'green';
                answered[index] = true;
                this.answerClick++;
                this.ScoreInLevel += 5 * this.coefficient;
                //если все правильные вопрсы отмечены, то очищаем окно
                if (this.answerClick == this.levels[this.currentLevel].right_answer.length) {
                    this.stopTimer();
                    this.deleteAllWords();
                } 
            } else if (!answered[index]) {      
                event.target.style.color = 'red';
                setTimeout(function () {
                    event.target.style.color = '#598bb1';
                }, 700);
                //меньше нуля баллов получиться не должно
                if (this.ScoreInLevel > 0) {
                    this.ScoreInLevel -= 2.5 * this.coefficient;
                }
            }
        });
        this.root.appendChild(this.word[i]);
    }
  }

  getScoreAndDifficulty() {
    let totalScore = this.Score.reduce((acc, row) => acc + row.reduce((sum, val) => sum + val, 0), 0);
    let difficulty = this.currentLevelOfDifficult;
    console.log(totalScore,difficulty);
    return {
      totalScore,difficulty
    };
  }

deleteAllWords() {
    // Удаляем все элементы внутри root
    while (this.root.firstChild) {
        this.root.removeChild(this.root.firstChild);
    }

    var messageElement = document.createElement('span');
    messageElement.className =  'words'; 

    if (this.levels[this.currentLevel].right_answer.length == this.answerClick){
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

    this.root.appendChild(messageElement);
    this.root.appendChild(svg);

    this.Score[this.currentSublevel][this.num] = this.ScoreInLevel;
    this.ScoreInLevel = 0;
    console.log('КОНЕЦ УРОВНЯ. Баллы:',this.Score);

    const { totalScore, difficulty } = this.getScoreAndDifficulty();
    if (this.num<4){
        this.num++;
        svg.addEventListener("click", (event) => {
            while (this.root.firstChild) {
                this.root.removeChild(this.root.firstChild);
                }
            this.NextTask(event); // Оставляем стрелочную функцию, но используем this из окружения
        });
    } else {
        this.num = 0;
        this.text_task.removeChild(this.annotation);
        messageElement.innerText = 'Вы прошли весь уровень!'.toUpperCase();
    };
    var playerName = localStorage.getItem("playerName");
    
    // Сохранение текущего уровня сложности и очков в Local Storage
    localStorage.setItem("currentDifficulty", difficulty);
    localStorage.setItem("currentTotalScore", totalScore);
    console.log(totalScore,difficulty);

    var userData = {
        playerName: playerName,
        currentDifficulty: difficulty,
        currentTotalScore: totalScore
      };
      
      // Сериализация объекта в строку JSON и сохранение в Local Storage
      localStorage.setItem("userData", JSON.stringify(userData));
    
  }

  NextTask() {
    this.text_task.removeChild(this.annotation);
    this.answerClick = 0;
    this.startTimer();
    this.showTask();
  }
  

  startTimer() {
    this.seconds = 0;
    this.timerInterval = setInterval(this.updateTimer.bind(this), 1000);
  }


  updateTimer() {
    this.seconds++;
    var timer = document.getElementById("Timer");
    timer.innerText = this.seconds;
    var Clock = document.querySelector(".container3");

    if (this.seconds>=this.lowertime && this.seconds < this.midtime){
        if (this.seconds%2===0){
            Clock.style.borderColor = "Orange";
            timer.style.color="Orange";}
        else{
            Clock.style.borderColor = "White";
            timer.style.color="White";
        }

    } else if (this.seconds >= this.midtime && this.seconds < this.uppertime){
        if (this.seconds%2===0){
            Clock.style.borderColor = "Red";
            timer.style.color="Red";}
        else{
            Clock.style.borderColor = "White";
            timer.style.color="White";
        }

    } else if (this.seconds >= this.uppertime){
        this.stopTimer();
        this.deleteAllWords();
    };
}

stopTimer() {
    clearInterval(this.timerInterval);
    var Clock = document.querySelector(".container3");
    Clock.style.borderColor = "white";

    var timer = document.getElementById("Timer");
    timer.style.color="White";

    console.log("Последнее значение секунд:", this.seconds);
    if (this.seconds <= this.lowertime){
        this.ScoreInLevel += 20 * this.coefficient;
    } else if (this.seconds <= this.midtime) {
        this.ScoreInLevel += 10 * this.coefficient;
    };
  }
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