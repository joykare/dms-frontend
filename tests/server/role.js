var app = require('../../index');
var request = require('supertest')(app);
var expect = require('chai').expect;

describe('role test suite', function() {
  var token;
  var roleId;

  before(function(done) {
    request
      .post('/api/users/login')
      .send({
        email: 'jwarugu@gmail.com',
        password: 'jwarugu'
      })
      .end(function(err, res) {
        if (err) { return done(err); }
        token = res.body.token;
        done();
      });
  });

  it('creates a role', function(done) {
    request
      .post('/api/roles')
      .set('x-access-token', token)
      .send({
        role: 'superadmin',
        permissions: 'readwrite'
      })
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.exist;
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.equal('superadmin');
        done();
      });
  });

  it('asserts no duplicate roles can be created', function(done) {
    request
      .post('/api/roles')
      .set('x-access-token', token)
      .send({
        role: 'superadmin',
        permissions: 'readwrite'
      })
      .end(function(err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Duplicate entry');
        done();
      });
  });

  it('returns all the roles availed', function(done) {
    request
      .get('/api/roles')
      .set('x-access-token', token)
      .end(function(err, res) {
        expect(res.body).to.exist;
        expect(Array.isArray(res.body)).to.equal(true);
        expect(res.body).to.have.length.of.at.most(3);
        roleId = res.body[2]._id;
        done();
      });
  });

  it('asserts that role can be updated', function(done) {
    request
      .put('/api/roles/' + roleId)
      .set('x-access-token', token)
      .send({
        role: 'viewer',
        permissions: 'read'
      })
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.exist;
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.equal('viewer');
        expect(res.body._id).to.equal(roleId);
        done();
      });
  });

  it('asserts that undefined permissions are flagged', function(done) {
    request
      .put('/api/roles/' + roleId)
      .set('x-access-token', token)
      .send({
        permissions: 'write'
      })
      .end(function(err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Not a possible permission');
        done();
      });
  });

  it('asserts that role can be deleted', function(done) {
    request
      .delete('/api/roles/' + roleId)
      .set('x-access-token', token)
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.exist;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('user without readwrite permissions', function() {
  var token;
  var roleId;

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

  it('creates a role', function(done) {
    request
      .post('/api/roles')
      .set('x-access-token', token)
      .send({
        role: 'superadmin',
        permissions: 'readwrite'
      })
      .end(function(err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('You are not authorized to execute action');
        done();
      });
  });

  it('returns all the roles availed', function(done) {
    request
      .get('/api/roles')
      .set('x-access-token', token)
      .end(function(err, res) {
        expect(res.body).to.exist;
        expect(Array.isArray(res.body)).to.equal(true);
        expect(res.body).to.have.length.of.at.most(2);
        roleId = res.body[0]._id;
        done();
      });
  });

  it('asserts that role can be updated', function(done) {
    request
      .put('/api/roles/' + roleId)
      .set('x-access-token', token)
      .send({
        role: 'viewer',
        permissions: 'read'
      })
      .end(function(err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('You are not authorized to execute action');
        done();
      });
  });

  it('asserts that role can be deleted', function(done) {
    request
      .delete('/api/roles/' + roleId)
      .set('x-access-token', token)
      .end(function(err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('You are not authorized to execute action');
        done();
      });
  });
});
