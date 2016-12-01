# bash deploy-qa.sh 9-recovered feat-leader-list
# $1 bck branch to save before deploy
# $2 base branch to deploy

git checkout -B deploy-qa-bck-$1 deploy-qa

git checkout deploy-qa
git merge $2 -X theirs -m 'deploy-update'

ng build -prod

git add . && git commit -m 'deploy-update-build'

git push deploy-qa deploy-qa --force

git checkout -B feat-temp
