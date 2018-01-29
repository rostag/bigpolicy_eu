# Build/update libs and run user pre_build and build
# gear build

# S E T U P
# TODO Make tsc and ng-cli conditional installation / cartridge
# npm install -g @angular/cli
# npm install -g typescript

npm install -g node-gyp

npm i--unsafe-perm node-sass

npm config set loglevel info

# npm install typescript@latest --save-dev

# npm uninstall -g @angular/cli
# npm cache clean
# npm install -g @angular/cli@latest

# rm -rf node_modules dist
# npm install --save-dev @angular/cli@latest


# To fix npm ERR! node-sass@3.8.0 install: `node scripts/install.js`:
rm -rf node_modules dist
npm cache clean
ln -s /usr/bin/nodejs /usr/bin/node
npm i--unsafe-perm node-sass
