const connection = require("../dbConnection");
let instance = null;

class Vehicle {
  static getVehicleInstance() {
    return instance ? instance : new Vehicle();
  }

  //add new vehicle
  async addNewVehicle(companyID, type, noOfseats, availablestat) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO `vehicle` (`companyID`, `type`, `noOfseats`, `availablestat`) VALUES (?,?,?,?)";

        connection.query(
          query,
          [companyID, type, noOfseats, availablestat],
          (err, result) => {
            if (err) {
              reject(new Error(err.message));
            } else {
              resolve(result.insertId);
            }
          }
        );
      });

      return {
        vid: insertId,
        companyID,
        type,
        noOfseats,
        availablestat,
      };
    } catch (error) {
      console.log(error);
      throw error; // Optionally, rethrow the error to handle it further up the call stack
    }
  }



  async getAllVehicleData() {
        try {
            const response = await new Promise((resolve, reject) => {
              const query = "SELECT * FROM  vehicle";
  
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = Vehicle;