# bash deploy-qa.sh 9-recovered feat-leader-list
# $1 bck branch to save before deploy
# $2 base branch to deploy

# Get the version number from output of version increasing script
BP_APP_VERSION_ID=`node app-version.js`

echo "--------------------------------------"
echo "Version increase to $BP_APP_VERSION_ID"
echo "--------------------------------------"

git add . && git commit -m "Version increase to $BP_APP_VERSION_ID"

# back-up deploy branch
git checkout -B deploy-qa-bck-$1 deploy-qa

# create deploy branch
git checkout deploy-qa

# merge code to deploy branch
git merge $2 -X theirs -m 'deploy-update'

# build for deployment
ng build -prod

# commit build to deploy branch
git add . && git commit -m 'deploy-update-build'

# push deploy branch to it's repo
git push deploy-qa deploy-qa --force

# safely switch to temporary branch
git checkout -B feat-temp
