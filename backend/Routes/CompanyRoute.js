const express = require("express");
const router = express.Router();
const companyService = require("../Services/CompanyService");


router
.route("/company/authenticate")

// authenticate company
.post(function (req,res){
    const {email,password} = req.body;
    const ComService = companyService.getCompanyInstance();

    const result = ComService.authenticateCompany(email, password);

    result.then((data) => res.send(data)).catch((err) => console.log(err));
});


router
.route("/company/sign-up")

// add new company
.post(function (req,res){
    const {name, email, password} = req.body;
    const ComService = companyService.getCompanyInstance();

    const result = ComService.addNewCompany(name, email, password);

    result.then((data) => res.send(data)).catch((err) => console.log(err));
});





module.exports = router;