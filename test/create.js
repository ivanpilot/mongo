const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {

  it('saves a user', (done) => {
    let joe = new User({name: 'Joe'}); // joe is an instance of User
    joe.save()
      .then(() => {
        // Has joe been saved successfully?
        assert(!joe.isNew);
        done();
      })
  });

});