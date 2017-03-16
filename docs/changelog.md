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

 * Лайв-застосунок запрацював тут: https://live-europe.rhcloud.com/
 * Тепер він на адекватному NodeJS, як і раніше має ССЛ, додалася працююча БД

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

 * User Model Added. Router extracted
 * Added Profile Service, Profile View for auth control
 * Local storage support added
 * Auth0 dependencies added
 * RC1-RC4 migration done
 * Added Custom Auth0 Login
 * Added Profile WIP
 * User Profile is working
 * Added Leader Email - form User Profile

### 20.09.2016 - Final NG

 * Migration to Final: Angular2, Angular CLI and Material 2
 * Project was generated with Angular CLI version 1.0.0-beta.14. Use `ng --help` or go check out the [README](https://github.com/angular/angular-cli/blob/master/README.md).

### 21.10.2016 - Sharer

 * Now Project can be shared via Email, Mailgun service is used.

### 26.10.2016 - Video For Everything (almost)!

 * Now Video can be addd to Leader, Video, and Task.

## 2017

### 2017-02-05 17:13

Donations feature:

 * Donations via LiqPay - initial version.
 * Virtual Payments - initial version.
 * Payments history - initial version.
 * Leader - User matching.
 * WIP: FTUX for Registration.

Bugfixes:

 * fixed login error (now user properly redirected).
 * Display in Safari.

### 2017-02-17

 * Store users' files in their own GDrive, in the 'BigPolicy Files' folder.
 * If there's no such folder, it will be created for given user.

### 2017-03-11

 * Migrated to Angular CLI version 1.0.0.rc-1
