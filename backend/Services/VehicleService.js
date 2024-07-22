const connection = require("../dbConnection");
let instance = null;

class Vehicle {
  static getVehicleInstance() {
    return instance ? instance : new Vehicle();
  }

  //add new vehicle
  async addNewVehicle(
    vehicleNumber,
    model,
    companyID,
    noOfseats,
    availablestat,
    vehicleImage
  ) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO `vehicle` (`vehicleNumber`, `model`, `companyID`, `noOfseats`, `availablestat`,`vehicleImage`) VALUES (?,?,?,?,?,?)";

        connection.query(
          query,
          [
            vehicleNumber,
            model,
            companyID,
            noOfseats,
            availablestat,
            vehicleImage,
          ],
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
        const query =
          "SELECT * FROM  vehicle where availablestat = 'available'";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });


      // sorting algorithm to find the most used car
      function bubbleSortDescending(arr, key) {
        let n = arr.length;
        let swapped;
        do {
          swapped = false;
          for (let i = 0; i < n - 1; i++) {
            if (arr[i][key] < arr[i + 1][key]) {
             
              let temp = arr[i];
              arr[i] = arr[i + 1];
              arr[i + 1] = temp;
              swapped = true;
            }
          }
          n--; 
        } while (swapped);
        return arr;
      }

      const sortedVehicles = bubbleSortDescending(response, 'vehicleweight');
     // console.log(sortedVehicles);


      return sortedVehicles;
    } catch (error) {
      console.log(error);
    }
  }


  async getAllVehicles(companyID){

    try {
     
         const response = await new Promise((resolve, reject) => {
           const query =
             "SELECT * FROM `vehicle` where companyID = '"+companyID+"'";
   
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

module.exports = Vehicle;
