const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is great', content: 'Yep, it really is'});
    comment = new Comment({content: 'Congrats on the great post'});

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done())
  });
  
  it('saves a relation between a user and a blog post', (done) => {
    User.findOne({name: 'Joe'})
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is great');
        done();
      })
  });

  it('saves a full relation tree', (done) => {
    User.findOne({name: 'Joe'})
      .populate({
        path: 'blogPosts', // like above, means we want to load this additional resources
        populate: {
          path: 'comments',
          model: 'comment',
          // populate means inside the resources blogPost, go 1 step further and get the comment resources. however when we go deeper, mongoose requires thqt we load the the model corresponding to the path which is 'comment'
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        //console.log(user.blogPosts[0].comments[0])
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on the great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      })
  });

});

