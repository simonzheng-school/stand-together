
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');


// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'stand-together';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Reset db stuff
models.Story
  .find({})
  .remove()
  .exec(fillStories);


// Callback functions
function fillStories(err) {
  if (err) console.log(err);

  var storiesJSON = require('./stories.json');
  shuffle(storiesJSON);
  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = storiesJSON.length;
  for(var i = 0; i < storiesJSON.length; i++) {
    var json = storiesJSON[i];
    json.created_date = new Date();
    json.updated_date = json.created_date;
    var story = new models.Story(json);

    story.save(function(err, story) {
      if (err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('DONE');
        whenDoneFillingStory();
      }
    });
  }
}


function whenDoneFillingStory() {
  models.TagStory
    .find({})
    .remove()
    .exec();


  // We're done. Close connection to db
  mongoose.connection.close();

}


// From http://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling
// :)
function shuffle(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

    return array;
}



