# Instructions for QA deployment from local repo

## Setup

This step should be done only once for your local repo setup. You need a remote to push build files to. Check remotes in your local repo: `git remote -v` - see the list of remote names with URIs.

Initially, there's only `origin` remote. Add a `remote-qa` remote for OpenShift deployment:

`git remote add remote-qa [URI of QA app repo you've got from OpenShift]`

Now, you're ready to deploy a local build to remote branch.

## Deploy

Use 'deploy-qa.sh' script or do it manually:

### 1. Switch to deployment branch
git checkout deploy-qa

### 2. Merge code to deploy branch from [branch to deploy]
git merge [branch to deploy] -X theirs -m 'Code for deployment build'

### 3. Build the application
ng build --prod

### 4. Commit build files to deploy branch
git add . && git commit -m 'Deployment build'

### 5. Push deploy branch to remote repo
git push remote-qa deploy-qa --force

### That's all

## But, how to deploy Live?

Live deployment is exactly the same. You only need to replace the `remote-qa` with `remote-live` and `deploy-qa` with `deploy-live` in the steps above.

## Back-up and safety

You can do two extra steps before and after the main steps:

### 0. Back-up deployment branch
git checkout -B deploy-qa-bck-any-name-can-be-here deploy-qa

### 6. Switch to temporary branch
git checkout -B feat-temp

## More on deployment

To learn more how it works and how to fix deployment issues please see [deploy doc](https://github.com/rostag/bigpolicy_eu/blob/develop/docs/deploy.doc.md):
