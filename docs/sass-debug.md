Read here:
https://github.com/sass/node-sass
https://github.com/sass/node-sass/issues/1662
https://github.com/sass/node-sass/issues/1847
https://github.com/sass/node-sass/blob/master/TROUBLESHOOTING.md#linuxosx
http://stackoverflow.com/questions/6975727/nodejs-no-response-to-npm-install
https://discourse.roots.io/t/npm-debugging-guidelines-failed-npm-install-bower-install-or-gulp-build-read-this/3060/4
https://docs.npmjs.com/getting-started/fixing-npm-permissions

[rendered][39m[22m

[1m[31mERROR in ./~/css-loader?{"sourceMap":false,"importLoaders":1}!./~/postcss-loader!./src/styles.css
Module not found: Error: Can't resolve '@angular/material/core/theming/prebuilt/deeppurple-amber.css' in '/var/lib/openshift/58efe3d92d5271636c000008/app-root/runtime/repo/src'
 @ ./~/css-loader?{"sourceMap":false,"importLoaders":1}!./~/postcss-loader!./src/styles.css 3:10-201
 @ ./src/styles.css
 @ multi ./src/styles.css ./src/bp-theme.scss[39m[22m

[1m[31mERROR in Child compilation failed:
Module build failed:
@import '~@angular/material/core/theming/all-theme';
^
      File to import not found or unreadable: ~@angular/material/core/theming/all-theme.
Parent style sheet: stdin
      in /var/lib/openshift/58efe3d92d5271636c000008/app-root/runtime/repo/src/app/shared/dialog/dialog.component.scss (line 2, column 1):
Error:
@import '~@angular/material/core/theming/all-theme';
