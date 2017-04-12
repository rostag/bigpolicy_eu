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

### Jenkins issues

* https://issues.jenkins-ci.org/browse/JENKINS-22591
* https://issues.jenkins-ci.org/browse/JENKINS-11337?focusedCommentId=159670&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-159670
* https://github.com/phemmer/jenkins-git-chooser-build-branches
* http://stackoverflow.com/questions/8826881/maven-install-on-mac-os-x
* https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html


* Cannot write to directory:
 * http://stackoverflow.com/questions/30242772/where-is-jenkins-config-xml-and-why-is-this-error-appearing
 * http://stackoverflow.com/questions/35613458/jenkins-failed-to-create-a-temporary-file-in-why-is-it-trying-to-write-a-fil
 * http://stackoverflow.com/questions/15675783/how-to-change-the-jenkins-tmp-dir-location

## Disk Space

http://stackoverflow.com/questions/23749176/disk-quota-exceeded-cant-run-rhc-app-tidy
ssh to your cartridge
cd app-root/logs
# to check the dimension of the current dir
du -sh
# safe delete it with rm -f php-error.log

jenkins-bigtest.rhcloud.com app-root]
du -hsx * | sort -rh | head -10

### Trigger build:

https://jenkins-bigtest.rhcloud.com/job/qa-build/api/
https://jenkins-bigtest.rhcloud.com/job/qa-build/build

Perform a build
https://jenkins-bigtest.rhcloud.com/job/qa-build-manual/api/

To programmatically schedule a new build, post to this URL:
https://jenkins-bigtest.rhcloud.com/job/qa-build-manual/build

If the build has parameters, post to this URL and provide the parameters as form data. Either way, the successful queueing will result in 201 status code with Location HTTP header pointing the URL of the item in the queue. By polling the api/xml sub-URL of the queue item, you can track the status of the queued task. Generally, the task will go through some state transitions, then eventually it becomes either cancelled (look for the "cancelled" boolean property), or gets executed (look for the "executable" property that typically points to the AbstractBuild object.)

To programmatically schedule SCM polling, post to this URL.

If security is enabled, the recommended method is to provide the username/password of an account with build permission in the request. Tools such as curl and wget have parameters to specify these credentials. Another alternative (but deprecated) is to configure the 'Trigger builds remotely' section in the job configuration. Then building or polling can be triggered by including a parameter called token in the request.

https://wiki.jenkins-ci.org/display/JENKINS/Remote+access+API

curl -X POST https://jenkins-bigtest.rhcloud.com/job/qa-build-manual/build --user qabuilder:38933da1fb6f299b7586cd01a8ee626d


### Moar

https://wiki.jenkins-ci.org/display/JENKINS/Authenticating+scripted+clients
https://wiki.jenkins-ci.org/display/JENKINS/GitHub+plugin#GitHubPlugin-GitHubhooktriggerforGITScmpolling
https://wiki.jenkins-ci.org/display/JENKINS/Git+plugin#GitPlugin-Pushnotificationfromrepository

### Jenkins time zone
[jenkins-bigtest.rhcloud.com sysconfig]\> cd /etc/sysconfig
[jenkins-bigtest.rhcloud.com sysconfig]\> vim jenkins

NS_JAVA_OPTIONS="-Dorg.apache.commons.jelly.tags.fmt.timeZone=UK/London"

https://wiki.jenkins-ci.org/display/JENKINS/Git+plugin#GitPlugin-Pushnotificationfromrepository

### Trigger GitHub merge

curl -X POST https://jenkins-bigtest.rhcloud.com/git/notifyCommit?url=https://github.com/rostag/bigpolicy_eu.git --user qabuilder:38933da1fb6f299b7586cd01a8ee626d


How-to setup a simple git push deployment
https://gist.github.com/thomasfr/9691385

Simple automated GIT Deployment using GIT Hooks
https://gist.github.com/noelboss/3fe13927025b89757f8fb12e9066f2fa

How To Use Git Hooks To Automate Development and Deployment Tasks
https://www.digitalocean.com/community/tutorials/how-to-use-git-hooks-to-automate-development-and-deployment-tasks

# Success on Webhook:
http://stackoverflow.com/questions/7427557/jenkins-and-github-webhook-http-403

## GitHub rebuild Webhook to Jenkins on BigTest:
https://github.com/rostag/bigpolicy_eu/settings/hooks/13147307

https://qabuilder:38933da1fb6f299b7586cd01a8ee626d@jenkins-bigtest.rhcloud.com/git/notifyCommit?url=https://github.com/rostag/bigpolicy_eu.git

Setup a workspace

TAR

To compress
tar -zcvf archive_name.tar.gz folder_to_compress

To extract
tar -zxvf archive_name.tar.gz

tar -cvf abck2.tar.gz dist/ server/ start.js package.json app-version.js tsconfig.json tslint.json

### Alarm Recovery

#### Download backup:
curl https://raw.githubusercontent.com/rostag/bigpolicy_eu/deploy-qa/bp-bck-dist-17-04-11.tar.gz > a.tar.gz

#### Untar it
tar -xvf a.tar.gz

#### Install
npm install

#### Start
> go to openshift and restart the app
> or do node start.js


# [Adding version number in Node.js app using Jenkins/OpenShift deploy](https://lucaslouca.com/adding-version-number-in-node-js-app-using-jenkinsopenshift-deploy/)


Cartridge Repos:
* [OpenShift Origin Jenkins Cartridge](https://github.com/openshift/origin-server/blob/master/documentation/oo_cartridge_guide.adoc#jenkins)
*  [openshift-origin-cartridge-nodejs](https://github.com/openshift/origin-server/tree/master/cartridges/openshift-origin-cartridge-nodejs/bin)

* BP uses: [Auto-updating Node JS Cartridge](https://github.com/icflorescu/openshift-cartridge-nodejs.git)






### Questions? Ask @rostag
