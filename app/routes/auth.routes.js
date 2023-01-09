const controller = require("../authentification/auth.controller");

module.exports = function(app) {
 

  app.post(  "/signup",controller.signup);

  app.post("/signin", controller.signin);
};
