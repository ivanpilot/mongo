const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  // userId: String,  // apparently we do not need the foreign keys of the authors
  // comments: [Comment]
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment' // this has to match with the definition of comment model
  }]
})
// BlogPost will have many comments so we have an array
// Inside the array we specify a configuration object which explains what
// will be the comment
// the type points to a record that is sitting in a different collection so
// unlike with reference to subdocuments where we nest other document, in this
// case we are passing a reference to another model / document
// To indicate we are passing a reference to another document, we indicate that
// we pass a type of ObjectId so it basically means that comments will store
// an array of Ids.
// Now to tell Mongoose which ids it will have to look up, we pass a ref indicating
// that these ids belongs to Comment. So ids will be match againt the Comment model

const BlogPost = mongoose.model('blogPost', BlogPostSchema);
module.exports = BlogPost;