var OK_RESPONSE_CODE = 200;
var INTERNAL_SERVER_ERROR_RESPONSE_CODE = 200;

var models = require('../models');
var fs = require('fs');
var path = require('path');
/*
 * GET the story page for the particular request id
 */


exports.view = function(req, res){
	var storyID = req.params.id;

	models.Story
		.find( { "_id": storyID}, {"email": 0 } )
	    .exec(sendStoryParams);


  function sendStoryParams(err, story) {
  	if (err) console.log(err);
	  // Render the page
	  res.render('story', {
	  	story: 	story,
	  	navbarBackMode: true
	  });
  }
};


exports.new = function(req, res) {
	res.render('story_new', {
		title: 'Tell Your Story'
	});
};


exports.create = function(req, res) {
	var story_data = req.body;
	var date = new Date();
	story_data.created_date = date;
	story_data.updated_date = date;
	story_data.paragraphs = story_data.paragraphs.split('\n');
	story_data.image1 = '/uploads/' + date.toJSON() + '_1_' + req.files.image1.originalFilename;
	story_data.stand_with_count = 0;

	var new_story = models.Story(story_data);
	// TODO validate saving all fields or something
	new_story.save(function(err, story) {
		if (err) {
			console.log(err);
			res.send(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
		} else {
			fs.readFile(req.files.image1.path, function(err, data) {
				var new_path = path.join(__dirname, '../public/uploads/')
					+ date.toJSON() + '_1_' + req.files.image1.originalFilename;
				fs.writeFile(new_path, data, function(err) {
					if (err) console.log(err);
					res.redirect('/story/' + story._id);
				});
			});
		}
	});
}


/*
 * Get the new stand_with_count after updating the database for new support
 */

exports.showSupport = function(req, res) {
	var storyId = req.params.id;

	models.Story.findByIdAndUpdate(
		storyId,
		{ $inc: { stand_with_count: 1 } },
		function(err, story) {
			if (err) console.log(err);
			res.json({ stand_with_count: story.stand_with_count });
		}
	);
};