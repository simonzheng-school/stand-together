
/*
 * GET the main swipe page
 */


exports.view = function(req, res){
  // Render the page
  res.render('index', {title: 'Stand Together'});
};
