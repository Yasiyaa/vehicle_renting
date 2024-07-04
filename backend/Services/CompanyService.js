const connection = require("../dbConnection");
let instance = null;

class Company {
  static getCompanyInstance() {
    return instance ? instance : new Company();
  }

  // authenticate company
  async authenticateCompany(email, password) {
    try {
      const response = await new Promise((resolve, reject) => {
        let query = "SELECT * FROM companies WHERE email = ? AND password = ?";

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

  //add new Company
  async addNewCompany(name, email, password) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO companies (`name`, `email`, `password`) VALUES (?,?,?)";

        connection.query(query, [name, email, password], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result.insertId);
          }
        });
      });

      return {
        cid: insertId,
        name,
        email,
        password,
      };
    } catch (error) {
      console.log(error);
      throw error; // Optionally, rethrow the error to handle it further up the call stack
    }
  }
}


module.exports = Company;