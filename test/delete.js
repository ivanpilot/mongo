const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    joe.save()
      .then(() => {
        done();
      })
  })

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.find({ name: 'Joe'}))
      .then((users) => {
        assert(users.length === 0);
        done();
      })
  })

  it('class method remove', (done) => {
    User.remove({name: 'Joe'})
      .then(() => User.find({ name: 'Joe'}))
      .then((users) => {
        assert(users.length === 0);
        done();
      })
  })

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({name: 'Joe'})
      .then(() => User.find({ name: 'Joe'}))
      .then((users) => {
        assert(users.length === 0);
        done();
      })
  })

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove({_id: joe._id})
      .then(() => User.find({ name: 'Joe'}))
        .then((users) => {
          assert(users.length === 0);
          done();
        })
  })
})