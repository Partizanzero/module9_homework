
/* Этап 1. Подготовка данных */

//XML, который будем парсить (XML - это текстовое представление данных)
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;
//console.log('xmlString', xmlString);


//Функция, которая будет парсить XML
function parseAnyXML(strXML) {

  //Создание экземпляра класса DOMParser(класс с интерфейсом парсинга HTML и XML.)
  const parser = new DOMParser();
  //console.log('parser', parser);

  /* Этап 2. Получение данных */

  //Парсинг XML (метод parseFromString(наш XML, тип данных который мы парсим) — преобразует XML в объект JavaScript в виде DOM.)
  const xmlDOM = parser.parseFromString(strXML, "text/xml");

  //Получение главной DOM-ноды
  const listNodes = xmlDOM.querySelector("list");

  //Получение всех DOM-нод с тегом <student>, т.е.получаем массив тегов <student>
  const studentNodes = listNodes.querySelectorAll("student");

  //объект JS (объект, состоящий из массивов с перечнем данных о студенте)
  const result = { list: [] }


  //Обходим массив тегов studentNodes:
  //создаем объект Студент,
  //получаем DOM-ноды для студента,
  //записываем значения полученных DOM-нод в объект Студент
  //добавляем полученный объект Студен в массив всех Студентов


  studentNodes.forEach((element) => {

    const student = new Object(); //создаем объект Студент

    //Получение всех DOM-нод для <student>
    const nameNode = element.querySelector("name");

    const studentFirstName = element.querySelector("first");
    const studentSecondName = element.querySelector("second");
    const studentAge = element.querySelector("age");
    const studentProf = element.querySelector("prof");

    const nameLang = nameNode.getAttribute("lang");

    //Записываем данные из полученных DOM-нод в объект student
    student.name = studentFirstName.textContent + " " + studentSecondName.textContent;
    student.age = Number(studentAge.textContent);
    student.prof = studentProf.textContent;
    student.lang = nameLang;

    //Добавляем объект student в массив
    result.list.push(student);

  });

  console.log(result);
}

parseAnyXML(xmlString);