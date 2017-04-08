# Deployment details, issues and fixes

## Explanation of the process behind the [deployment instructions](https://github.com/rostag/bigpolicy_eu/blob/develop/docs/deploy.md)

Note: only this kind of deployment is implemented at the moment. More UI version is underway.

Generally, the only thing you need to deploy is to push a local `deploy-qa` git branch to it's remote counterpart and OpenShift will to the rest.

But, before pushing local branch you must have proper build files in its 'dist' folder. So, you need to build before pushing.

And, to make all above work, you should tell your git where to push files to by adding a reference to the remote repository. This should be done only once for any local repo setup. You  start with checking if you have the remote set up in your local git repo (`git remote -v`). It gives you a list of remotes. Initially, there's only `origin` remote for GitHub. So you add the `remote-qa` remote for OpenShift deployment like in instructions.

Then you build the application version, commit it to 'deploy-qa' branch which is a deployment branch for QA, and push this branch it to the `remote-qa` remote. The 'deploy-qa' is so-called 'deployment branch' you [selected on OpenShift](https://blog.openshift.com/introduction-to-deployments-and-rollbacks-on-openshift/).

When building, you do it in the deployment branch, not develop, because develop ignores the 'dist' folder by purpose, to avoid storing builds in the main GitHub repo.

So, here's the full list of remotes developer can have for deployment from local repo:

```
$ git remote -v
origin	https://github.com/rostag/bigpolicy_eu.git (fetch)
origin	https://github.com/rostag/bigpolicy_eu.git (push)
remote-qa	ssh://XXXXXXXXXXXXXXXXXXXXXXXX@qa-europe.rhcloud.com/~/git/qa.git/ (fetch)
remote-qa	ssh://XXXXXXXXXXXXXXXXXXXXXXXX@qa-europe.rhcloud.com/~/git/qa.git/ (push)
```

### Push to deploy

After you have remotes, you can push your deploment branch to remote. This will start deployment process on OpenShift app after push and application will be restarted. Deploying to Live is the same as deploying to QA, the only difference is remote and deployment branch names, where you just replace '-qa' with '-live'

Please make sure you tested your changes on QA before deploying to Live, otherwise you can make production broken.

### Known issues

*1. Error:* `Uncaught SyntaxError: Unexpected token <`
*Cause:* Some bundled JS isn't loaded.
*Root cause:* possible addition change of 'dist' folder into '.gitignore' of the deploy branch.
*Solution:* fix .gitignore in deploy branch.
*Final Solution:* reorganize folders, e.g. move dist out of source folder to avoid gitignoring it.

*2. Error:* 'Not found' on the main page.
*Cause, Root cause, Solution, Final Solution:* The same as in #1

### Questions? Ask @rostag
