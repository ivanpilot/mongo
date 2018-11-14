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
      .then(() => {

      })
  })
  it('class method remove', (done) => {

  })
  it('class method findAndRemove', (done) => {

  })
  it('class method findByIdAndRemove', (done) => {

  })
})