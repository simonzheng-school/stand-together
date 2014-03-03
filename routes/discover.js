/*
 * GET the search page
 */

exports.search = function(req, res){
	var query = req.query.q;

  // Render the page
  res.render('discover_search', {
  	title: 'Search',
  	query: query
  });
};


/*
 * GET the discover/browse page
 */

exports.discover = function(req, res){
  // Render the page
  res.render('discover_discover', {
  	title: 'Discover'
  });
};