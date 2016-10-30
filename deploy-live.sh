# bash deploy-live.sh 9-recovered feat-leader-list
# $1 bck branch to save before deploy
# $2 base branch to deploy

git checkout -B deploy-live-bck-$1 deploy-live

git checkout deploy-live
git merge $2 -X theirs -m 'deploy-update'
git merge 0221f2bd785d4961a1decea518fe5a4dd47b6f75 -X theirs -m 'gitignore-restore'

ng build -prod

git add .
git commit -m 'deploy-update-build'

git push deploy-live deploy-live --force

git checkout -B feat-temp
