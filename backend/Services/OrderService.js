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
        const query = "INSERT INTO `order` (`vid`, `cusid`) VALUES (?,?)";

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
      throw error; // Optionally, rethrow the error to handle it further up the call stack
    }
  }
}

module.exports = Order;
