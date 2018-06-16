# Зміни

## Серпень 2016

### New:

 * Landing Page
 * Leader, Project, Task views

## Липень 2016

 * Динаміка:
 * Створено модель проекту.
 * Створено сторінку додавання проекту: http://bigpolicy.eu/add-project
 * Створено базовий сервіс проектів (синглтон)
 * Можливість додавати проекти до списку проектів і бачити.
 * Додана можливість зберігати лідера (дякую за чудову роботу, Олексію)

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

 * Прилаштував Auth0 згідно з офдоками

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

* Donation is added to the target only after it's status confirmation in external system.
* Virtual Donations don't require confirmation.

### 2017-02-05 17:13

Donations feature:

 * Donations via LiqPay - initial version.
 * Virtual payments - initial version.
 * Payments history - initial version.
 * Leader - User matching.
 * WIP: FTUX for Registration.

 * Fixed login error (now user properly redirected).
 * Fixed display in Safari.

### 2017-02-17

 * Store Users' documents in their own GDrive, in the 'BigPolicy Files' folder.
 * If there's no such folder, it will be created for given user.

### 2017-03-11

 * Migrated to Angular CLI version 1.0.0.rc-1
 * DGrive authorization
  * Files view from files editing separation
  * Files ownership authorisation - user can edit his own files only
  * UX: file upload enhancement, progress display etc
  * Save Leader file list to DB after files editor update

### 2017-03-19 08:00

 * Ng2PaginationModule added
  * Front: https://github.com/michaelbromley/ng2-pagination
  * Back: https://github.com/edwardhotchkiss/mongoose-paginate
 * ProjectService uses pagination
 * HomeComponent and it's route added

### 2017-03-19 08:00

 * Ng CLi update to RC2
 * Get rid of date conversion in service
 * Get rid of extra date fields in Project model
 * Fix project pagination
 * Leader's project pagination

### 2017-03-20

 * Leaders filtering by arbitrary criteria is implemented between UI and DB
 * Oh home, show Leader having more than 2 projects etc.
 * User and Leader registration UX

### 2017-03-21

 * Automatic versioning implemented as combination of ts/node app and bash deployment script.
 * Version id is injected in both git log and app homepage

### 2017-03-21

 * Projects filtering by arbitrary criteria is implemented between UI and DB
 * On Profile page, Projects are divided into the ones with tasks and the ones lacking it.
 * Leaders pagination
 * Tasks pagination

### 2017-03-23

 * Leader service test added
 * Tasks filtering implemented
 * Заходи проекту, Закороткий опис

### 2017-03-24

 * Donations filtering by arbitrary criteria is implemented between UI and DB
 * Upgraded to Angular 4

### 2017-03-26

 * FireBase added
 * AngularFire Uploader added for Leader's photos

### 2017-03-27-31

 * Projects list on landing page
 * Leaders list on landing page
 * User and Leader registration UX
 * Leader, Projects and Tasks filtering from UI via DB
 * Version and build number autoincrement and injection into app
 * Testing started, leader service test added
 * Upgrade to Angular 4
 * File uploader done with Fab and Regular button styles using Firebase
 * Leader photo display
 * Getting random Leader and Project
 * Leader brief display for Home page
 * Leader data interface cleanup
 * Project brief display
 * Project image upload	and display
 * Flex applied

### 2017-04-09

 Валідацію для форми створення лідера.


Валідація працює так:
— Ім'я, Прізвище, місія та візія обов'язкові до заповнення.
— Довжина імені та прізвища має знаходитися між 2 і 50 літерами.
— Довжина місіх та візії має знаходитися між 10 і 999 літерами.
Це все, звичайно можна змінювати. Просто тепер це принципово контролюється.

### 2017-04-09

###
 * Responsive Layout for Home Page

 ### TODO/WIP:
 * Landing UX
 * Search by project / task / leader name etc.
