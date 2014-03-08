![Screenshot](http://i.imgur.com/U9N84a7.png)

This is a simple To-do list Node.js application. There are many like it already. It's meant to be a template for new projects, but should also demonstrate how to structure a loosely coupled Node.js application.

### Installation

```sh
npm install node-app-scaffold
```

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

### Commands

```sh
# Build the files
grunt

# Watch for changes using livereload
grunt watch

# Start the development server
npm start

# Start the server in production environment
NODE_ENV=production npm start

# Run the Jasmine unit test suite
npm test

# Run the CasperJS integration test suite
NODE_ENV=test npm start
grunt integration
```

### Design Notes

In this example, templates are compiled on the server but rendered on the client. Bower is used for packages that are client-side only (e.g. jQuery, Font Awesome), and npm for packages shared by both server and client (e.g. Lodash).

### License

MIT. Copyright &copy; 2014 Andrew Childs
