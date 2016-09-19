# bash deploy-live.sh 9-recovered feat-leader-list
# $1 bck branch to save before deploy
# $2 base branch to deploy

git checkout -B deploy-live-bck-$1 deploy-live

git checkout deploy-live
git merge $2 -Xtheirs -m 'deploy-update'

ng build -prod

#Workaround to copy auth0 assets
cp -r src/assets/js/ dist/assets/js

git add .
git commit -m 'deploy-update-build'

git push deploy-live deploy-live

git checkout $2
