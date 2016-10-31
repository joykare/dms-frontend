var Document = require('../controllers/document_controller');
var Auth = require('../controllers/auth');

module.exports = function (router) {
  router.use(Auth.auth);
  router.route('/documents')
    .post(Document.create)
    .get(Document.all);

  router.route('/documents/:document_id')
    .get(Document.find)
    .put(Document.update)
    .delete(Document.remove);
};
