const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const http = require("http");
const errorHandler = require("./src/middlewares/errorHandler");
const connectToDB = require("./src/config/dbConnection");
const authRoute = require("./src/route_controller/Auth/AuthRoute");
const SearchHotelRoute = require("./src/route_controller/Search_Hotel/SearchHotelRoute");
const HotelRouter = require("./src/route_controller/Hotel/HotelRoute");
const FeedbackRouter = require("./src/route_controller/Feedback/FeedbackRoute");
const RoomRouter = require("./src/route_controller/Room/RoomRouter");
const PaymentRouter = require("./src/route_controller/Payment/PaymentRoute");
const ReportedFeedbackRoute = require("./src/route_controller/ReportedFeedback/ReportedFeedbackRoute");

const cron = require("node-cron");
require("./src/route_controller/Reservations/ReservationsController"); 
const ReservationRouter = require("./src/route_controller/Reservations/ReservationsRouter");
const RefundingReservationRouter = require("./src/route_controller/RefundingReservation/RefundingReservationRoute");


const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// Kết nối DB
connectToDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//from cors
app.use(cors());

// Routes
app.use("/api/auth", authRoute);
// app.use("/api/customer", customerRoute);

app.use("/api/search", SearchHotelRoute);

app.use("/api/hotel", HotelRouter);
app.use("/api/room", RoomRouter);

app.use("/api/feedback", FeedbackRouter);
app.use("/api/reservations", ReservationRouter);

app.use("/api/payment", PaymentRouter);
app.use("/api/reportFeedback", ReportedFeedbackRoute);

app.use("/api/refunding_reservation", RefundingReservationRouter);
//from errorHandle
app.use(errorHandler);

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
