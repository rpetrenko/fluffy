# Installation

## TODO
- add user role to user model
- when deleting character, delete it's image from public/img
- allow edit users
- create user view for admin role


## system prerequisites
### iOS
- install mongo, node.js: `brew install mongo nodejs`
- install bower: `sudo npm install -g bower`

### Linux Mint
- mongo installation [instructions](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)
- install node.js: `sudo apt-get install nodejs`
- link node to nodejs (needed for bower): `sudo ln -s /usr/bin/nodejs /usr/bin/node`
- install bower: `sudo npm install -g bower`

## installation steps
All dependencies should be listed in (package.json, bower.json)

1. Clone the repository: `git clone https://github.com/rpetrenko/fluffy.git`
2. Install back-end packages (node_modules): `npm install`
3. Install front-end packages (public/bower_components): `bower install`
4. Start the server: `node server.js`
5. View in browser at `http://localhost:8080`

# Application
## features
- navigation bar
- REST API for CRUD of mongo-db models
- file upload with file drop feature (files placed in public/img/)
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
