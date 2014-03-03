Stand Together
==============

A platform for solidarity, built during d.media @ Stanford.

Steps to run locally:
---------------------

* `>> mongod`
* `>> brew install mongodb` (or equivalent) (if you can't run mongod)
* `>> node initDB.js` (optional)
* `>> node app.js`

Steps to run on heroku:
-----------------------

* `>> heroku create app-name` (for new app)
* `>> heroku addons:add mongolab` (for new app)
* `>> heroku run node initDB.js` (optional)