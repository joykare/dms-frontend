var Role = require('../controllers/role_controller');
var Auth = require('../controllers/auth');

module.exports = function (router) {
  router.use(Auth.auth);
  router.route('/roles')
    .get(Role.get)
    .post(Role.access, Role.create);

  router.route('/roles/:role_id')
    .put(Role.access, Role.update)
    .delete(Role.access, Role.remove);
};
