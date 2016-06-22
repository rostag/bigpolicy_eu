#Deployment Commands

### QA Deployment Command:
git checkout -B deploy-qa-bck deploy-qa && git checkout deploy-qa && ng b -p && git add . && git commit -m 'deploy-update' && git push deploy-qa deploy-qa && git checkout -B feat-temp

### Live Deployment Command:

git checkout deploy-qa && ng b -p && git add . && git commit -m 'deploy-live-update' && git checkout -B deploy-live-bck deploy-live && git checkout deploy-live && git merge -X theirs -m 'merge QA into Live' deploy-qa && git push deploy-live deploy-live && git checkout -B feat-temp


Questions? Ask @rostag
