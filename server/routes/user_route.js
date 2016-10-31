var User = require('../controllers/user_controller');
var Auth = require('../controllers/auth');

module.exports = function (router) {
  router.post('/users/login', User.login);
  router.post('/users', User.create);

  router.use(Auth.auth);

  router.get('/users', User.get);
  router.route('/users/:user_id')
    .put(User.update)
    .get(User.find)
    .delete(User.remove);
  router.get('/users/:user_id/documents', User.findUserDocuments);
};
