const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  // postCount: Number, //commented out as this becomes a virtual type rather than a model attributes
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
})

UserSchema.virtual('postCount').get(function(){
  return this.posts.length;
});
// unlike with a plain object like joe.postCount where js handles over the value,
// by using the get() function, js will first run the callback inside get and return
// that value
//
// DO NOT USE ARROW FUNCTION
// With arrow function the execution context will bind 'this' to the environnement
// of the whole file while plain function allows to reassign the value of 'this' to
// represent THE INSTANCE OF A MODEL ON WHICH WE ARE WORKING ON!!


// below is a middleware
// There are 2 types of middleware: pre and post key events (save, remove, ...)
// We use the below middleware to automatically delete all blogposts and comments
// associated with blogPosts of a particular user provided that he is deleted from
// the database

UserSchema.pre('remove', function(next){
  // Here also, we do NOT WANT AN ARROW FUNCTION
  // 'this' represents an instance of the model

  const BlogPost = mongoose.model('blogPost');

  // we need to refers to BlogPost to delete these automatically
  // to do so we could require BlogPost as a module but we might need at some point
  // inside the BlogPost.js file need User so we would require it too and then we enter
  // an infinite cycle of which must be loaded first
  // Requiring BlogPost via mongoose allows us to avoid the infinite cycle

  BlogPost.remove({_id: { $in: this.blogPosts}})
    .then(() => next());
  // we use $in operator to remove all blogpost we a specific id inside joe.blogposts

});

const User = mongoose.model('user', UserSchema);

module.exports = User;
