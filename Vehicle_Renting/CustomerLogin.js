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
            const checkCustomer = {
              id: res.data[0].cusid, 
              isCustomer: true
            };
            const company = {
              id: res.data[0].cid, 
              isCompany:false
            };

            // Store the customer object in local storage as a JSON string
            localStorage.setItem("checkCustomer", JSON.stringify(checkCustomer));
            localStorage.setItem("company", JSON.stringify(company));
         

 
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