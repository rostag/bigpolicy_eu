#!/bin/bash

BP_HOME="$(cd ../ && pwd)"

APP_HOME="$BP_HOME/bp"
DATA_HOME=$BP_HOME
DATA_DIR="data/db"

echo
echo
echo
echo '!____^_^____!'
echo 'BigPolicy.eu'
echo 'Resetting project'

echo '  BP HOME is:' $BP_HOME
echo ' APP HOME is:' $APP_HOME
echo 'DATA HOME is:' $DATA_HOME
echo ' DATA DIR is:' $DATA_DIR
echo
echo 'Creating DB folder in '$DATA_HOME' directory'

cd $DATA_HOME

rm -rf $DATA_DIR

echo 'DB folder removed: '

ls -lah

cd $APP_HOME

exit 0
