![Screenshot](http://i.imgur.com/U9N84a7.png)

This is a simple To-do list Node.js application. There are many like it already. It's meant to be a template for new projects, but should also demonstrate how to structure a loosely coupled Node.js application.

### Directory Structure

```
/app
  /client
    /js
      /controllers
      /models
      /modules
      app.js
    /less
  /config
    development.json
    index.js
    production.json
    test.json
  /server
    /modules
    app.js
  /views
    /templates
    index.jade
/public
  /bower
  /bundled
  /images
/test
  /integration
    /step_definitions
    /tests
  /unit
.bowerrc
.gitattributes
.gitignore
bower.json
Gruntfile.js
LICENSE
package.json
README.md
```

### Running the server

```sh
# In Terminal window #1, start redis if it's not already running:
redis-server

# In Terminal window #2:
npm start
```

### Running the Jasmine tests

```sh
npm test
```

### Running the CasperJS integration tests

```sh
NODE_ENV=test npm start
grunt integration
```

### Design Notes

In this example, templates are compiled on the server but rendered on the client. Bower is being used for packages that are client-side only (e.g. jQuery, Font Awesome), and npm for packages shared by both server and client (e.g. Lodash).

### License

MIT. Copyright &copy; 2014 Andrew Childs
