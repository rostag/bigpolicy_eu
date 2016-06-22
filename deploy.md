#Deployment Commands

### QA Deployment Command:
git checkout deploy-qa-bck deploy-qa && git checkout deploy-qa && ng b -p && git add . && git commit -m 'deploy-update' && git push deploy-qa deploy-qa

### Live Deployment Command:

git checkout deploy-qa && ng b -p && git add . && git commit -m 'deploy-live-update' && git branch -D deploy-live-bck && git checkout -b deploy-live-bck deploy-live && git checkout deploy-live && git merge -X theirs deploy-qa && git push deploy-live deploy-live
