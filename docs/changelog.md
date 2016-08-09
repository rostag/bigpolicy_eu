# Зміни

## Липень 2016

* Динаміка:
* Створено модель проекту.
* Створено сторінку додавання проекту: http://bigpolicy.eu/add-project
* Створено базовий сервіс проектів (синглтон)
* Можливість додавати проекти до списку проектів і бачити.

* Додана можливість зберігати діяча (дякую за чудову роботу, Олексію)

08.08.2016

* Список лідерів завантажується з БД і відображається в UI - див. leader.list.component.ts.
* Форма редагування лідера передає базові властивості лідера у контролер для збереження - leader.edit.component.ts.
* Реалізовано видалення лідера - leader.list.component.ts та leader-list.service.ts

## Почитати:

* Про форматування дат:

https://angular.io/docs/ts/latest/api/common/index/DatePipe-class.html

* Cheatsheet:

https://angular.io/docs/ts/latest/guide/cheatsheet.html

* Singleton:
http://twofuckingdevelopers.com/2015/04/angular-2-singleton-service/

* Theming:
http://stackoverflow.com/questions/38734518/changing-primary-color-in-angular-material-2

* HTTP
https://auth0.com/blog/angular-2-series-part-3-using-http/

Фреймворк Angular 2 включає в себе RxJS як місток до реактивного програмування. Практично це означає, наприклад, що HTTP-запити у вашому застосунку повертають об'єкти типу Observable, що є однією з основних концепцій Angular 2.

Отже, щоб успішно працювати з цим, варто вивчити доки:

* Текст від розробника Angular 2 Віктора Савкіна про те, як працюють Observables:
https://vsavkin.com/change-detection-in-angular-2-4f216b855d4c

* Блог про те, як вони використовуються в Angular 2 HTTP, і як це відрізняється від Angular 1:
http://chariotsolutions.com/blog/post/angular2-observables-http-separating-services-components/

* Текст Віктора Савкіна про основні концепції Angular 2:
https://vsavkin.com/the-core-concepts-of-angular-2-c3d6cbe04d04

 - будь ласка, переконайтеся, що ви їх знаєте і розумієте.
