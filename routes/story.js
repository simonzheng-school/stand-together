
/*
 * GET the main swipe page
 */


exports.view = function(req, res){
	var storyID = req.params.id;
  // Render the page
  res.render('story', {
  	title: 'Test Story Title',
  	id: storyID
  });
};
