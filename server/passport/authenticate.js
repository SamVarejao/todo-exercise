module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        console.log("User logged in");
        return next();
      }
      console.log("User not logged in");
      res.redirect("/login");
    },
    fowardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect("/login");
    },
  };
  