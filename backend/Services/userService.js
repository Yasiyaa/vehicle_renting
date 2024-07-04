const connection = require("../dbConnection");
let instance = null;

class Customer {
  static getCustomerInstance() {
    return instance ? instance : new Customer();
  }

  // authenticate user
  async authenticate(email, password) {
    try {
      const response = await new Promise((resolve, reject) => {
        let query = "SELECT * FROM users WHERE email = ? and password = ? ";

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

  //add new customer
  async insertNewCustomer(fname, lname, email, telephone, nic, city, password) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO users (fname,lname,email,telephone,nic,city,password) VALUES (?,?,?,?,?,?,?);";

        connection.query(
          query,
          [fname, lname, email, telephone, nic, city, password],
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
        customerID: insertId, // Assuming the column name is 'customerID' in your table
        fname,
        lname,
        email,
        telephone,
        nic,
        city,
        password,
      };
    } catch (error) {
      console.log(error);
      throw error; // Optionally, rethrow the error to handle it further up the call stack
    }
  }

  // async getAllData() {
  //     try {
  //         const response = await new Promise((resolve, reject) => {
  //           //  const query = "SELECT * FROM customer_inquiries";

  //             connection.query(query, (err, results) => {
  //                 if (err) reject(new Error(err.message));
  //                 resolve(results);
  //             })
  //         });
  //         // console.log(response);
  //         return response;
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  // async insertNewQuery(cusid, type, inquiry, status) {
  //     try {

  //         const insertId = await new Promise((resolve, reject) => {
  //             const query = "insert into customer_inquiries (cusID,type,inquiry,status) values (?,?,?,?)";

  //             connection.query(query, [cusid,type,inquiry,status] , (err, result) => {
  //                 if (err) reject(new Error(err.message));
  //                 resolve(result.insertId);
  //             })
  //         });
  //         return {
  //             ID : insertId,
  //             cusID : cusid,
  //             type : type,
  //             inquiry : inquiry,
  //             status : status
  //         };
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }
}

module.exports = Customer;
