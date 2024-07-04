var login = new Vue({
    el: "#loginformCustomer",
    data: {
      email: "",
      password: "",
    },
    mounted() {},
    updated() {},
    methods: {
      authenticate: function () {
        var credentials = { password: this.password, email: this.email };
  
        axios
          .post("http://localhost:5000/customer/authenticate", credentials)
          .then((res) => {
            if (res.status == 200 && res.data.length > 0) {
              console.log(res);

              // Create the customer object
            const customer = {
              id: res.data[0].cusid, // Assuming res.data[0].companyId contains the company ID
            };

            // Store the customer object in local storage as a JSON string
            localStorage.setItem("customer", JSON.stringify(customer));
              window.location.href = "../Dashboard/index.html";
              
            } else {
             alert("Incorrect email or password");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  });