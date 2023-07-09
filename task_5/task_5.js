// Ищем поле, в которое будем вводить номер страницы
const inputPageNumber = document.getElementById('page-number');
// Ищем поле, в которое будем вводить лимит страниц
const inputLimit = document.getElementById('limit');
// Ищем кнопку, по нажатии на которую будет запрос к серверу
const submitButton = document.querySelector('.btn');
// Ищем ноду для вставки процесса загрузки или ошибок
const outputSpan = document.querySelector('span');
// Ищем ноду для вставки результата запроса
const photosContainer = document.querySelector('.result');

//Вешаем обработчик на кнопку для запроса
submitButton.addEventListener('click', submitButtonHandle);

//Если в LocalStorage есть фото, то загружаем их
if (loadPhotosFromLocalStorage())
    write("Загружены последние просмотренные фото.");

//вспомогательная функция для вывода сообщений о загрузке и ошибках в HTML-документ
function write(text) {
    outputSpan.innerHTML = text;
}

//функция, которая проверяет числа, введенное в <input> и, если они попадают в указанный диапазон, то
//будет делать запрос к удаленному серверу для получения фото, используя fetch 

function submitButtonHandle() {

    const pageNumber = inputPageNumber.value;
    const limit = inputLimit.value;

    if ((pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) && (limit < 1 || limit > 10 || isNaN(limit))) {
        write('Номер страницы и лимит вне диапазона от 1 до 10.');
        return
    }

    else if (pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) {
        write("Номер страницы вне диапазона от 1 до 10.");
        return;
    } else if
        (limit < 1 || limit > 10 || isNaN(limit)) {
        write("Лимит вне диапазона от 1 до 10.");
        return;
    }

    write('Загружаю фото... ');

    //делаем запрос за данными-фото
    fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`)

        //получаем ответ на запрос в виде json
        .then((response) => response.json())

        //парсим полученный json и обрабатываем фото для вставки в <div>
        .then((json) => {
            loadPhotos(json);

            //сохраняем полученные фото в LocalStorage
            savePhotosToLocalStorage();
            write('Фото загружены');
        })

        //обрабатываем ошибку, если она есть
        .catch((reason) => {
            write("Ошибка: " + reason);
        });
}


//callback - функция для сборки фото и вставки на страницу
function loadPhotos(apiData) {

    /*создаем строку-счетчик с фотографиями для вставки в наш HTML-документ:
    изначально строка пустая, т.к. в ней еще нет фотографий.

    Далее в коде innerHTML сам разберет, полученную в результате строку с фото, на нужные теги 
    и вставит в наш HTML-документ
    */
    let cards = String();

    //обходим массив с полученными фото и каждое фото вставляем в div
    apiData.forEach(item => {

        //формируем блок с одной фото
        const cardBlock = `<div>

    <img src="${item.download_url}" style="width: 150px; margin-right: 30px" />
    <p>${item.author}</p>
    </div>`;

        //на каждой итерации добавляем к строке с фото строку с новой фотографией
        cards += cardBlock;
    });


    //вставляем все полученные фото в <div class="result">, который у нас получен в const photosContainer
    photosContainer.innerHTML = cards;
}

//запишем данные в LocalStorage
function savePhotosToLocalStorage() {
    localStorage.setItem('last_photos', photosContainer.innerHTML);
}

function loadPhotosFromLocalStorage() {
    //получаем данные из LocalStorage по нашему ключу - last_photos
    photosContainer.innerHTML = localStorage.getItem('last_photos');

    //если кол-во символов в строке из innerHTML больше нуля (т.е. содержит данные-фото), то вернуть эту строку с уже записанными в нее фото
    return photosContainer.innerHTML.lenght > 0;
}








