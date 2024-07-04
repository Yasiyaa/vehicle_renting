const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();



// importing routes

const user = require("./Routes/userRoute");
const Company = require("./Routes/CompanyRoute");
const Customer = require("./Routes/CustomerRoute");
const Vehicle = require("./Routes/VehicleRoute");
const Order = require("./Routes/OrderRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// route bind

app.use("/", Company);
app.use("/",Customer);
app.use("/",Vehicle);
app.use("/",Order);


app.listen(process.env.PORT, () => console.log("app is running"));