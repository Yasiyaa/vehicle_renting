const express = require("express");
const router = express.Router();
const OrderService = require("../Services/OrderService");


router
.route("/order/addnew")

// add new order
.post(function (req,res){
    const {vid, cusid} = req.body;
   
    const ordService = OrderService.getOrderInstance();

    const result = ordService.addNewOrder(vid, cusid);

    result.then((data) => res.send(data)).catch((err) => console.log(err));
});



module.exports = router;