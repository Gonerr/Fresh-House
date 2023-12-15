var helpButtonClicked = false;

function help(){
    if (helpButtonClicked) {
        return; 
    }
    const container = document.createElement('div');
    container.className = 'second-text help';

    // Создаем и добавляем SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1024 1024');
    svg.classList.add('Close');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM512 928c-229.75 0-416-186.25-416-416s186.25-416 416-416 416 186.25 416 416-186.25 416-416 416z');
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M672 256l-160 160-160-160-96 96 160 160-160 160 96 96 160-160 160 160 96-96-160-160 160-160z');

    svg.appendChild(path1);
    svg.appendChild(path2);
    container.appendChild(svg);

    svg.addEventListener('click', function() {
        container.remove();
        helpButtonClicked = false;
    });
    helpButtonClicked = true;
    // Создаем и добавляем текст
    const textContainer = document.createElement('span');
    
    const text1 = document.createElement('span');
    text1.innerHTML = 'Название игры ненавязчиво намекает вам на то, что вся игра будет основана на поиске каких-либо слов, поэтому приготовьтесь искать!<br/>';
    textContainer.appendChild(text1);
    const text2 = document.createElement('span');
    text2.innerHTML = 'Вас ожидают три непохожих друг на друга уровня, каждый из которых вы можете закончить, нажав на кнопку выхода (слева от заголовка уровня). На каждый уровень дается органическое количество времени: всё зависит от уровня сложности, который вы выбрали.<br/>';
    textContainer.appendChild(text2);
    const text3 = document.createElement('span');
    text3.innerHTML = 'Вы можете ошибаться неограниченное число раз, однако учтите, что за каждую ошибку вы теряете баллы!<br/>';
    textContainer.appendChild(text3);
    const text4 = document.createElement('span');
    text4.innerHTML = '<br/>На каждом уровне вас ждут 5 различных заданий:<br/>';
    textContainer.appendChild(text4);

    // Добавляем список
    const listContainer = document.createElement('ul');
    const li1 = document.createElement('li');
    li1.classList.add('helpLi', 'list-item');

    const text5 = document.createElement('span');
    text5.innerHTML = 'Первый уровень<br />Вам будет необходимо как можно скорее нажимать на слова в порядке, указанном в задании. Нажатие происходит посредством клика';
    li1.appendChild(text5);
    const li2 = document.createElement('li');
    li2.classList.add('helpLi', 'list-item');
    const text6 = document.createElement('span');
    text6.innerHTML = 'Второй уровень<br />Данное задание основывается на взаимодействии пользователя с клавиатурой: необходимо как можно скорее и без ошибок нажимать на соответствующие цифры на клавиатуре';
    li2.appendChild(text6);
    const li3 = document.createElement('li');
    li3.classList.add('helpLi', 'list-item');
    const text7 = document.createElement('span');
    text7.innerHTML = 'Третий уровень<br />Попробуйте повзаимодействовать со словами напрямую, перетаскивая их из одной части предложения в другую. Наводите перетаскиваемый элемент на слово, перед которым хотите поставить данный элемент';
    li3.appendChild(text7);

    listContainer.appendChild(li1);
    listContainer.appendChild(li2);
    listContainer.appendChild(li3);
    textContainer.appendChild(listContainer);
    container.appendChild(textContainer);

    if (ChangeColor){
        container.style.color = "white";
        container.style.backgroundColor = "#22212b";
    }

    document.getElementById("game").appendChild(container);
}



let container = document.querySelector('.right-side');
var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('viewBox', '0 0 1024 1024');

let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
path.setAttribute('d', 'M152 792l76-78 60 60-76 78zM470 958v-126h84v126h-84zM512 234q106 0 181 75t75 181-75 181-181 75-181-75-75-181 75-181 181-75zM854 448h128v86h-128v-86zM736 774l60-58 76 76-60 60zM872 190l-76 76-60-60 76-76zM554 24v126h-84v-126h84zM170 448v86h-128v-86h128zM288 206l-60 60-76-76 60-60z');
svg.appendChild(path);

svg.classList = "sun";

container.insertBefore(svg, container.firstChild);


var isStateOne = true;

// Функция для изменения состояния
function toggleState() {
  if (isStateOne) {
    // Изменяем атрибуты пути для второго состояния
    path.setAttribute('d', 'M152 792l76-78 60 60-76 78zM470 958v-126h84v126h-84zM512 234q106 0 181 75t75 181-75 181-181 75-181-75-75-181 75-181 181-75zM854 448h128v86h-128v-86zM736 774l60-58 76 76-60 60zM872 190l-76 76-60-60 76-76zM554 24v126h-84v-126h84zM170 448v86h-128v-86h128zM288 206l-60 60-76-76 60-60z');
    changeColorScheme();

} else {
    // Изменяем атрибуты пути для первого состояния
    path.setAttribute('d', "M721.143 744.571c-20.571 3.429-41.714 5.143-62.857 5.143-212 0-384-172-384-384 0-72.571 21.143-143.429 59.429-204-152 45.143-260.571 184.571-260.571 350.286 0 201.714 164 365.714 365.714 365.714 110.286 0 213.714-50.286 282.286-133.143zM837.143 696c-71.429 154.857-228 254.857-398.286 254.857-241.714 0-438.857-197.143-438.857-438.857 0-237.143 185.714-429.714 422.286-438.286 16-0.571 29.143 8.571 34.857 22.286 6.286 14.286 2.286 30.857-8.571 41.143-65.143 59.429-101.143 140.571-101.143 228.571 0 171.429 139.429 310.857 310.857 310.857 45.143 0 88.571-9.714 130.286-29.143 14.286-6.286 30.286-3.429 41.143 7.429s13.714 27.429 7.429 41.143z");
    changeColorScheme();

}

  // Инвертируем состояние
  isStateOne = !isStateOne;
}

// Добавляем обработчик события click
svg.addEventListener("click", toggleState);
var ChangeColor = false;

function changeColorScheme() {
    // Получаем ссылку на элемент game-container
    var gameContainer = document.getElementById("game");
    var ctaButtons = document.querySelectorAll(".cta-btn");
    


    // Переключаем цветовую схему, добавляя или удаляя класс
    if (gameContainer.classList.contains("dark-mode")) {
      gameContainer.classList.remove("dark-mode");
      ctaButtons.forEach(function(button) {
            button.classList.remove("dark-mode");
      });
      ChangeColor = false;


      document.querySelector(".header").classList.remove("dark-mode");
      document.querySelector(".main-back").classList.remove("dark-mode");
      document.querySelector(".second-text").classList.remove("dark-mode");
      document.querySelector(".name-of-game").classList.remove("dark-mode");
      document.querySelector(".name-of-game .text2").classList.remove("dark-mode");
      document.getElementById("query_user").classList.remove("dark-mode");
    } else {

      ChangeColor = true;
      document.querySelector(".header").classList.add("dark-mode");
      document.querySelector(".main-back").classList.add("dark-mode");
      document.querySelector(".second-text").classList.add("dark-mode");
      document.getElementById("query_user").classList.add("dark-mode");
      document.querySelector(".name-of-game").classList.add("dark-mode");
      document.querySelector(".name-of-game .text2").classList.add("dark-mode");
      ctaButtons.forEach(function(button) {
            button.classList.add("dark-mode");
      });
      gameContainer.classList.add("dark-mode");
    }
  }