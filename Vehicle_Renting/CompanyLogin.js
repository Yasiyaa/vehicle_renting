var login = new Vue({
  el: "#loginformCompany",
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
        .post("http://localhost:5000/company/authenticate", credentials)
        .then((res) => {
          if (res.status == 200 && res.data.length > 0) {
            console.log(res);
            // Create the company object
            const company = {
              id: res.data[0].cid, // Assuming res.data[0].companyId contains the company ID
            };

            // Store the company object in local storage as a JSON string
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
