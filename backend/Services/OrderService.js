const connection = require("../dbConnection");
let instance = null;

class Order {
  static getOrderInstance() {
    return instance ? instance : new Order();
  }

  //add new order
  async addNewOrder(vid, cusid) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO `bookings` (`vid`, `cusid`,`status`) VALUES (?,?,'booked')";

        connection.query(query, [vid, cusid], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result.insertId);
          }
        });
      });

      return {
        oid: insertId,
        vid,
        cusid,
      };
    } catch (error) {
      console.log(error);
      throw error; 
    }
  }

  // get all booking data
  async getBookingDetails(companyID) {
    try {
    //  console.log(companyID);
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT o.oid, o.vid,o.cusid,v.vehicleNumber,v.model,v.noOfseats,v.companyID FROM bookings o JOIN  vehicle v ON o.vid = v.vid WHERE  v.companyID = '"+companyID+"' and v.availablestat = 'unavailable' and o.status = 'booked'";

         console.log(query);
        connection.query(query,(err, result) => {
          if (err) reject(new Error(err.message));
          
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }


  // get all customer past booking data
  async getPastBookingDetails(cusid) {
    try {

      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT o.oid,v.vehicleNumber,v.model,v.noOfseats FROM bookings o JOIN  vehicle v ON o.vid = v.vid WHERE  o.cusid ='"+cusid+"'";

      //   console.log(query);
        connection.query(query,(err, result) => {
          if (err) reject(new Error(err.message));
          
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }


  // add weight to the vehicle
  async vehicleRate(vid) {
    try {

      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE vehicle SET vehicleweight = vehicleweight + 1, availablestat = 'unavailable' WHERE vid = '"+vid+"';";

       //  console.log(query);
        connection.query(query,(err, result) => {
          if (err) reject(new Error(err.message));
          
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

// vehicle available
  async vehicleAvailableStatus(vid) {
    try {

      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE vehicle SET availablestat = 'available' WHERE vid = '"+vid+"';";

       //  console.log(query);
        connection.query(query,(err, result) => {
          if (err) reject(new Error(err.message));
          
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }


  // booking complete
  async bookingComplete(oid) {
    try {

      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE `bookings` SET `status` = 'available' WHERE `bookings`.`oid` = '"+oid+"'";

       //  console.log(query);
        connection.query(query,(err, result) => {
          if (err) reject(new Error(err.message));
          
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }



  // booking customer details
  async getCustomerDetails() {
    try {
   //   console.log("check")

      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT c.cusid, c.fname, c.tele, c.email FROM customers c JOIN bookings b ON c.cusid = b.cusid WHERE  b.status = 'booked';";

      //  console.log(query);
        connection.query(query,(err, result) => {
          if (err) reject(new Error(err.message));
          
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  } 



}

module.exports = Order;
