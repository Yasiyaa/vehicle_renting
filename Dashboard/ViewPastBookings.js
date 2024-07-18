var viewBooking = new Vue({
    el: "#viewBooking",
    data: {
       bookings:[],
       
       

    },
    mounted() {
      
   this.pastBookings();
        
    },
    updated() {},
    methods: {
        
    pastBookings: function () {
      
        var details = {
            cusid:JSON.parse(localStorage.getItem('customer')).id,
        }
        
        console.log(details)
        axios
        .get("http://localhost:5000/bookings", {
            params: {
              cusid: details.cusid,
            },
          })
          .then((res) => {
            if (res.status == 200) {
              console.log(res.data);
              this.bookings = res.data;
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
  