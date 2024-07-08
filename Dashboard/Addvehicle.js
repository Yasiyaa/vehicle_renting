var addvehicle = new Vue({
    el: "#addvehicleform",
    data: {
        vehicleNumber: "",
        model: "",
        companyID: JSON.parse(localStorage.getItem('company')).id,
        noOfseats: "",
        availablestat: ""

    },
    mounted() {},
    updated() {},
    methods: {
      addNewVehicle: function () {
        var credentials = {
            vehicleNumber: this.vehicleNumber,
            model: this.model,
            companyID: this.companyID,
            noOfseats: this.noOfseats,
            availablestat: this.availablestat
        };
  
        axios
          .post("http://localhost:5000/vehicle/addnew", credentials)
          .then((res) => {
            if (res.status == 200) {
              console.log(res);
              alert("Vehicle added !");
            } else {
              alert("Incorrect data");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  });
  