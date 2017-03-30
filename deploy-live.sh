# bash deploy-live.sh 9-recovered feat-leader-list
# $1 bck branch to save before deploy
# $2 base branch to deploy

# Get the version number from output of version increasing script
BP_APP_VERSION_ID=`node app-version.js`

echo "--------------------------------------"
echo "----------B I G D E P L O Y-----------"
echo "--------------------------------------"
echo "Version increase to $BP_APP_VERSION_ID"
echo "--------------------------------------"

git add . && git commit -m "Version increase to $BP_APP_VERSION_ID"

# back-up deploy branch
git checkout -B deploy-live-bck-$1 deploy-live

# create deploy branch
git checkout deploy-live

# merge code to deploy branch
git merge $2 -X theirs -m 'deploy-update'

# build for deployment
ng build -prod

# commit build to deploy branch
git add . && git commit -m 'deploy-update-build'

# push deploy branch to it's repo
git push deploy-live deploy-live --force

# safely switch to temporary branch
git checkout -B feat-temp

echo "----------B I G D E P L O Y-----------"
echo " ---------------      --------------- "
echo "    ------------  🇺🇦   -----------    "
echo "             -------------            "
echo "                                      "

# WAS:
# git checkout -B deploy-live-bck-$1 deploy-live
#
# git checkout deploy-live
# git merge $2 -X theirs -m 'deploy-update'
#
# ng build -prod
#
# git add . && git commit -m 'deploy-update-build'
#
# git push deploy-live deploy-live --force
#
# git checkout -B feat-temp
