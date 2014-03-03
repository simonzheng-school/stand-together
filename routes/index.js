var models = require('../models');

/*
 * GET the main swipe page
 */


exports.view = function(req, res){
	models.Story

    .find({})
    .sort('updated_date')
    .exec(afterQuery);

  function afterQuery(err, stories) {
  	if (err) console.log(err);

	  // Render the page
	  res.render('index', {
	  	title: 'Stand Together',
	  	stories: stories
	  });
  }
};
