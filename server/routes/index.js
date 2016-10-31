var userRoute = require('./user_route'),
  documentRoute = require('./document_route'),
  roleRoute = require('./role_route');


module.exports = function (router) {

  userRoute(router);
  documentRoute(router);
  roleRoute(router);

  return router;
};
