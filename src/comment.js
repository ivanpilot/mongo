const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  // user: String // totally up to us to decide the name like author
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})
// the weird thing here in between relational db that we can notice with BlogPost
// and comment is that unlike with SQL db where we only use the foreign_key at the
// child level to associate with the parent
// with NoSQL db like Mongo, we do this relationship for parents and children
// In this file, why pointing to user rather than user_id???

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;