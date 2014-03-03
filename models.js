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

var TagStorySchema = new Mongoose.Schema({
  "tag_name": String,
  "story_id": String
});
exports.TagStory = Mongoose.model('TagStory', TagSchema);
