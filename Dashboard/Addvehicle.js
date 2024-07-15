var addvehicle = new Vue({
    el: "#addvehicleform",
    data: {
        vehicleNumber: "",
        model: "",
        companyID: JSON.parse(localStorage.getItem('company')).id,
        noOfseats: "",
        availablestat: "",
        vehicleImage:""

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
            availablestat: this.availablestat,
            vehicleImage: this.vehicleImage
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
      fileChange: function (e){
        let file = e.target.files[0];
        this.vehicleImage = file.name;
        let reader = new FileReader();
    
        
}
    },
  });
  