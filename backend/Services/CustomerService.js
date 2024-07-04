const connection = require("../dbConnection");
let instance = null;

class Customer {
  static getCustomerInstance() {
    return instance ? instance : new Customer();
  }

  // authenticate customer
  async authenticateCustomer(email, password) {
    try {
      const response = await new Promise((resolve, reject) => {
        let query = "SELECT * FROM customers WHERE email = ? AND password = ?";

        connection.query(query, [email, password], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //add new Customer
  async addNewCustomer(fname, lname, tele, email, password) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO `customers` (`fname`, `lname`, `tele`, `email`, `password`) VALUES (?,?,?,?,?)";

        connection.query(
          query,
          [fname, lname, tele, email, password],
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
        cusid: insertId,
        fname,
        lname,
        tele,
        email,
        password,
      };
    } catch (error) {
      console.log(error);
      throw error; // Optionally, rethrow the error to handle it further up the call stack
    }
  }
}

module.exports = Customer;
