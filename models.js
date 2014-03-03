var Mongoose = require('mongoose');


var StorySchema = new Mongoose.Schema({
  "_id": String,
  "title": String,
  "body": String,
  "email": String,
  "image1": String,
  "image2": String,
  "stand_with_count": Number
});
exports.Story = Mongoose.model('Story', StorySchema);

var TagSchema = new Mongoose.Schema({
  "story_id": String,
  "tag_name": String
});
exports.Story = Mongoose.model('Tag', TagSchema);
