var helpButtonClicked = false;

function help(){
    if (helpButtonClicked) {
        return; 
    }
    const container = document.createElement('div');
    container.className = 'second_text help';

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

    document.getElementById("game").appendChild(container);
}