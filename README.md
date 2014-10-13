# Installation

## system prerequisites
- brew install mongo nodejs
- npm install -g bower

## application installation
Clone from git repository. Add all dependencies to package.json

1. Clone the repository: `git clone git@github.com:rpetrenko/fluffy`
2. Install the application: `npm install`
3. cd public && bower install bootstrap angular fontawesome jquery 
4. bower install ng-file-upload ng-table 
5. bower install angular-animate angular-cookies angular-motion angular-strap angular-ui angular-ui-router 
6. bower install --save angular-youtube-mb
7. Start the server: `node server.js`
8. View in browser at `http://localhost:8080`


## angularjs modules
- angular-ui
- bootstrap
- angular-file-upload

- ng-table
- restangular
- ui-router
- http-auth-interceptor
- ng-grid
- angular-strap (removes deps on jquery and bootstrap)

