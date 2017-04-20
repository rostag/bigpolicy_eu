# Go home
cd ~/app-root/repo/

# Download
curl https://raw.githubusercontent.com/rostag/bigpolicy_eu/deploy-qa/bp-bck-dist-17-04-11.tar.gz > a.tar.gz

# Untar
tar -xvf a.tar.gz

# Install
npm install

# Run
echo 'Restart the app via https://openshift.redhat.com/app/console/'
echo 'or try manual restart for node start'
