const connection = require("../dbConnection");
let instance = null;

class Vehicle {
  static getVehicleInstance() {
    return instance ? instance : new Vehicle();
  }

  //add new vehicle
  async addNewVehicle(vehicleNumber,model,companyID,noOfseats, availablestat,vehicleImage) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO `vehicle` (`vehicleNumber`, `model`, `companyID`, `noOfseats`, `availablestat`,`vehicleImage`) VALUES (?,?,?,?,?,?)";

        connection.query(
          query,
          [vehicleNumber,model,companyID,noOfseats, availablestat,vehicleImage],
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
        vehicleNumber,
        model,
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