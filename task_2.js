/* Этап 1. Подготовка данных */

// JSON, который мы будем парсить
const jsonString = `
{
	"list": [
	 {
	  "name": "Petr",
	  "age": "20",
	  "prof": "mechanic"
	 },
	 {
	  "name": "Vova",
	  "age": "60",
	  "prof": "pilot"
	 }
	]
   }
   `;
//console.log('jsonString', jsonString);

//Функция, которая будет парсить XML
function parseAnyJSON(jsonStr) {

    //преобразуем JSON в объект JavaScript
    const data = JSON.parse(jsonStr);

    /* Этап 2. Получение данных */

    //Парсинг JSON (получаем массив, содержащий в себе массив объектов - студентов)
    const students = data.list;
    //console.log('students', students);

    //объект JS (объект, состоящий из массивов с перечнем данных о студенте)
    const result = { students: [] };

    //создаем объект Студент
    let student = new Object();


    //Обходим распарсенный из JSON массив students:
    students.forEach(function (elem) {
        student = elem;
        result.students.push(student);
    });

    console.log(result);
}
parseAnyJSON(jsonString);
