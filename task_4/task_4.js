
// Ищем поле, в которое будем вводить ширину
const inputWidth = document.getElementById("width");
// Ищем поле, в которое будем вводить высоту
const inputHeight = document.getElementById("height");
// Ищем кнопку, по нажатии на которую будет запрос
const submitButton = document.querySelector("button");
// Ищем ноду для вставки процесса загрузки или ошибок
const outputSpan = document.querySelector("span");
// Ищем ноду для вставки результата запроса
const photosContainer = document.querySelector("div");

//Вешаем обработчик на кнопку для запроса
submitButton.addEventListener('click', submitButtonHandle);

//вспомагательная функция для вывода сообщений о загрузке и ошибках в HTML-документ
function write(text) {
    outputSpan.innerHTML = text;
}

//функция, которая проверяет число, введенное в <input> и, если оно попадает в указанный диапазон, то
//запускает фукцию, которая будет делать запрос к удаленному серверу через XHR API для получения фото

function submitButtonHandle() {

    const width = inputWidth.value;
    const height = inputHeight.value;

    if ((width < 100 || width > 300 || isNaN(width)) || (height < 100 || height > 300 || isNaN(height))) {
        write("Одно из чисел вне диапазона от 100 до 300.");
        return;
    } else {
        write("Загружаю фото...");
    }

    //делаем запрос за данными
    fetch('https://picsum.photos/${width}/${height}')
        .then((response) => response.url)
        .then((result) => {
            loadPhoto(result);
            write("Фото загружено.");
        })
        .catch((reason) => {
            write("Ошибка: " + reason);
        });

}

//callback - функция для сборки фото и вставки на страницу
function loadPhoto(photoUrl) {
    const cardBlock = `
<img src="src="${photoUrl}" style="margin-right: 30px" />`;
    //вставляем все полученные фото в <div>, который у нас получен в const photosContainer
    photosContainer.innerHTML = cardBlock;
}

