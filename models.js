var Mongoose = require('mongoose');


var StorySchema = new Mongoose.Schema({
  "title": String,
  "paragraphs": Array,
  "email": String,
  "image1": String,
  "image2": String,
  "stand_with_count": Number,
  "created_date": Date,
  "updated_date": Date
});
exports.Story = Mongoose.model('Story', StorySchema);

var TagStorySchema = new Mongoose.Schema({
  "tag_name": String,
  "story_id": String
});
exports.TagStory = Mongoose.model('TagStory', TagStorySchema);
