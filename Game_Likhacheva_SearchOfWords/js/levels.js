class Level {
        constructor(answer, annotation, right_answer,length_) {
        this.answer =  answer.map(word => word.toUpperCase());
        this.annotation = annotation;
        if (right_answer === 0) {
            this.right_answer = [...answer].sort((a, b) => a.localeCompare(b)); //в алфавитном порядке
        } else if (right_answer === 1){
            this.right_answer = [...answer].sort((a, b) => b.localeCompare(a)); //в обратном порядке
        } else if (right_answer === 2){
            this.right_answer = answer.slice().sort((a, b) => b - a); //числа по убыванию
        } else if (right_answer === 3){
            this.right_answer = answer.slice().sort((a, b) => a - b); //числа по убыванию
        } else {
            this.right_answer =  right_answer.map(word => word.toUpperCase());
        };

         if (length_> 0) {
            this.length_=length_;
        } else {
            this.length_ = this.answer.length;
        };
        
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
        this.QuestionsIndexes = [];
        this.answered;

        this.ScoreInLevel;
        this.currentLevel = 0;
        this.currentSublevel = 0;
        this.num = 0;
        this.indexes;

        this.lowertime;
        this.midtime;
        this.uppertime;
        this.coefficient;
        this.currentLevelOfDifficult;

        this.LevelAnnotation = ['Нажимайте на слова в нужном порядке как можно быстрее!',
        'Выберите в предложении необходимые слова, нажимая на цифровые кнопки клавиатуры. Будьте внимательны: на каждом уровне сложности ограниченное число допустимых ошибок',
        'Перемещайте слова в нужном порядке, перетаскивая их в окне ниже.'];
        this.levels = [[
        new Level(
            ["Апрель", "Декабрь", "Июль", "Май", "Ноябрь", "Сентябрь", "Февраль", "Январь", "Август"],
            "Кто-то перепутал все месяцы года! Расставьте их в нужном порядке, пока не закончилось время.",
            ["Январь", "Февраль", "Апрель", "Май", "Июль", "Август", "Сентябрь", "Ноябрь", "Декабрь"]
        ),
        new Level(
            ["Horse", "Mouse", "day", "April","Pen","Bicycle","cat","frog"],
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
        )],
            [
        new Level(
            ["Когда человека зеваете, то непроизвольно открываются роты."],
            "Кто-то написал предложение с ошибками, перепутав падежи. Помогите найти неверно написанные слова, нажимая на цифры (с помощью клавиатуры), соответствующие номерам данных слов",
            ["человека", "зеваете,","открываются","роты."],
            7
        ),
        new Level(
            ["Загадочная луна освещает ночное далёкое небо своим серебрянным светом, и всё в этот миг забывается"],
            "Помогите найти в предложении все прилагательные, нажав на клавиатуре цифры, соответствующие их номерам в предложении",
            ["Загадочная","ночное","далёкое","серебрянным"],
            15
        ),
        new Level(
            ["Группа крови на рукаве, Мой порядковый номер на рукаве"],
            "Помогите найти в предложении все слова, которые встречаются только один раз, нажав на клавиатуре цифры, соответствующие их номерам в предложении",
            ["Группа","крови","мой","порядковый", "номер"],
            9
        ),
        new Level(
            ["Величественные горы уходят ввысь, касаясь голубого неба и теряясь там."],
            "Помогите найти в предложении все глаголы и причастия, нажимая на клавиатуре цифры, соответствующие их номерам в предложении",
            ["уходят","касаясь","теряясь"],
            10
        ), 
        new Level(
            ["Величественные горы уходят ввысь, касаясь голубого неба."],
            "Найдите в предложении все слова, начинающиеся на одинаковую букву. Для этого необходимо на клавиатуре нажать на соответствующую цифровую клавишу (номер слова в предложении)",
            ["Величественные","горы","голубого","ввысь,"],
            7
        )],
        [
            new Level(
                ["А теперь улицы , ты теперь пацан , ты теперь с запомни , а кругом враги."],
                "Кто-то перепутал в известной фразе все слова! Попробуйте исправить предложение, переставляя слова",
                ["А теперь запомни , ты теперь пацан , ты теперь с улицы , а кругом враги."]
            ),
            new Level(
                ["Лето", "закончилось", "и", "после", "него", "наступила", "осень"],
                "Переставьте слова так, чтобы получилась новая фраза.",
                ["Лето закончилось и после него наступила осень"]
            ),
            new Level(
                ["Остров миля , Список проклятых , Дориан отец , Голодные Шиндлера , Крёстный Грей , Зелёная игры"],
                "Кто-то перепутал в фильмах названия, состоящие из двух слов. Переставьте в названиях второе слово так, чтобы появились знакомые фильмы. Оставьте ПЕРВОЕ слово НЕТРОНУТЫМ!",
                ["Остров проклятых , Список Шиндлера , Дориан Грей , Голодные игры , Крёстный отец , Зелёная миля"]
            ),
            new Level(
                ["Яблоко", "Груша", "Апельсин", "Киви", "Персик", "Виноград", "Арбуз"],
                "Расставьте слова в алфавитном порядке, переставляя их",
                0
            ),
            new Level(
                ["Б","а","б","о","ч","к","а"],
                "Кто-то перемешал в слове все буквы! Попробуйте восстановить слово",
                ["Б а б о ч к а"]
            ),
            new Level(
                ["В","ё","р","с","т","к","а"],
                "Кто-то перемешал в слове все буквы! Попробуйте восстановить слово",
                ["В ё р с т к а"]
            ),
            new Level(
                ["Б","е","с","п","о","р","я","д","о","к"],
                "Кто-то перемешал в слове все буквы! Попробуйте восстановить слово",
                ["Б е с п о р я д о к"]
            )

        ]
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
                this.wrong_answer = 2;

                this.levels[0].push(
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

                this.levels[1].push(
                    new Level(
                        ["Мальчик катается на велосипеде, а девочка смеётся и рисует мелками на асфальте"],
                        "Найдите все сказуемые в предложении и нажмите на соответствующие цифры для их выделения.",
                        ["катается","смеётся","рисует"],
                        12
                    ),
                    new Level(
                        ["Солнце сияет ярко, а ветер ласкает лицо"],
                        "Определите все слова в предложении, начинающиеся на одну и ту же букву, нажимая соответствующие цифры на клавиатуре.",
                        ["ласкает","лицо","солнце","сияет"],
                        7
                    )
                );

                this.levels[2].push(
                    new Level(
                        ["Люблю", "зиму", "с", "ее", "снегопадами"],
                        "Переставьте слова так, чтобы получилась новая фраза.",
                        ["Люблю зиму с ее снегопадами"]
                    ),
                    new Level(
                        ["Хэй", "хэй", "всем", "привет","это","Куплинов","Плэй"],
                        "Переставьте слова так, чтобы получилась новая фраза.",
                        ["Хэй хэй всем привет это Куплинов Плэй"]
                    )
                )
                break;
          case 1:
                // Средний уровень
                this.lowertime = 10;
                this.midtime = 20;
                this.uppertime = 30;
                this.coefficient = 1.5;
                this.currentLevelOfDifficult="Средний";
                this.wrong_answer = 1;

                this.levels[0].push(
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
                this.levels[1].push(
                    new Level(
                        ["В парке играют дети, а также взрослые отдыхают"],
                        "Найдите все существительные в предложении и нажмите на соответствующие цифры для их выделения.",
                        ["парке","дети,","взрослые"],
                        8
                    ),
                    new Level(
                        ["Эта собака бежит между деревьями и подпрыгивает через забор"],
                        "Определите все предлоги в предложении и выделите их, нажимая соответствующие цифры на клавиатуре.",
                        ["между","через"],
                        9
                    )
                );
                this.levels[2].push(
                    new Level(
                        ["Сегодня","утром","заботливый","кот","смотрел","своими","глазами","на","весело","играющих","маленьких","соседских","детей."],
                        "Переставьте слова в предложении так, чтобы получилась правильная структура, учитывая их части речи. ",
                        ["Сегодня утром, заботливый кот смотрел своими глазами на весело играющих маленьких соседских детей."]
                    ),
                    new Level(
                        ["Вчера вечером мы сидели в парк и говорили как птицы летят над прудом. Затем мы шли на лавке и видели о наших планах на будущее."],
                        "Переставьте глаголы так, чтобы получилось правильно составленное предложение.",
                        ["Вчера вечером мы сидели в парк и говорили как птицы летят над прудом. Затем мы шли на лавке и видели о наших планах на будущее."]
                    ),
                    new Level(
                        ["Криминальное призраками, Форрест Уик, Унесённые чтиво, Джон психопат, Американский Гамп"],
                        "Кто-то перепутал в фильмах названия, состоящие из двух слов. Переставьте в названиях первое слово так, чтобы появились знакомые фильмы. Оставьте ВТОРОЕ слово НЕТРОНУТЫМ!",
                        ["Унесённые призраками, Джон Уик, Криминальное чтиво, Американский психопат, Форрест Гамп"]
                    )
                    
                );
                break;
          case 2:
                // Сложный уровень
                this.lowertime = 5;
                this.midtime = 10;
                this.uppertime = 15;
                this.coefficient = 2;
                this.currentLevelOfDifficult="Сложный";
                this.wrong_answer = 0;

                this.levels[0].push(
                    new Level(
                        ["we","could","turn","back","Wish","time","to","the","good","old","days", "When","our", "momma", "sang"],
                        "Составьте из слов, расположенных ниже, строчку из одной популярной песни группы Twenty one pilots",
                        ["Wish","we","could","turn","back","time","to","the","good","old","days", "When","our", "momma", "sang"]
                    ),
                    new Level(
                        ["Snake", "cheese", "apple", "duck","blood","egg","kite","umbrella","house"],
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

                this.levels[1].push(
                    new Level(
                        ["Петя читает книгу, Маша пишет письмо, а Таня рисует."],
                        "Найдите главные члены предложения и нажмите на цифры для их выделения.",
                        ["Петя","читает","Маша","Пишет","Таня","рисует"],
                        10
                    ),
                    new Level(
                        ["На заседании обсуждались вопросы: решение проблем и разработка стратегии"],
                        "Найдите и выделите однородные члены предложения, связанные с обсуждением важных вопросов. Используйте цифры для выделения.",
                        ["решение","проблем","разработка","стратегии"],
                        9
                    )
                    
                );
                this.levels[2].push(
                    new Level(
                        ["Криминальное призраками, Форрест Уик, Унесённые чтиво, Джон психопат, Американский Гамп"],
                        "Кто-то перепутал в фильмах названия, состоящие из двух слов. Переставьте в названиях первое слово так, чтобы появились знакомые фильмы. Оставьте ВТОРОЕ слово НЕТРОНУТЫМ!",
                        ["Унесённые призраками, Джон Уик, Криминальное чтиво, Американский психопат, Форрест Гамп"]
                    ),
                    new Level(
                        ["145","124","686","234","234","768","453","688","235","656","342"],
                        "Расставьте числа в порядке их возрастания",
                        3
                    )
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

        //console.log( this.levels[this.currentLevel],this.levels[this.currentLevel][this.currentSublevel]);
    }

    //Начало уровня
    ShowWords(){
        
        let btn = document.getElementById("StartLevel");
        btn.remove(); 

        this.QuestionsIndexes =[];
        for (let i = 0; i < this.levels[this.currentLevel].length; i++) {
            this.QuestionsIndexes.push(i);
        }
        console.log( this.levels[this.currentLevel].length);
        //перемешиваем индексы вопросов
        shuffleArray(this.QuestionsIndexes);

        var timer = document.getElementById("Timer");
        timer.innerText = 0;


        this.answerClick = 0;
        this.showTask();
        setTimeout(() => {
            this.startTimer();
        }, 3000);
        
}


    showTask() {
        //console.log('Перемешанные индексы',this.QuestionsIndexes);
        this.currentSublevel = this.QuestionsIndexes[this.num]
        console.log('num',this.num, 'Текущий уровень',this.levels[this.currentLevel][this.currentSublevel],'Уровень ', this.currentLevel, 'Подуровень',this.currentSublevel);
        
        this.ScoreInLevel = 0;
        this.annotation = document.createElement('span');
        this.annotation.id = 'secondLine';
        this.annotation.innerHTML = this.levels[this.currentLevel][this.currentSublevel].annotation;
        this.text_task.appendChild(this.annotation);

        setTimeout(() => {
            if (this.currentLevel===1 || this.currentLevel===0) {this.addWordEventListeners();}
            else {this.thirdLevel()}
        }, 3000);
}

thirdLevel(){
    let WordsIndexes = [];
    for (let i = 0; i < this.levels[this.currentLevel][this.currentSublevel].answer.length; i++) {
        WordsIndexes.push(i);
    }
    //console.log('длина текущих ответов',this.levels[this.currentLevel][this.currentSublevel].answer.length);
    //перемешиваем индексы
    shuffleArray(WordsIndexes);
    if (this.levels[this.currentLevel][this.currentSublevel].answer.length>1){
        var words = this.levels[this.currentLevel][this.currentSublevel].answer;
    } else {
        var words = this.levels[this.currentLevel][this.currentSublevel].answer[0].split(' '); //разделяем строку на массив
    }
    

    var right_answer_words = this.levels[this.currentLevel][this.currentSublevel].right_answer;
    this.root = document.querySelector(".main-back .task");
    this.root.ondrop = dragDrop;
    this.root.ondragover = dragOver;

    for (let i = 0; i < words.length; i++) {
        this.word[i] = document.createElement('span');
        this.word[i].className = 'words';
        if (this.levels[this.currentLevel][this.currentSublevel].answer.length>1){
            var index = WordsIndexes[i];
            this.word[i].innerText = words[index];
        } else {
            this.word[i].innerText = words[i];
        }
        this.word[i].style.marginRight = "5px";

        //делаем слова переносимыми
        this.word[i].setAttribute("draggable", "true");
        this.word[i].ondragstart = dragStart;
    
        //создание индекса
        this.word[i].id = i;

        this.root.appendChild(this.word[i]);
    }

}

addWordEventListeners() {
    let WordsIndexes = [];
    for (let i = 0; i < this.levels[this.currentLevel][this.currentSublevel].answer.length; i++) {
        WordsIndexes.push(i);
    }
    //console.log('длина текущих ответов',this.levels[this.currentLevel][this.currentSublevel].answer.length);
    //перемешиваем индексы
    shuffleArray(WordsIndexes);

    this.answered = new Array(this.levels[this.currentLevel][this.currentSublevel].answer.length).fill(false);
    this.root = document.querySelector(".main-back .task");


    if (this.currentLevel===1){
        //все слова в предложении
        var words = this.levels[this.currentLevel][this.currentSublevel].answer[0].split(' '); 
        this.answered = new Array(words.length).fill(false);

        this.indexes = [];
        this.levels[this.currentLevel][this.currentSublevel].right_answer.map(answer => {
            for (let j = 0; j < words.length; j++) {
                if (words[j] === answer) {
                    this.indexes.push(j);
                }
            }
        });
        //console.log(this.indexes);
        //console.log(this.levels[this.currentLevel][this.currentSublevel].right_answer);


    }
    //console.log(this.levels[this.currentLevel][this.currentSublevel].length_);
    for (let i = 0; i < this.levels[this.currentLevel][this.currentSublevel].length_; i++) {
        let index = WordsIndexes[i];
        this.word[i] = document.createElement('span');
        this.word[i].className = 'words';

        


        if (this.currentLevel===1) {
            this.word[i].innerText = words[i];
            this.word[i].style.margin = "3px";
            // this.word[i].focus();
            // this.word[i].setAttribute('tabindex', '0');
            
        };
        
        console.log(this.currentLevel);
        if (this.currentLevel===0) {
            this.word[i].innerText = this.levels[this.currentLevel][this.currentSublevel].answer[index].toUpperCase();
            console.log(this.word[i]);
            this.word[i].addEventListener('click', this.wordClickHandler);
                this.word[i].addEventListener('click', (event) => {
                // Проверяем условие правильности ответа 
                //console.log('Выбранный ответ',this.word[i].innerText, 'Жалкая подделка',this.levels[this.currentLevel][this.currentSublevel].right_answer[this.answerClick].toUpperCase());
                var isCorrect = this.word[i].innerText == this.levels[this.currentLevel][this.currentSublevel].right_answer[this.answerClick].toUpperCase();

                //если ответ правильный и ещё не был выбран
                if (isCorrect && !this.answered[index]) {
                    event.target.style.color = 'green';
                    this.answered[index] = true;
                    this.answerClick++;
                    this.ScoreInLevel += 5 * this.coefficient;
                    //если все правильные вопрсы отмечены, то очищаем окно
                    if (this.answerClick == this.levels[this.currentLevel][this.currentSublevel].right_answer.length) {
                        this.stopTimer();
                        this.deleteAllWords();
                    } 
                } else if (!this.answered[index]) {      
                    event.target.style.color = 'red';
                    setTimeout(function () {
                        event.target.style.color = '#598bb1';
                    }, 700);
                    //меньше нуля баллов получиться не должно
                    if (this.ScoreInLevel > 0) {
                        this.ScoreInLevel -= 2.5 * this.coefficient;
                    }
                }
            })
        };
        this.root.appendChild(this.word[i]);
    };


        if (this.currentLevel===1){
            var wrong = 0;
            if (this.keydownHandler) {
                document.removeEventListener('keydown', this.keydownHandler);
            }
            
            this.keydownHandler = (event) => {
            // Проверяем, что событие произошло на клавише с цифрой
            if (event.key >= '0' && event.key <= '9') {
            // Получаем число из клавиши
                var pressedNumber = parseInt(event.key);
                
                // Проверяем, что число входит в допустимый диапазон
                if (pressedNumber > 0 && pressedNumber <= this.levels[this.currentLevel][this.currentSublevel].length_) {
                    console.log('Нажатая клавиша',pressedNumber,'Индексы правильные', this.indexes, this.indexes.includes(pressedNumber-1));
                    if (this.indexes.includes(pressedNumber-1)){
                        this.word[pressedNumber-1].style.color = 'green';
                        this.answerClick++;
                        this.ScoreInLevel += 10 * this.coefficient;
                        //console.log(this.answerClick);
                        if (this.answerClick == this.levels[this.currentLevel][this.currentSublevel].right_answer.length) {
                             this.stopTimer();
                             this.deleteAllWords();
                    }} else {
                        this.word[pressedNumber-1].style.color = 'red';
                        wrong++;
                        if (this.ScoreInLevel > 0) {
                            this.ScoreInLevel -= 5 * this.coefficient;
                        }
                        if (wrong>this.wrong_answer){
                            this.stopTimer();
                            this.deleteAllWords();
                        }
                    } 
                }
            }
        };
        document.addEventListener('keydown', this.keydownHandler);
    }
}




//   else if (this.currentLevel===1){
//     var isCorrect = this.levels[this.currentLevel][this.currentSublevel].right_answer.includes(this.word[i].innerText);
//     console.log('Все круто', this.levels[this.currentLevel][this.currentSublevel].right_answer.includes(this.word[i].innerText),this.word[i].innerText,
//     this.levels[this.currentLevel][this.currentSublevel].right_answer,
//     answered[index]);
// }







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

    if (this.levels[this.currentLevel][this.currentSublevel].right_answer.length == this.answerClick){
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

    this.Score[this.currentLevel][this.num] = this.ScoreInLevel;
    this.ScoreInLevel = 0;
    console.log('КОНЕЦ УРОВНЯ. Баллы:',this.Score,'баллы за текущий уровень', this.Score[this.currentLevel][this.num]);

    const { totalScore, difficulty } = this.getScoreAndDifficulty();
    if (this.num<4){ //если все вопросы обработались (всего вопросов должно быть 5)
        console.log('Это был вопрос',this.num);
        this.num++;
        svg.addEventListener("click", (event) => {
            while (this.root.firstChild) {
                this.root.removeChild(this.root.firstChild);
                }
            this.NextTask(event); 
        });
    } else if (this.currentLevel<2) {
            console.log('Это был вопрос',this.num);
            //обнуляем вопросы
            this.num = 0;           
            this.text_task.removeChild(this.annotation);
            messageElement.innerText = 'Вы прошли весь уровень!'.toUpperCase();
            svg.addEventListener("click", (event) => {
                this.currentLevel++;
                while (this.root.firstChild) {
                    this.root.removeChild(this.root.firstChild);
                    }
                document.querySelector(".NameLevel").innerHTML = 'Уровень ' + (this.currentLevel+1);
                document.getElementById("firstLine").innerHTML = this.LevelAnnotation[this.currentLevel];
                let btn = document.createElement('a');
                btn.className = "cta-btn start button";
                btn.innerHTML = "Начать";
                btn.id = "StartLevel";
                btn.addEventListener("click", (event) => {
                    this.ShowWords(event);
                })
                this.root.appendChild(btn);
            })
    }else if (this.currentLevel===2) {      
            this.text_task.removeChild(this.annotation);
            document.querySelector(".NameLevel").innerHTML = "Конец игры";
            document.getElementById("firstLine").innerHTML = "";
            messageElement.innerText = 'Вы прошли все уровни! Ваши баллы: '.toUpperCase()+totalScore;
            messageElement.style.fontSize="2.3em";
            svg.addEventListener("click", function() {
                window.location.href = "score.html";
            });
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


  NextLevel(){
    this.answerClick = 0;
    this.showTask();
  }

  NextTask() {
    this.text_task.removeChild(this.annotation);
    this.answerClick = 0;
    this.showTask();
    var timer = document.getElementById("Timer");
    timer.innerText = 0;
    setTimeout(() => {
        this.startTimer();
    }, 3000);
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

  updateOutput(textArray) {
    var outputText = textArray.join(' ');

    var answer = this.levels[this.currentLevel][this.currentSublevel].right_answer.join(' ').toUpperCase();
    console.log(outputText,answer);
    if (outputText === answer){
        this.answerClick++
        this.ScoreInLevel += 20 * this.coefficient;
        this.stopTimer();
        this.deleteAllWords();
    }
    //console.log(isSame,answer);
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

function dragStart(event) {
    event.dataTransfer.setData("id", event.target.id);
}

// Разрешаем перетаскивание при наведении
function dragOver(event) {
    event.preventDefault();
}

function dragDrop(event) {
    var data = event.dataTransfer.getData('id');
    var draggedElement = document.getElementById(data);

    //Находим элемент, над которым было произведено отпускание
    var targetElement = document.elementFromPoint(event.clientX+10, event.clientY);
    //console.log(event.clientX+5, event.clientY,targetElement.clientX,targetElement.clientY );
    if (targetElement && targetElement.className === 'words') {
        targetElement.parentNode.insertBefore(draggedElement, targetElement);
    }
    // Находим родительский элемент
    var rootElement = document.querySelector('.main-back .task');

    // Получаем все дочерние элементы
    var childElements = Array.from(rootElement.children);

    // Получаем текст каждого элемента и формируем массив строк
    var textArray = childElements.map(element => element.textContent);
    game.updateOutput(textArray);
}
