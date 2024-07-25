var viewBooking = new Vue({
    el: "#viewBooking",
    data: {
       bookings:[],
       currentBookings:[]
       
       

    },
    mounted() {
      
   this.pastBookings();
   this.CurrentBookings();
        
    },
    updated() {},
    methods: {
        
    pastBookings: function () {
      
        var details = {
            cusid:JSON.parse(localStorage.getItem('checkCustomer')).id,
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


      CurrentBookings: function () {
      
        var details = {
            cusid:JSON.parse(localStorage.getItem('checkCustomer')).id,
        }
        
        console.log(details)
        axios
        .get("http://localhost:5000/currentbookings", {
            params: {
              cusid: details.cusid,
            },
          })
          .then((res) => {
            if (res.status == 200) {
              console.log(res.data);
              this.currentBookings = res.data;
            } else {
              alert("Error occured!");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },

      cancel: function (booking) {

       
      
        var OID = {
            oid:booking.oid,
            vid:booking.vid
        }
        
       
        axios
        .post("http://localhost:5000/cancelbooking",OID)
          .then((res) => {
            if (res.status == 200) {
              console.log(res);
              alert("Booking canceled !");
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
  