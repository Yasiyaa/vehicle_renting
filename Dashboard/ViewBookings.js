var viewBooking = new Vue({
    el: "#viewBooking",
    data: {
       bookings:[],
       cusDetails:[]
       
       

    },
    mounted() {
      
   this.getBookings();
   this.getCustomerDetails();
        
    },
    updated() {},
    methods: {
        
      getBookings: function () {
      
        var details = {
            companyID:JSON.parse(localStorage.getItem('company')).id,
           // cusid:booking.cusid
        }
        
        console.log(details)
        axios
        .get("http://localhost:5000/order", {
            params: {
              companyID: details.companyID,
              
            },
          })
          .then((res) => {
            if (res.status == 200) {
              console.log(res.data);
              this.bookings = res.data;
              console.log(this.bookings)
            } else {
              alert("Error occured!");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },

      markReturn: function(booking) {
       //console.log(booking.vid);
       var vehicleID = {
        vid:booking.vid,
        oid:booking.oid
       }
       axios
      .post("http://localhost:5000/markavailable",vehicleID)
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
          alert("Vehicle mark as returned !");
        } else {
          alert("Incorrect data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
        
      },

      getCustomerDetails: function () {
   
        axios
        .get("http://localhost:5000/getCustomerDetails")
          .then((res) => {
            if (res.status == 200) {
             // console.log(res.data);
              this.cusDetails = res.data;
              console.log(this.cusDetails)
            } else {
              alert("Error occured!");
            }
          })
          .catch((err) => {
            console.log(err);
          });
        
      }



    },
  });
  