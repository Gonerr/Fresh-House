

// функция, которая будет прокручивать страницу вверх
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Добавляем плавную анимацию прокрутки
    });
}

// Показываем кнопку "Наверх" при прокрутке
window.addEventListener('scroll', function() {
    const sector = document.getElementById('sector');
    const scrollTopButton = document.getElementById('up-btn');
    
    // Если мы находимся на втором слайде и прокрутка больше 100 пикселей
    if (window.scrollY > sector.offsetTop) {
        scrollTopButton.style.display = "block";
    } else {
        scrollTopButton.style.display = "none";
    }
});

// обработчик события для кнопки "Наверх"
document.getElementById('up-btn').addEventListener('click', scrollToTop);



document.querySelector(".icon").addEventListener("click", function () {
    var menu = document.querySelector(".mobile-menu");
    menu.classList.toggle("open");
  });
  
  // Закрыть меню, если клик вне меню
  document.addEventListener("click", function (event) {
    var menu = document.querySelector(".mobile-menu");
    var icon = document.querySelector(".icon02");
    if (menu.classList.contains("open") && !menu.contains(event.target) && event.target !== icon) {
      menu.classList.remove("open");
    }
  });
  