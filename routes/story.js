var OK_RESPONSE_CODE = 200;
var INTERNAL_SERVER_ERROR_RESPONSE_CODE = 200;

var models = require('../models');
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
				var new_path = __dirname + 'uploads/' + id + '_1.png';
				fs.writeFile(new_path, data, function(err) {
					fs.readFile(req.files.image2.path, function(err, data) {
						var new_path = __dirname + 'uploads/' + id + '_2.png';
						fs.writeFile(new_path, data, function(err) {
							res.redirect('/story/' + story._id);
						});
					});
				});
			});

			res.redirect('/story/' + story._id);
		}
	});















	console.log('creating');
	// form({ keepExtensions: true })

	console.log(req.body);
	console.log(req.files);


	// var story_data = req.body;

	// story_data.paragraphs = story_data.paragraphs.split('\n');

	// var newStory = models.Story(story_data);
	// newStory.save(function(err, fields, files) {
	// 	if (err) {
	// 	} else {
	// 		// res.send(OK_RESPONSE_CODE);
	// 		// res.send(format('\nuploaded %s (%d Kb) to %s as %s'
	// 		//     , req.files.image.name
	// 		//     , req.files.image.size / 1024 | 0
	// 		//     , req.files.image.path
	// 		//     , req.body.title));
	// 		res.json(req.body)





	// 		res.render('story', {
	// 			story : story_data
	// 		});
	// 	}
	// });
}


// req.form.complete(function(err, fields, files){
//     if (err) {
//       next(err);
//     } else {
//       console.log('\nuploaded %s to %s'
//         ,  files.image.filename
//         , files.image.path);
//       res.redirect('back');
//     }
//   });