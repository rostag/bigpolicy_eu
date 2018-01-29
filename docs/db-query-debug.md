Good:

project-api/get page # 1 , limit = 3 , query: { "$where": "this.title == \"Не на часі\"" }
DBProject.getPageOfProjects, projectIds = null , page = 1 limit = 3 dbQuery = { "$where": "this.title == \"Не на часі\"" }
query = { '$where': 'this.title == "Не на часі"' }

Bad:

project-api/get page # 1 , limit = 3 , query: { "$where": "this.title == 'Не на часі'" }
DBProject.getPageOfProjects, projectIds = null , page = 1 limit = 3 dbQuery = { "$where": "this.title == 'Не на часі'" }
SyntaxError: Unexpected token Н in JSON at position 28
    at JSON.parse (<anonymous>)
    at Object.DBProject.getPageOfProjects (/Users/rsiryk/dev/BP/bp/server/mongo/db-project.js:79:18)
    at /Users/rsiryk/dev/BP/bp/server/project-api.js:114:8


project-api/get page # 1 , limit = 3 , query: { "$where": "this.title == "Не на часі"" }
DBProject.getPageOfProjects, projectIds = null , page = 1 limit = 3 dbQuery = { "$where": "this.title == "Не на часі"" }
SyntaxError: Unexpected token Н in JSON at position 28
    at JSON.parse (<anonymous>)
    at Object.DBProject.getPageOfProjects (/Users/rsiryk/dev/BP/bp/server/mongo/db-project.js:79:18)
    at /Users/rsiryk/dev/BP/bp/server/project-api.js:114:8
    at Layer.handle [as handle_request] (/Users/rsiryk/dev/BP/bp/node_modules/express/lib/router/layer.js:95:5)
