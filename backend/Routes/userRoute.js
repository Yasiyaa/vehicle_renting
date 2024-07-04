const express = require("express");
const router = express.Router();
const userService = require("../Services/userService");

router
  .route("/user/authenticate")

  // authenticate user
  .post(function (req, res) {
    const { email, password } = req.body;
    const uService = userService.getCustomerInstance();

    const result = uService.authenticate(email, password);

    result.then((data) => res.send(data)).catch((err) => console.log(err));
  });



  router
  .route("/user/sign-up")
  // signup new user
  .post(function (req, res) {
    const { fname,lname,email,telephone,nic,city,password } = req.body;
    const uService = userService.getCustomerInstance();

    const result = uService.insertNewCustomer( fname,lname,email,telephone,nic,city,password );

    result.then((data) => res.send(data)).catch((err) => console.log(err));
  });


module.exports = router;
