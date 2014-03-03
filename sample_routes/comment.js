var OK_RESPONSE_CODE = 200;
var INTERNAL_SERVER_ERROR_RESPONSE_CODE = 200;

var models = require('../models');

exports.projectComments = function(req, res) { 
  var projectID = req.params.id;

  models.Comment
    .find({'project_id': projectID})
    .sort('date')
    .exec(function(err, comments) {
	    if (err) {
	    	console.log(err);
	    	res.send(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
	    } else {
	    	res.json(comments)
	    }
	  });
}

exports.addComment = function(req, res) {
	var projectID = req.params.id;
	var comment_data = req.body;
	comment_data.project_id = projectID;
	comment_data.date = new Date();

	var newComment = models.Comment(comment_data);
	newComment.save(function(err) {
		if (err) {
			console.log(err);
			res.send(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
		} else {
			res.send(OK_RESPONSE_CODE);
		}
	});
}