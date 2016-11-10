var app = require('../../index');
var request = require('supertest')(app);
var expect = require('chai').expect;
var User = require('../../server/models/user');

describe('before login', function() {
  it('asserts that one cannot access user info before login', function(done) {
    request
      .get('/api/users')
      .end(function (err, res){
        expect(res.body.message).to.equal('No token provided');
        done();
      });
  });

  it('creates a user in the db', function(done) {
    request
      .post('/api/users')
      .send({
        username: 'user',
        first: 'first',
        last: 'last',
        email: 'user@gmail.com',
        password: 'user',
        role: 'admin'
      })
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.exist;
        expect(res.body).to.be.an('object');
        expect(res.body.user).to.be.an('object');
        expect(res.body.user.username).to.equal('user');
        done();
      });
  });
});

describe('user test suite', function() {
  var token;
  var userId;
  var userId2;

  before(function(done) {
    request
      .post('/api/users/login')
      .send({
        email: 'user@gmail.com',
        password: 'user'
      })
      .end(function(err, res) {
        if (err) { return done(err); }
        token = res.body.token;
        done();
      });
  });

  describe('/users CRUD operations', function() {
    it('asserts that /users returns all users', function(done) {
      request
        .get('/api/users')
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.length(5);
          expect(Array.isArray(res.body)).to.equal(true);
          userId = res.body[0]._id;
          userId2 = res.body[2]._id;
          done();
        });
    });

    it('asserts that no duplicates can be created', function(done) {
      var username = User.schema.paths.username;
      var email = User.schema.paths.email;

      expect(username.options.index.unique).to.equal(true);
      expect(email.options.index.unique).to.equal(true);

      request
        .post('/api/users')
        .set('x-access-token', token)
        .send({
          username: 'user',
          first: 'first',
          last: 'last',
          email: 'user@gmail.com',
          password: 'user',
          role: 'admin'
        })
        .expect(403)
        .expect({message: 'Duplicate entry'}, done);
    });

    // it('asserts that last and first names are required', function(done) {
    //   request
    //     .post('/api/users')
    //     .set('x-access-token', token)
    //     .send({
    //       username: 'test',
    //       email: 'test@gmail.com',
    //       password: 'test',
    //       role: 'user'
    //     })
    //     .end(function(err, res) {
    //       expect(res.status).to.equal(500);
    //       expect(res.body.message)
    //         .to.equal('Error occured while saving the user');
    //       done();
    //     });
    // });

    it('asserts that a new user has a role defined', function(done) {
      var role = User.schema.paths.role;
      expect(role.options.required).to.equal(true);
      done();
    });
  });

  describe('/users/:user_id CRUD operations', function() {
    it('finds a user with matching id', function(done) {
      request
        .get('/api/users/' + userId)
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.exist;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('_id', 'email', 'username', 'name',
            'role', '__v');
          done();
        });
    });

    it('find a non-existent user', function(done) {
      request
        .get('/api/users/57d11f35b0a303c1234569df')
        .set('x-access-token', token)
        .expect(404)
        .expect({message: 'User not found'}, done);
    });

    it('updates a particular user data', function(done) {
      request
        .put('/api/users/' + userId)
        .set('x-access-token', token)
        .send({
          username: 'njerry-werry',
          first: 'njerry',
          last: 'werry',
          password: 'njeri',
          email: 'njeri@gmail.com'
        })
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.username).to.equal('njerry-werry');
          expect(res.body.name.first).to.equal('njerry');
          expect(res.body.name.last).to.equal('werry');
          expect(res.body.email).to.equal('njeri@gmail.com');
          done();
        });
    });

    it('updating a user that doesnt exist', function(done) {
      request
        .put('/api/users/57d11f35b0a303c1234886df')
        .set('x-access-token', token)
        .send({
          username: 'njerry',
        })
        .end(function(err, res) {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('returns message if no documents exist for user instance', function(done) {
      request
        .get('/api/users/' + userId + '/documents')
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body).to.have.length(0);
          done();
        });
    });

    it('returns documents belonging to a particular user', function(done) {
      request
        .get('/api/users/' + userId2 + '/documents')
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.body).to.exist;
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0]).to.have.keys('_id', 'title', 'ownerId', 'role',
            'accessLevel', 'content', 'modifiedAt', 'createdAt', '__v');
          done();
        });
    });

    it('asserts that cannot find documents of a non-existent user', function(done) {
      request
        .get('/api/users/57d11f35b0a303c1234569df/documents')
        .set('x-access-token', token)
        .expect(404)
        .expect({message: 'User not found'}, done);
    });

    it('deletes user', function(done) {
      request
        .delete('/api/users/' + userId)
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});

describe('restricted user methods', function() {
  var token;
  var userId;
  var userId2;

  before (function(done) {
    request
      .post('/api/users/login')
      .send({
        email: 'skieha@gmail.com',
        password: 'skieha'
      })
      .end(function(err, res) {
        if (err) { return done(err); }
        token = res.body.token;
        done();
      });
  });

  it('asserts that user with read rights can get users', function(done) {
    request
      .get('/api/users')
      .set('x-access-token', token)
      .expect(200)
      .end(function(err, res) {
        expect(Array.isArray(res.body)).to.equal(true);
        userId = res.body[2]._id;
        userId2 = res.body[0]._id;
        done();
      });
  });

  it('returns a restricted message on update of other user', function(done) {
    request
      .put('/api/users/' + userId)
      .set('x-access-token', token)
      .send({
        username: 'tonee'
      })
      .end(function(err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Not allowed to update this user');
        done();
      });
  });

  it('updates if the user updates own profile', function(done) {
    request
      .put('/api/users/' + userId2)
      .set('x-access-token', token)
      .send({
        username: 'werry'
      })
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.username).to.equal('werry');
        expect(res.body._id).to.equal(userId2);
        done();
      });
  });

  it('returns a restricted message on delete of other user', function(done) {
    request
      .delete('/api/users/' + userId)
      .set('x-access-token', token)
      .end(function(err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Not allowed to delete users');
        done();
      });
  });

  it('allowed to delete own profile', function(done) {
    request
      .delete('/api/users/' + userId2)
      .set('x-access-token', token)
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body._id).to.equal(userId2);
        done();
      });
  });
});
