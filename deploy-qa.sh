# bash deploy-qa.sh 9-recovered feat-leader-list
# $1 bck branch to save before deploy
# $2 base branch to deploy

git checkout -B deploy-qa-bck-$1 deploy-qa

git checkout deploy-qa
git merge $2 -X theirs -m 'deploy-update'
git merge 0221f2bd785d4961a1decea518fe5a4dd47b6f75 -X theirs -m 'gitignore-restore'

ng build -prod

git add .
git commit -m 'deploy-update-build'

git push deploy-qa deploy-qa --force

git checkout -B feat-temp
