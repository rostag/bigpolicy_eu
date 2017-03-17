#BigDeploy

QA and Live deployment is possible by pushing the updated build files, usually located in 'dist' folder, to the remote OpenStack repo using 'git push' command.

To make it possible, you need to make sure you have the appropriate remote set up in your local git repo first.

Note: in the text below, we'll name OpenStack just as 'OS'.

## Adding OS remotes to your local repo

Let's check existing remotes by this command:

`git remote -v`

You will see the list of remotes for your repo and their URIs. Probably, you will only see the `origin` remote for you repo, so you will need to add remotes pointing to appropriate OS repos, QA and Live appropriately:

### Adding QA App Remote

`git remote add deploy-qa [URI of QA app repo you've got from OS]`

### Adding Live App Remote

`git remote add deploy-live [URI of Live app repo you've got from OS]`

*Please note:* In this doc remotes for deployment and corresponding deployment branches have the same names: `deploy-qa` is a branch and  `deploy-qa` is a remote; `deploy-live` is a branch and `deploy-live` is a remote. If it confuses you, you can use different names for remotes (but not branches), like `remote-qa` and `remote-live`, it's up to you how to name them in your local repo. But here, we use the same names for branch and remote this branch is going to be pushed to.

## Deploying changes to QA

To make changes in develop branch visible on QA, you need to merge it with develop, then build a version, commit it to 'deploy-qa' branch which is a deployment branch for QA App, and push this branch it to `deploy-qa` remote.

The push must be made against so called 'deployment branch' which is a branch you selected on OS as the branch for deployment (check OS doc for more info if needed — here, we use already defined deployment branches, `deploy-qa` and `deploy-live` (they have the same as remotes, as it was told above).

### Checkout `deploy-qa`branch and merge it with develop:

`git checkout deploy-qa && git merge develop`

### Build and commit build result (usually 'dist' folder):

`ng build -prod && git add . && git commit -m 'deploy update'`

*Please note*: you need to build in deployment branch, not develop, because develop ignores the 'dist' folder by purpose to avoid storing it in the main repo.

### Push updated `deploy-qa` branch to `deploy-qa` remote:

`git push deploy-qa deploy-qa`

## Deploying changes to Live

The steps are the same as for deploying to QA, the only difference is remote name and deployment branch name, where you just replace '-qa' with '-live'

Please make sure you tested your changes on QA before deploying to Live, otherwise you can make production broken.

### Checkout `deploy-live` branch and merge it with `develop`:

`git checkout deploy-live && git merge develop`

### Build and commit build result:

`ng build -prod && git add . && git commit -m 'deploy update'`

### Push updated `deploy-live` branch to `deploy-live` remote:

`git push deploy-live deploy-live`

This will start deployment process on OS app after push and application will be restarted.

*Please note:* if you haven't madd any changes, app won't be pushed to remote.

### Please read:

* https://blog.openshift.com/introduction-to-deployments-and-rollbacks-on-openshift/

### Known Deploy Issues

*1. Error:* `Uncaught SyntaxError: Unexpected token <`
*Cause:* Some bundled JS isn't loaded.
*Root cause:* possible addition change of 'dist' folder into '.gitignore' of the deploy branch.
*Solution:* fix .gitignore in deploy branch.
*Final Solution:* reorganize folders, e.g. move dist out of source folder to avoid gitignoring it.

*2. Error:* 'Not found' on the main page.
*Cause, Root cause, Solution, Final Solution:* The same as in #1

### Recent deploy notes

remote: ┌─────────────────────────────────────────────────────────────────────────────────────────┐
remote: │                                 npm update check failed                                 │
remote: │                           Try running with sudo or get access                           │
remote: │                          to the local update config store via                           │
remote: │ sudo chown -R $USER:$(id -gn $USER) /var/lib/openshift/57add04f7628e19d630000f8/.config │
remote: └─────────────────────────────────────────────────────────────────────────────────────────┘



### Questions? Ask @rostag
