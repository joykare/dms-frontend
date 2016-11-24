var app = require('../../index');
var request = require('supertest')(app);
var expect = require('chai').expect;
var Document = require('../../server/models/document');

describe('before login', function() {
  it('asserts that one cannot access documents before login', function(done) {
    request
      .get('/api/documents')
      .end(function (err, res){
        expect(res.body.message).to.equal('No token provided');
        done();
      });
  });
});

describe('document test suite', function() {
  var token;
  var documentId;

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

  describe('/documents CRUD operations', function() {
    it('asserts that a new document has a unique title', function() {
      var title = Document.schema.paths.title;
      expect(title.options.unique).to.equal(true);
    });

    it('creates a new document', function(done) {
      request
        .post('/api/documents')
        .set('x-access-token', token)
        .send({
          title: 'Test Doc',
          content: 'This should work'
        })
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.exist;
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.equal('Test Doc');
          done();
        });
    });

    it('creates a new document with access level defined', function(done) {
      request
        .post('/api/documents')
        .set('x-access-token', token)
        .send({
          title: 'Test Private',
          content: 'yeaay',
          accessLevel: 'private'
        })
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.exist;
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.equal('Test Private');
          expect(res.body.accessLevel).to.equal('private');
          done();
        });
    });

    it('asserts that no duplicates are created', function(done) {
      request
        .post('/api/documents')
        .set('x-access-token', token)
        .send({
          title: 'Test Doc',
          content: 'This should work'
        })
        .end(function(err, res) {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Duplicate entry');
          done();
        });
    });

    it('gets all documents available', function(done) {
      request
        .get('/api/documents')
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.exist;
          expect(Array.isArray(res.body)).to.equal(true);
          documentId = res.body[0]._id;
          done();
        });
    });

    it('gets documents within the limit provided', function(done) {
      request
          .get('/api/documents')
          .set('x-access-token', token)
          .set('limit', 2)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.exist;
            expect(Array.isArray(res.body)).to.equal(true);
            expect(res.body).to.have.length.of.at.most(2);
            expect(res.body[0].title).to.equal('Test Private');
            expect(res.body[1].createdAt).to.be.below(res.body[0].createdAt);
            done();
          });
    });

    it('gets documents with an offset and a limit', function(done) {
      request
          .get('/api/documents')
          .set('x-access-token', token)
          .set('limit', 2)
          .set('skip', 1)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.exist;
            expect(Array.isArray(res.body)).to.equal(true);
            expect(res.body).to.have.length.of.at.most(2);
            expect(res.body[0].title).to.equal('Test Doc');
            expect(res.body[1].createdAt).to.be.below(res.body[0].createdAt);
            done();
          });
    });

    it('gets number of documentspublished on a certain date', function(done) {
      request
          .get('/api/documents?date=2016-09-14')
          .set('x-access-token', token)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.exist;
            expect(Array.isArray(res.body)).to.equal(true);
            expect(res.body).to.have.length(2);
            done();
          });
    });

    it('returns an empty array if no documents are found', function(done) {
      request
          .get('/api/documents?date=2016-09-13')
          .set('x-access-token', token)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(Array.isArray(res.body)).to.equal(true);
            expect(res.body).to.have.length(0);
            done();
          });
    });

    it('gets documents published by the same role(admin)', function(done) {
      request
          .get('/api/documents?role=admin')
          .set('x-access-token', token)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.exist;
            expect(Array.isArray(res.body)).to.equal(true);
            expect(res.body).to.have.length(4);
            done();
          });
    });

    it('gets documents published by the same role(user)', function(done) {
      request
          .get('/api/documents?role=user')
          .set('x-access-token', token)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.exist;
            expect(Array.isArray(res.body)).to.equal(true);
            expect(res.body).to.have.length(1);
            done();
          });
    });
  });

  describe('/documents/:id test suite', function() {
    it('returns specific document', function(done) {
      request
        .get('/api/documents/' + documentId)
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.exist;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('_id', 'title', 'content', 'role',
            'modifiedAt', 'ownerId', 'accessLevel', 'ownerEmail', 'ownerName',
            'roleTitle','createdAt', '__v');
          done();
        });
    });

    it('updates a document', function(done) {
      request
        .put('/api/documents/' + documentId)
        .set('x-access-token', token)
        .send({
          title: 'Updated Doc',
          content: 'Whatever',
          accessLevel: 'private'
        })
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.equal('Updated Doc');
          expect(res.body.content).to.equal('Whatever');
          expect(res.body.accessLevel).to.equal('private');
          done();
        });
    });

    it('removes a document', function(done) {
      request
        .delete('/api/documents/' + documentId)
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
