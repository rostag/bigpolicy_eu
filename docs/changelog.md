# Зміни

## Липень 2016

* Динаміка:
* Створено модель проекту.
* Створено сторінку додавання проекту: http://bigpolicy.eu/add-project
* Створено базовий сервіс проектів (синглтон)
* Можливість додавати проекти до списку проектів і бачити.

* Додана можливість зберігати діяча (дякую за чудову роботу, Олексію)

### 08.08.2016

* Список лідерів завантажується з БД і відображається в UI - див. leader.list.component.ts.
* Форма створення лідера передає базові властивості лідера у контролер для збереження - leader.edit.component.ts.
* Реалізовано видалення лідера з БД - leader.list.component.ts та leader.service.ts
* Редагування існуючого лідера (а саме даних, завантажених із БД).
* Запрацювала сторінка лідера (з даними, завантаженими БД)

### 11.08.2016

* Перейменував каталог server на middleware і додав його як модуль до start.js
* Заново увімкнув QA-картридж MongoDB, added creds to docs.
* Задеплоїв на СЯ і запустив.
* Задеплоїв на Лайв і запустив. На лайві прийшлося перевстановити застосунок.

### 12.08.2016

Лайв-застосунок запрацював тут: https://live-europe.rhcloud.com/
Тепер він на адекватному NodeJS, як і раніше має ССЛ, додалася працююча БД

### 14.08.2016

 * Project CRUD / DB integration:
 * Added ability to Create Project
 * Ability to View Project
 * Ability to Edit Project
 * Ability to Delete Project
 * Project List, Project View, Project Editor
 * Implemented dynamic Landing page incl. leaders and projects count

### 15.08.2016

* Прилаштував Auth0 згідно з офдоками і https://github.com/auth0/angular2-jwt/issues/50

### 22.08.2016

User Model Added. Router extracted
Added Profile Service, Profile View for auth control
Local storage support added
Auth0 dependencies added
RC1-RC4 migration done
Added Custom Auth0 Login
Added Profile WIP
User Profile is working
Added Leader Email - form User Profile

### 20.09.2016 - Final NG

# Migration to Final: Angular2, Angular CLI and Material 2

Project was generated with Angular CLI version 1.0.0-beta.14. Use `ng --help` or go check out the [README](https://github.com/angular/angular-cli/blob/master/README.md).

### 21.10.2016 - Sharer

Now Project can be shared via Email, Mailgun service is used

### 26.10.2016 - Video For Everything (almost)!

Now Video can be addd to Leader, Video, and Task.

### 2017-02-05 17:13

Feature:

Donations via LiqPay - initial version.
Virtual Payments - initial version.
Payments history - initial version.
Leader - User matching.
WIP: FTUX.

Bugfixes:
- fixed login error (now user properly redirected).
- Display in Safari.

### 2017-03-11

Migrated to Angular CLI version 1.0.0.rc-1


## Rough TODO Further integrations:

Facebook Story
Google+
LinkedIn

Кабінет користувача поєднує проекти, показує їх по регіонах, грошах.


## Почитати:

* Про форматування дат:

https://angular.io/docs/ts/latest/api/common/index/DatePipe-class.html
𝕱
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
- будь ласка, переконайтеся, що ви їх знаєте і розумієте.
https://vsavkin.com/the-core-concepts-of-angular-2-c3d6cbe04d04

* https://blog.openshift.com/set-up-nodejs-mongodb-and-express-on-free-spatial-web-hosting/

* FB Integration:
https://developers.facebook.com/docs/sharing/opengraph

* 5 Rookie mistakes on Angular:
http://angularjs.blogspot.co.uk/2016/04/5-rookie-mistakes-to-avoid-with-angular.html

* Scan - apply a function to each item emitted by an Observable, sequentially, and emit each successive value
http://reactivex.io/documentation/operators/scan.html

* Tackling State
https://vsavkin.com/managing-state-in-angular-2-applications-caf78d123d02

* Angular 2 Authentication Revisited
https://medium.com/@blacksonic86/angular-2-authentication-revisited-611bf7373bf9#.d7n63c9g5

* Angular Icons:
https://klarsys.github.io/angular-material-icons/
