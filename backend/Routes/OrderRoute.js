const express = require("express");
const router = express.Router();
const OrderService = require("../Services/OrderService");

router
  .route("/order/addnew")

  // add new order
  .post(async function (req, res) {
    const { vid, cusid } = req.body;

    const ordService = OrderService.getOrderInstance();

    const result = ordService.addNewOrder(vid, cusid);
    ordService.vehicleRate(vid);

    result.then((data) => res.send(data)).catch((err) => console.log(err));
  });

router.route("/order").get(function (req, res) {
  const companyID = req.query.companyID;

  const ordService = OrderService.getOrderInstance();
  const result = ordService.getBookingDetails(companyID);

  result.then((data) => res.send(data)).catch((err) => console.log(err));
});


router.route("/getCustomerDetails").get(async function (req, res) {
 
 // console.log("check");
  const ordService = OrderService.getOrderInstance();
  const result = ordService.getCustomerDetails();

  result.then((data) => res.send(data)).catch((err) => console.log(err));
});


router.route("/bookings").get(function (req, res) {
  const cusid = req.query.cusid;
//  console.log(cusid);
  const ordService = OrderService.getOrderInstance();
  const result = ordService.getPastBookingDetails(cusid);

  result.then((data) => res.send(data)).catch((err) => console.log(err));
});

router.route("/markavailable").post(function (req, res) {
  const vid = req.body.vid;
  const oid = req.body.oid;

  // console.log(vid);

  const ordService = OrderService.getOrderInstance();
  const result = ordService.vehicleAvailableStatus(vid);
  ordService.bookingComplete(oid);

  result.then((data) => res.send(data)).catch((err) => console.log(err));
});

module.exports = router;
