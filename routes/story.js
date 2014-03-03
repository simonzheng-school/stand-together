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

exports.submit = function(req, res) {
	console.log('newstory');
	res.render('story_new', {
		title: 'Tell Your Story'
	});
}