# QA deployment script.
#
# Sample usage: bash deploy-qa.sh backup-1 develop
#
# Params:
# $1 - arbitrary name of backup branch to save before deploy
# $2 - branch to deploy

# Get the version number from output of version increasing script
BP_APP_VERSION_ID=`node app-version.js`

echo "--------------------------------------"
echo "----------B I G D E P L O Y-----------"
echo "--------------------------------------"
echo "Version increase to $BP_APP_VERSION_ID"
echo "--------------------------------------"

git add . && git commit -m "Version increase to $BP_APP_VERSION_ID"

### 0. Back-up deployment branch (safety - can be skipped)
git checkout -B deploy-qa-bck-$1 deploy-qa

### 1. Switch to deployment branch
git checkout deploy-qa

### 2. Merge code to deploy branch from [branch to deploy]
git merge $2 -X theirs -m 'deploy-update'

### 3. Build the application
ng build -prod

### 4. Commit build files to deploy branch
git add . && git commit -m 'deploy-update-build'

### 5. Push deploy branch to remote repo
git push remote-qa deploy-qa --force

### 6. Switch to temporary branch (safety - can be skipped)
git checkout -B feat-temp

echo "----------B I G D E P L O Y-----------"
echo " ---------------      --------------- "
echo "    ------------  🇺🇦   -----------    "
echo "             -------------            "
echo "                                      "
