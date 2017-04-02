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


### Remote

FIXME_SEC

==> app-root/logs/mongodb.log <==
options: {
  auth: true,
  bind_ip: "127.6.98.2",
  command: [ "run" ],
  config: "/var/lib/openshift/576483190c1e66b5cd00001b/mongodb//conf/mongodb.conf",
  dbpath: "/var/lib/openshift/576483190c1e66b5cd00001b/mongodb/data/",
  nohttpinterface: "true",
  noprealloc: "true",
  pidfilepath: "/var/lib/openshift/576483190c1e66b5cd00001b/mongodb/pid/mongodb.pid",
  quiet: "true",
  smallfiles: "true"
}

journal dir=/var/lib/openshift/576483190c1e66b5cd00001b/mongodb/data/journal
recover : no journal files present, no recovery needed
waiting for connections on port 27017

[conn1]  authenticate db: admin { authenticate: 1, nonce: "f38b3b271d8064a9", user: "admin"
[conn2]  authenticate db: qa { authenticate: 1, user: "admin"
[conn3]  authenticate db: qa { authenticate: 1, user: "admin"
...
