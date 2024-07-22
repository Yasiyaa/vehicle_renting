var viewVehicle = new Vue({
    el: "#viewVehicle",
    data: {
       vehicles:[],
       url:'../Vehicle_Renting/images/',
       

    },
    mounted() {
        this.getVehicles();
    },
    updated() {},
    methods: {
      getVehicles: function () {
        axios
          .get("http://localhost:5000/vehicle")
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

      bookVehicles: function (vehicle) {

        var details = {
          vid:vehicle.vid,
          cusid:JSON.parse(localStorage.getItem('checkCustomer')).id
          
        }
        
        console.log(vehicle);
        
        axios
        .post("http://localhost:5000/order/addnew",details)
        .then((res) =>{
          if (res.status == 200) {
            alert(" ok!");
          } else {
            alert("Error occured!");
          }
        })
      }

    },
  });
  