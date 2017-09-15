<img src="https://github.com/rostag/bigpolicy_eu/blob/develop/src/assets/img/logo.png" alt="BigPolicy" width="47">

# BigPolicy

Opensource crowdfunding platform for social activists, who don't want to involve into obsolete corrupted parties, but are bright and willing for change.

Project appeared in Ukraine, when group of activists decides that Direct Democracy is the instrument of truly agile governments, ready to be open for challenges and react on them.

Our goals for this tool are
- implement new culture in political landscape
- implement it on local and government level

Idea was verified on EGAP Hackaton Challenge with support of bright experts and moving forward.

## How to start your local development

#### Install Typescript and Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) and Typescript:

```npm install -g typescript@next```

```npm install -g typings```

```npm install -g angular-cli```

#### Install MongoDB

To develop locally, you need to [MongoDB installation](https://docs.mongodb.com/manual/installation/).

#### Clone our repository

```git clone https://github.com/rostag/bigpolicy_eu.git <app_dir>```

#### Install dependencies

```npm install```

Please note: you need _at least npm 3_.

### Run local development server

#### Run MongoDB

```mongod --dbpath data/db```

Please note — path to database may be different on your machine. It's better to keep your DB files outside the source folder to avoid leaking DB files into project repository.

Windows notes
Add mongodb to PATH
run mongo server manually:
a) go to default folder of mongo e.g.

```C:\Program Files\MongoDB\Server\3.2\bin```

and enter command:

```mongod.exe --dbpath path_to_bin_mongo_folder```

This will show waiting for connections message on the console output, which indicates that the mongod.exe process is running successfully.

#### Run Angular CLI Server

At this moment, you run both `ng` and `node` commands. ng watches and rebuilds, node serves as web + mongodb. Run ng to build, telling it to watch and rebuild sources:

```ng build --watch true```

#### Run node express app:

```node start```

### See your local BP

Visit [localhost:4200](http://localhost:4200/) -- this is your local BigPolicy application.

After you edited and saved a file, the project is being rebuilt automatically. But you need to manually refresh the page in browser to see the changes (we'll fix it later)

## More on Angular CLI Development

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/route/class`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help


Use `ng --help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### How to contribute?

[Please see BigPolicy Contributing Doc](https://github.com/rostag/bigpolicy_eu/blob/develop/.github/CONTRIBUTING.md)(to be updated)


[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/rostag/bigpolicy_eu.svg)](https://david-dm.org/rostag/bigpolicy_eu)
[![devDependency Status](https://david-dm.org/rostag/bigpolicy_eu/dev-status.svg)](https://david-dm.org/rostag/bigpolicy_eu#info=devDependencies)


## License

MIT
