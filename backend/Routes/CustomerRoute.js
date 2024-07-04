const express = require("express");
const router = express.Router();
const CustomerService = require("../Services/CustomerService");


router
.route("/customer/authenticate")

// authenticate customer
.post(function (req,res){
    const {email,password} = req.body;
    const CusService = CustomerService.getCustomerInstance();

    const result = CusService.authenticateCustomer(email, password);

    result.then((data) => res.send(data)).catch((err) => console.log(err));
});


router
.route("/customer/sign-up")

// add new customer
.post(function (req,res){
    const {fname, lname, tele, email, password} = req.body;
    const CusService = CustomerService.getCustomerInstance();

    const result = CusService.addNewCustomer(fname, lname, tele, email, password);

    result.then((data) => res.send(data)).catch((err) => console.log(err));
});



module.exports = router;