## How to use local Mongo DB for development

1. Check if you have MongoDB installed locally by running both of these commands:

  'mongo --version'
  'mongod --version'

If it's installed, you will get version info. Install MongoDB if it's missing.

2. Go to project folder and create `data/db` subfolder:

  'mkdir data && cd data && mkdir db && cd ../'

3. run mongodb using this command:

  'mongod --dbpath data/db'

4. Run local server as usual:

  'ng serve'

## Backup and restore your local Database

```
cd ~/dev/bp && mongodump --db=bigpolicy --out=./data-dump --verbose
cd ~/dev/bp && mongorestore --db bigpolicy ./data-dump/bigpolicy --drop
```
