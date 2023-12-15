

// Функция для вывода списка игроков
document.addEventListener('DOMContentLoaded', function () {
    var storedUserData = localStorage.getItem("userData");
    var userData = storedUserData ? JSON.parse(storedUserData) : null;
    console.log(userData);

    // Получение существующих данных из файла, если они есть
    var existingData = localStorage.getItem("allUserData");
    var allUserData = existingData ? JSON.parse(existingData) : [];

    var isUserExist = allUserData.some(function (existingUser) {
        return (existingUser.playerName === userData.playerName && existingUser.currentDifficulty === userData.currentDifficulty && existingUser.currentTotalScore === userData.currentTotalScore);
      });

    // Добавление новых данных пользователя в массив
    if (!isUserExist){
        allUserData.push(userData);
    }

    // Сортировка массива по убыванию очков
    allUserData.sort((a, b) => b.currentTotalScore - a.currentTotalScore);

    allUserData.forEach(function (userData) {
        var user = document.createElement("span");
        user.innerText = userData.playerName + ' | ' + userData.currentDifficulty + ' | ' + userData.currentTotalScore;
        user.id = "Name";
        listOfPlayers.appendChild(user);
      });

    // Сериализация массива в строку JSON и сохранение в Local Storage
    localStorage.setItem("allUserData", JSON.stringify(allUserData));


});

function Repeat() {
  window.location.href = "index.html";
}