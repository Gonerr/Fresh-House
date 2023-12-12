var questions = [{
        name: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        answer: ["Пол деревни, за раз","Полдеревни, зараз","Пол-деревни, за раз"],
        right_answer:"Полдеревни, зараз",
        annotation: "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом.",
        user_answer: false
    },
    {
        name: "А эти слова как пишутся?",
        answer: ["Капуччино и эспрессо","Каппуччино и экспресо","Капучино и эспрессо"],
        right_answer:"Капучино и эспрессо",
        annotation: "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо».", 
        user_answer: false
    },
    {
        name: "Как нужно писать?",
        answer: ["Черезчур","Черес-чур","Чересчур"],
        right_answer:"Чересчур",
        annotation: "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур».",
        user_answer: false
    },
    {
        name: "Где допущена ошибка?",
        answer: ["Аккордеон","Белиберда","Эпелепсия"],
        right_answer:"Эпелепсия",
        annotation: "Верно! Это слово пишется так: «эпИлепсия».",
        user_answer: false
    }
];
const statistics = [];

var root = document.getElementById('Container-DOM'); //ну пока что qwe потому что другое сложно придумать
var Question_box = document.createElement('div1');
var question = document.createElement('p');
var Answer_box = document.createElement('div2');

var k = 1; //количество нажатий на кнопку
var answer = new Array();
var randomElement = [];
var test_time = 0; //количество запущенных тестов. Если 0 - тестов еще не было, 1 - был тест
var counter = 1; //нумерация вопросов
var right_counter = 0;

//основная функция
document.getElementById("QuestionBtn").addEventListener("click", function() {
    if (k===1 && questions.length>0) { //если посмотрели еще не все вопросы (их 4)

        // Рекурсивная функция для удаления всех дочерних элементов
        function removeAllChildren(element) {
            while (element.firstChild) {
                removeAllChildren(element.firstChild);
                element.removeChild(element.firstChild);
            }
        }
        removeAllChildren(root); // Удаляем все дочерние элементы в контейнере

        //сбрасываем предыдущую статистику
        if (test_time>0){
            statistics.length=0;
            test_time-=1;
            counter = 1;
            right_counter = 0;
        }

        // Получаем случайный элемент чтобы вопросы вывелись в случайном порядке - будем удалять элементы
        var randomIndex = Math.floor(Math.random() * questions.length);
        randomElement = questions[randomIndex];
        
        
        root.appendChild(Question_box);
        question.innerHTML =  counter + '. ' + randomElement.name;
        counter+=1;
        Question_box.appendChild(question);

        //добавляем вопросы
        root.appendChild(Answer_box);
        k = 0; //никакая кнопка еще не нажата

        // Создаём массив с индексами вопросов (вопросы тоже в случайном порядке)
        var questionIndexes = [];
        for (var i = 0; i < randomElement.answer.length; i++) {
            questionIndexes.push(i);
        }
        // Перемешиваем индексы вопросов, чтобы они были в случайном порядке
        shuffleArray(questionIndexes);

        answer = new Array(); //div3
        for (var i = 0; i < questionIndexes.length; i++) {
            var index = questionIndexes[i]; //случ. индекс

            answer[i] = document.createElement('div3');
            Answer_box.appendChild(answer[i]);
            let text_answer = document.createElement('p1');
            text_answer.innerHTML = randomElement.answer[index]; //берем вопрос со случ.индексом
            answer[i].appendChild(text_answer);    

            // Добавляем обработчик события клика для answer[i]
            (function(number) {
                answer[number].addEventListener("click", function() {
                    if (k === 0) {       
                        //если еще ни разу не нажимали ни на одну кнопку
                        
                        if (answer[number].innerHTML === ('<p1>'+randomElement.right_answer+'</p1>') && k === 0) {
                            answer[number].classList.add('clicked_right');
                            setTimeout(function() {
                                moveAndRemoveAnswer(0, number);    //убираем лишние ответы с задержкой 1с.(можно поменять на 2с)
                            }, 1000); 

                            setTimeout(function() {                 //выводим соотв. сообщение
                                RightAnswer(Question_box);
                                

                                let Annotation = document.createElement('p2');
                                Annotation.innerHTML = randomElement.annotation;
                                Annotation.classList.add("fade-in");
                                Answer_box.appendChild(Annotation);

                                
                            }, 3100); //4500

                            setTimeout(function() {
                                moveAndRemoveAnswer(number, 5);    //убираем лишние ответы с задержкой 2с.
                            }, 4500); 

                            k += 1;
                            randomElement.user_answer = true; 
                            right_counter +=1;
                        } 

                            else {
                            answer[number].classList.add('clicked');
                            //убираем все элементы
                            setTimeout(function() {
                                moveAndRemoveAnswer(0, 5);
                            }, 1000); //2000

                            setTimeout(function() {
                                WrongAnswer(Question_box);
                            }, 1200); //4000

                            k += 1;
                            randomElement.user_answer = false;
                        }
                        //добавляем в статистику соответствующую информацию
                        statistics.push({
                            question: randomElement.name,
                            userAnswer: randomElement.user_answer,
                            correctAnswer: randomElement.right_answer
                        });
                        questions.splice(randomIndex, 1); //удаляем объект из массива с вопросами

                        
                        if (questions.length === 0){
                            console.log('Вопросы кончились');
                            finish = document.createElement('span');
                            finish.style.color = 'var(--dl-color-primary-dark_blue)'; 
                            finish.innerHTML = 'ВОПРОСЫ ЗАКОНЧИЛИСЬ...';
                            root.insertBefore(finish,Question_box); //вставка перед ответом
                        }
                    
                    }
                });
            })(i);
        }
    }
    //если обработали все вопросы
    else if (questions.length==0){
        
        questions = [{
                name: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
                answer: ["Пол деревни, за раз","Полдеревни, зараз","Пол-деревни, за раз"],
                right_answer:"Полдеревни, зараз",
                annotation: "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом.",
                user_answer: false
            },
            {
                name: "А эти слова как пишутся?",
                answer: ["Капуччино и эспрессо","Каппуччино и экспресо","Капучино и эспрессо"],
                right_answer:"Капучино и эспрессо",
                annotation: "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо».", 
                user_answer: false
            },
            {
                name: "Как нужно писать?",
                answer: ["Черезчур","Черес-чур","Чересчур"],
                right_answer:"Чересчур",
                annotation: "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур».",
                user_answer: false
            },
            {
                name: "Где допущена ошибка?",
                answer: ["Аккордеон","Белиберда","Эпелепсия"],
                right_answer:"Эпелепсия",
                annotation: "Верно! Это слово пишется так: «эпИлепсия».",
                user_answer: false
            }
        ];
        k = 1;
        test_time+=1;
        // Удаляем все дочерние элементы в контейнере
        function removeAllChildren(element) {
            while (element.firstChild) {
                removeAllChildren(element.firstChild);
                element.removeChild(element.firstChild);
            }
        }
        removeAllChildren(root); 

        //все вопросы располагаются в ряд
        var Container_DOM = document.getElementById("Container-DOM");
        Container_DOM.style.flexDirection = "row";
        Container_DOM.style.justifyContent = "space-around";
        
        result = document.createElement('span');
        if (right_counter===4){
            result.innerHTML = 'Вы знаток грамматики - все ответы правильные!';
        }
        else{
            result.innerHTML = 'Правильных ответов: ' + (right_counter) + ' из 4. Пройти тест ещё раз?';
        }
        root.appendChild(result); //вставка перед ответом


        //выводим вопросы
        for (var i = 0; i<statistics.length; i++){
            
            Question_box[i]=document.createElement('div1');
            Question_box[i].style.width = "45%";
            Question_box[i].style.height = "auto";
            Question_box[i].style.borderRadius = "30px";
            root.appendChild(Question_box[i]);

            question = document.createElement('p')
            question.innerHTML =  (i+1) + '. ' + statistics[i].question;
            Question_box[i].appendChild(question);
            console.log(statistics[i].userAnswer);

            //выводим соответствующие результаты
            statistics[i].userAnswer ? RightAnswer(Question_box[i]) : WrongAnswer(Question_box[i]);
            

            // Answer_box[i] = document.createElement('div2');    !!!!для вывода ответа рядом с вопросом
            // Answer_box[i].style.width = "30%";
            // Answer_box[i].style.borderRadius = "30px";
            // Answer_box[i].style.display = "none"; // Скрываем изначально

            // answer = document.createElement('div3');
            // answer.style.width = "100%";
            // Answer_box[i].appendChild(answer);

            // root.appendChild(Answer_box[i]);
            // let text_answer = document.createElement('p1');
            // text_answer.innerHTML = statistics[i].correctAnswer;
            // answer.appendChild(text_answer);

            // var annotation;
            // var answered = false;
            // var number_question = 0;
            // Question_box[i].addEventListener("click", function (index) {
            //     return function () {
            //         if (!answered) {
            //             annotation = document.createElement('p2');
            //             annotation.style.paddingTop = '20px';
            //             annotation.style.fontSize = '1.2em';
            //             annotation.innerHTML = 'Правильный ответ на вопрос ' + (index + 1) + ':';
            //             root.insertBefore(annotation, Answer_box[index]);
            //             answered = true;
            //         } else {
            //             annotation.innerHTML = 'Правильный ответ на вопрос ' + (index + 1) + ':';
            //         }
        
            //         // Скрываем все Answer_box, кроме текущего
            //         for (var j = 0; j < 4; j++) { 
            //             number_question = j;
            //             Answer_box[j].style.display = (j === index && Answer_box[j].style.display === "none") ? "block" : "none";
            //         }
            //     };
            // }(i));
        }
        
    

        //Для вывода правильных ответов снизу
        for (var i = 0; i<statistics.length; i++){    
            Answer_box[i] = document.createElement('div2');
            Answer_box[i].style.width = "30%";
            Answer_box[i].style.borderRadius = "30px";
            Answer_box[i].style.display = "none"; // Скрываем изначально все ответы

            answer = document.createElement('div3');
            answer.style.width = "100%";
            Answer_box[i].appendChild(answer);

            root.appendChild(Answer_box[i]);
            let text_answer = document.createElement('p1');
            text_answer.innerHTML = statistics[i].correctAnswer;
            answer.appendChild(text_answer);

            var annotation;
            var answered = false;
            var number_question = 0;
            Question_box[i].addEventListener("click", function (index) {
                return function () {
                    if (!answered) {
                        annotation = document.createElement('p2');
                        annotation.style.paddingTop = '20px';
                        annotation.style.fontSize = '1.2em';
                        annotation.innerHTML = 'Правильный ответ на вопрос ' + (index + 1) + ':';
                        root.insertBefore(annotation, Answer_box[index]); //вставка перед ответом
                        answered = true;
                    } else {
                        annotation.innerHTML = 'Правильный ответ на вопрос ' + (index + 1) + ':';
                    }
        
                    // Скрываем все Answer_box, кроме текущего
                    for (var j = 0; j < 4; j++) { 
                        number_question = j;
                        if (j === index && Answer_box[j].style.display === "block") {
                            annotation.innerHTML = '';
                        }
                        Answer_box[j].style.display = (j === index && Answer_box[j].style.display === "none") ? "block" : "none";
                    }
                };
            }(i));
        }
    }
});

//функция, меняющая местами элементы массива
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//вывод при неправильном ответе
function WrongAnswer(Question_box){
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "10%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("fill", "#e18c8c");

        svg.setAttribute("animation", "fadeIn 3s");
        svg.setAttribute("viewBox", "0 0 1024 1024");

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM704 256c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64 28.654-64 64-64zM320 256c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64 28.654-64 64-64zM704.098 780.74c-39.174-65.148-110.544-108.74-192.098-108.74-81.556 0-152.924 43.592-192.098 108.74l-82.328-49.396c55.96-93.070 157.916-155.344 274.426-155.344 116.508 0 218.464 62.274 274.426 155.344l-82.328 49.396z");
        svg.appendChild(path);
        //плавное появление
        svg.classList.add("fadeIn");

        Question_box.appendChild(svg);
}

//вывод при правильном ответе
function RightAnswer(Question_box){
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "10%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("fill", "#92d472");
        svg.setAttribute("animation", "fadeIn 3s");
        svg.setAttribute("viewBox", "0 0 1024 1024");

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM704 256c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64 28.654-64 64-64zM320 256c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64 28.654-64 64-64zM512 832c-116.51 0-218.464-62.274-274.426-155.344l82.328-49.396c39.174 65.148 110.542 108.74 192.098 108.74s152.924-43.592 192.098-108.74l82.328 49.396c-55.962 93.070-157.916 155.344-274.426 155.344z");
        svg.appendChild(path);
        //плавное появление
        svg.classList.add("fadeIn");

        Question_box.appendChild(svg);

        
}


//удаление ответов
function moveAndRemoveAnswer(index,number_question) {
    if (index >= answer.length) {
        return; // Все нужные элементы были перемещены и удалены
    }
    if (index!=number_question) {
        // для плавного перемещения вниз
        answer[index].classList.add('slide-down-animation');

        setTimeout(function() {
            answer[index].remove(); // Удаляем текущий элемент
        }, 1200); 
    } 

    // Вызываем функцию для следующего элемента снова с задержкой
    setTimeout(function() {
        moveAndRemoveAnswer(index + 1,number_question);
    }, 400);
}




