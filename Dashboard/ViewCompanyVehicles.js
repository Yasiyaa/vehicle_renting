var viewBooking = new Vue({
    el: "#viewCompanyVehicles",
    data: {
       vehicles:[],
       
       

    },
    mounted() {
      
   this.getAllVehicles();
        
    },
    updated() {},
    methods: {
        
    getAllVehicles: function () {
      
        var details = {
            companyID:JSON.parse(localStorage.getItem('company')).id,
        }
        
        console.log(details)
        axios
        .get("http://localhost:5000/allvehicles", {
            params: {
                companyID: details.companyID,
            },
          })
          .then((res) => {
            if (res.status == 200) {
              console.log(res.data);
              this.vehicles = res.data;
            } else {
              alert("Error occured!");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },

    

    },
  });
  