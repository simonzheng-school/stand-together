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
  	console.log(story);
	  // Render the page
	  res.render('story', {
	  	story: 	story
	  });
  }
};

exports.new = function(req, res) {
	console.log('newstory');
	res.render('story_new', {
		title: 'Tell Your Story'
	});
};

exports.create = function(req, res) {
	var story_data = req.body;
	story_data.created_date = new Date();
	story_data.updated_date = story_data.created_date;
	story_data.paragraphs = story_data.paragraphs.split('\n');
	story_data.image1 = '/uploads/' + req.files.image1.originalFilename;
	story_data.image2 = '/uploads/' + req.files.image2.originalFilename;

	// DO some shit with image names here
	// Also save those somewhere


	var new_story = models.Story(story_data);
	// TODO validate saving all fields or something
	new_story.save(function(err, story) {
		if (err) {
			console.log(err);
			res.send(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
		} else {

			var id = story._id

			fs.readFile(req.files.image1.path, function(err, data) {
				// var new_image1_name = id + '_1.png'; // TODO: make sure that these extensions are correct (e.g. PNG, JPG, etc.)
				var new_path = path.join(__dirname, '../public/uploads/') + req.files.image1.originalFilename;
				console.log(new_path);

				fs.writeFile(new_path, data, function(err) {
					fs.readFile(req.files.image2.path, function(err, data) {
						// var new_image2_name = id + '_2.png'; // TODO: make sure that these extensions are correct (e.g. PNG, JPG, etc.)
						var new_path = path.join(__dirname, '../public/uploads/') + req.files.image2.originalFilename;
						fs.writeFile(new_path, data, function(err) {
							
						models.Story
							.find( { "_id": id}, {"email": 0 } )
						    .exec(sendStoryParams);


						  function sendStoryParams(err, story) {
						  	if (err) console.log(err);

							  // Render the page
							  res.render('story', {
							  	story: 	story
							  });
						  }




						});
					});
				});
			});

			// res.redirect('/story/' + story._id);
		}
	});


	console.log('creating');
	// form({ keepExtensions: true })

	console.log(req.body);
	console.log(req.files);

}