#!/bin/bash

# Git clone BP
# Setup Mongo
# Setup NMV
# Setup NodeJS
# Setup Angular Globally
# npm install

BP_HOME="$(cd ../ && pwd)"

APP_HOME="$BP_HOME/bp"
DATA_HOME=$BP_HOME
DATA_DIR="data/db"

echo
echo
echo
echo '!____^_^____!'
echo 'BigPolicy.eu'
echo 'Initializing project'

echo '  BP HOME is:' $BP_HOME
echo ' APP HOME is:' $APP_HOME
echo 'DATA HOME is:' $DATA_HOME
echo ' DATA DIR is:' $DATA_DIR
echo
echo 'Creating DB folder in '$DATA_HOME' directory'

cd $DATA_HOME

mkdir -p $DATA_DIR

echo 'DB folder created: '

ls -lah

cd $APP_HOME

exit 0

## WIP:
## TODO: set acceess control: https://stackoverflow.com/questions/38921414/mongodb-what-are-the-default-user-and-password

## 1 Start MongoDB without access control.
# mongod --port 27027 --dbpath=data/db

## 2 Connect to the instance.
# mongo --port 27027

## 3 Create the user administrator
# db.createUser(
#   {
#     user: "bpqa",
#     pwd: "bpqa81",
#     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
#   }
# )

## 4 Re-start the MongoDB instance with access control.
# mongod --auth --port 27027 --dbpath=data/db

## 5 Authenticate as the user administrator.
# mongo --port 27027 -u "bpqa" -p "bpqa81" --authenticationDatabase "admin"

