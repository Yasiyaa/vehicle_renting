var checkin = new Vue({
  el: "#iscompanyCheck",
  data: {
    iscompany: "",
    customer:''
  },
  mounted() {
    this.iscompany = JSON.parse(localStorage.getItem('company')).isCompany,
    this.customer = JSON.parse(localStorage.getItem('checkCustomer')).isCustomer,
    console.log(this.customer);
  },
  updated() {},

  methods: {
    check: function () {
      
    },
  },
});
