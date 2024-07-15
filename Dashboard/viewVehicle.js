var viewVehicle = new Vue({
    el: "#viewVehicle",
    data: {
       vehicles:[],
       url:'../Vehicle_Renting/images/'

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
    },
  });
  