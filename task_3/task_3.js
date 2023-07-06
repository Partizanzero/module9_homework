// Ищем поле, в которое будем вводить число
const inputNode = document.querySelector('input');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем ноду для вставки процесса загрузки или ошибок
const outputSpan = document.querySelector("span");

//вспомагательная функция для вывода сообщений о загрузке и ошибках в HTML-документ
function write(text) {
    outputSpan.innerHTML = text;
}


//Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', submitButtonHandle);

//функция, которая проверяет число, введенное в <input> и, если оно попадает в указанный диапазон, то
//запускает фукцию, которая будет делать запрос к удаленному серверу через XHR API для получения фото
function submitButtonHandle() {

    const numValue = inputNode.value; //получаем значение из поля <input>

    if (numValue >= 1 && numValue <= 10 && !isNaN(numValue)) {
        useRequest("https://picsum.photos/v2/list?limit=" + numValue, loadPhotos);
        write("Загружаю фото...");
    } else {
        write("Число вне диапазона от 1 до 10");
    }
}

//фукция, которая осуществляет запрос к удаленному серверу через XHR API на получение фото
/**
  * Функция-обертка над XMLHttpRequest, осуществляющая запрос:
  * url - урл, по которому будет осуществляться запрос
  * callback - функция, которая вызовется при успешном выполнении
  * и первым параметром получит объект-результат запроса
  */
function useRequest(url, callback) {

    //Создаем экзепляр класса XMLHttpRequest
    const xhr = new XMLHttpRequest();

    //Инициализируем запрос: тип HTTP запроса, URL запрос к которому реализуем, флаг синхр./аснхр. кода
    xhr.open('GET', url, true);

    // Добавляем обрабочик ответа сервера:
    //св-во, которому можно присвоить функцию, которая сработает, если запрос успешно обработается
    xhr.onload = function () {
        //если статус НЕ 200, то выводим, какой именно ответ сервера
        if (xhr.status !== 200) {
            write('Статус  ответа', xhr.status);
        } else {
            //если статус 200, то сервер отдаст данные в формате JSON,
            //поэтому их надо распарсить
            const result = JSON.parse(xhr.response);

            //функция, которая вызовется при успешном выполнении,
            //передаем в нее объект JS (т.е. распарсенный JSON)
            if (callback) {
                callback(result);
            }
            write('Фото загружены');
        }
    };

    //Добавляем обрабочик ошибок сервера
    xhr.onerror = function () {
        write('Ошибка! Статус ответа: ', xhr.status);
    };

    //Отправляем запрос
    xhr.send();
};


/* callback - функция для сборки фото и вставки на страницу
   apiData - объект с результатом запроса
*/

function loadPhotos(apiData) {
    /*создаем строку-счетчик с фотографиями для вставки в наш HTML-документ:
    изначально строка пустая, т.к. в ней еще нет фотографий.

    Далее в коде innerHTML сам разберет, полученную в результате строку с фото, на нужные теги 
    и вставит в наш HTML-документ
    */
    let cards = '';


    apiData.forEach(item => {

        //получаем одну новую фотографию с нужными параметрами
        const cardBlock = `
            <div>
        <img class="card-image" src="${item.download_url}" style="width: 150px; margin-right: 30px"/>
        <p>${item.author}</p>  
        </div>`

        //на каждой итерации добавляем к строке с фото строку с новой фотографией
        cards = cards + cardBlock;
    });

    //вставляем все полученные фото в <div class="j-result">, который у нас получен в const resultNode
    resultNode.innerHTML = cards;
}



