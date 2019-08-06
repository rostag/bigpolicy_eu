## Added June 24 2018

New, multi- and lazy- module build:

Rosty-MacBook-Pro:bp rosty$ ng build -prod -aot -vc -cc -dop --buildOptimizer
Date: 2018-06-23T21:31:08.335Z                                                            
Hash: 92c1eba0406d958b5421
Time: 56918ms
chunk {0} 0.39fc85c879a6447d5734.chunk.js () 1.18 MB  [rendered]
chunk {1} 1.f98e6bf7fa38ac40ea12.chunk.js () 16.5 kB  [rendered]
chunk {2} polyfills.d70ddd9936eae58a8f3f.bundle.js (polyfills) 171 kB [initial] [rendered]
chunk {3} main.3fefc6780ca10203e1e2.bundle.js (main) 90.4 kB [initial] [rendered]
chunk {4} styles.f6da73b2af83b0e798f4.bundle.css (styles) 84.8 kB [initial] [rendered]
chunk {5} vendor.6fc068960a6795641ed6.bundle.js (vendor) 1.09 MB [initial] [rendered]
chunk {6} inline.f900706f752ec2fd5c56.bundle.js (inline) 1.42 kB [entry] [rendered]

Old, Single-module build:

Rosty-MacBook-Pro:bp rosty$ ng build -prod -aot -vc -cc -dop --buildOptimizer
Date: 2018-06-23T21:41:29.119Z                                                            
Hash: 39834dbb1148a7407011
Time: 74081ms
chunk {0} polyfills.8a8b270607b225012f9c.bundle.js (polyfills) 171 kB [initial] [rendered]
chunk {1} main.c959d01c1a1e51a3f871.bundle.js (main) 547 kB [initial] [rendered]
chunk {2} styles.f6da73b2af83b0e798f4.bundle.css (styles) 84.8 kB [initial] [rendered]
chunk {3} vendor.c34f14a962cd582368a1.bundle.js (vendor) 1.82 MB [initial] [rendered]
chunk {4} inline.31e1fb380eb7cf3d75b1.bundle.js (inline) 796 bytes [entry] [rendered]
Rosty-MacBook-Pro:bp rosty$ 

## Added May 20 2018 - on user mgmt:
https://hackernoon.com/how-to-build-a-node-js-user-management-app-12d900695ef6

## Rough TODO Further integrations:

+ Facebook Story
+ Google+
+ LinkedIn

+ Кабінет користувача поєднує проекти, показує їх по регіонах, грошах.

## Почитати:

* Cheatsheet: https://angular.io/docs/ts/latest/guide/cheatsheet.html

* Singleton: http://twofuckingdevelopers.com/2015/04/angular-2-singleton-service/

* HTTP: https://auth0.com/blog/angular-2-series-part-3-using-http/

Фреймворк Angular 2 включає в себе RxJS як місток до реактивного програмування. Практично це означає, наприклад, що HTTP-запити у вашому застосунку повертають об'єкти типу Observable, що є однією з основних концепцій Angular 2.

Отже, щоб успішно працювати з цим, варто вивчити доки:

* Текст від розробника Angular 2 Віктора Савкіна про те, як працюють Observables: https://vsavkin.com/change-detection-in-angular-2-4f216b855d4c

* Блог про те, як вони використовуються в Angular 2 HTTP, і як це відрізняється від Angular 1: http://chariotsolutions.com/blog/post/angular2-observables-http-separating-services-components/

* Текст Віктора Савкіна про основні концепції Angular 2:
- будь ласка, переконайтеся, що ви їх знаєте і розумієте. https://vsavkin.com/the-core-concepts-of-angular-2-c3d6cbe04d04

* https://blog.openshift.com/set-up-nodejs-mongodb-and-express-on-free-spatial-web-hosting/

* FB Integration: https://developers.facebook.com/docs/sharing/opengraph

* 5 Rookie mistakes on Angular: http://angularjs.blogspot.co.uk/2016/04/5-rookie-mistakes-to-avoid-with-angular.html

* Scan - apply a function to each item emitted by an Observable, sequentially, and emit each successive value http://reactivex.io/documentation/operators/scan.html

* Tackling State: https://vsavkin.com/managing-state-in-angular-2-applications-caf78d123d02

* Angular 2 Authentication Revisited: https://medium.com/@blacksonic86/angular-2-authentication-revisited-611bf7373bf9#.d7n63c9g5

* Angular Icons: https://klarsys.github.io/angular-material-icons/
