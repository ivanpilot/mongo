var mongoose = require('mongoose');

before((done) => {
  mongoose.connect('mongodb://localhost/users_test', {useNewUrlParser: true})
  mongoose.connection
  .once('open', () => {
    done();
  })
  .on('error', (e) => console.log('connection error: ', e))
})


beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // ready to run the next test!
    done();
  });
})