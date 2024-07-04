var signup = new Vue({
  el: "#signupformCompany",
  data: {
    name: "",
    email: "",
    password: "",
  },
  mounted() {},
  updated() {},
  methods: {
    addNewCompany: function () {
      var credentials = {
        name: this.name,
        password: this.password,
        email: this.email,
      };

      axios
        .post("http://localhost:5000/company/sign-up", credentials)
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
