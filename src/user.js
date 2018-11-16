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
  posts: [PostSchema]
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
// of the whole file while non arrow function allows to reassign the value of 'this' to
// represent THE INSTANCE OF A MODEL ON WHICH WE ARE WORKING ON!!

const User = mongoose.model('user', UserSchema);

module.exports = User;
