var signup = new Vue({
    el: "#signupformCustomer",
    data: {
      fname: "",
      lname: "",
      tele: "",
      email: "",
      password: ""
    },
    mounted() {},
    updated() {},
    methods: {
      addNewCustomer: function () {
        var credentials = {
          fname: this.fname,
          lname: this.lname,
          tele:this.telephone,
          password: this.password,
          email: this.email,
        };
  
        axios
          .post("http://localhost:5000/customer/sign-up", credentials)
          .then((res) => {
            if (res.status == 200) {
              console.log(res);
              alert("user added !");
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
  