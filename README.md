# Installation

## TODO
- add user role to user model
- restrict access based on user role
- when deleting character, delete it's image from public/img
- allow edit users
- create user view for admin role
- 

## system prerequisites
- brew install mongo nodejs
- npm install -g bower

## installation steps
All dependencies should be listed in (package.json, bower.json)

1. Clone the repository: `git clone git@github.com:rpetrenko/fluffy`
2. Install back-end packages (node_modules): `npm install`
3. Install front-end packages (public/bower_components): `bower install`
4. Start the server: `node server.js`
5. View in browser at `http://localhost:8080`

## implemented features
- REST API for CRUD of mongo-db models
- file upload (files placed in public/img/)
- authentication (signup, login, logout)

## application design

### server side
- server.js running express server on node.js
- all node.js dependencies are listed in package.json and installed to node_modules


### client side
- all client side codes is in public folder
- all angular.js dependencies are listed in bower.json and installed 
in the path specified in .bowerrc file

### styling
- [Glyphicons](http://glyphicons.bootstrapcheatsheets.com/)
- [Font-Awesome](http://fontawesome.bootstrapcheatsheets.com/)
