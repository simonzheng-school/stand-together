/*
 * GET the about page
 */

exports.view = function(req, res){
  // Render the page
  res.render('about', {
  	title: 'About Stand Together'
  });
};
