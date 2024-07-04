const express = require("express");
const router = express.Router();
const VehicleService = require("../Services/VehicleService");


router
.route("/vehicle/addnew")

// authenticate customer
.post(function (req,res){
    const {companyID,type, noOfseats, availablestat} = req.body;
   
    const vehiService = VehicleService.getVehicleInstance();

    const result = vehiService.addNewVehicle(companyID, type, noOfseats, availablestat);

    result.then((data) => res.send(data)).catch((err) => console.log(err));
});


router
.route("/vehicle")
 // Get all  inquiry
 .get(function (req, res) {
    const vehiService = VehicleService.getVehicleInstance();
    const result = vehiService.getAllVehicleData();
    result.then((data) => res.send(data)).catch((err) => console.log(err));

    // res.send(data);
  })


module.exports = router;