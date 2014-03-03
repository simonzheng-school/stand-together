var models = require('../models');

/*
 * GET the main index page
 */

exports.view = function(req, res){
	models.Story

    .find({})
    .sort('updated_date')
    .exec(renderIndex);

  function renderIndex(err, stories) {
  	if (err) console.log(err);

	  // Render the page
	  res.render('index', {
	  	title: 'Stand Together',
	  	stories: stories
	  });
  }
};
