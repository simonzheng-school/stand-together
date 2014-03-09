var models = require('../models');

/*
 * GET the main index page
 */

exports.index = function(req, res){
  renderIndex(req, res, false);
};


/*
 * GET the landing page, which is the index plus an extra modal
 */

exports.landing = function(req, res) {
  renderIndex(req, res, true);
};

function renderIndex(req, res, hasLanding) {
  models.Story
  .find({})
  .sort('updated_date')
  .exec(function(err, stories) {
    if (err) console.log(err);

    for (var i=0; i<stories.length; i++) {
      stories[i].add_clearfix_after = (i+1) % 3 == 0;
    }

    // Render the page
    res.render('index', {
      title: 'Stand Together',
      stories: stories,
      hasLanding: hasLanding
    });
  });
}