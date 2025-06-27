const mongoose = require("mongoose");
const MonthlyPayment = require("./src/models/monthlyPayment");
const Reservation = require("./src/models/reservation");    
const Hotel = require("./src/models/hotel");
const Room = require("./src/models/room");
require("dotenv").config();

// Kiểm tra ENVIRONMENT và chọn MongoDB URI phù hợp
const getMongoURI = () => {
  const environment = process.env.ENVIRONMENT || 'development';
  console.log(`🌍 Environment: ${environment}`);
  
  if (environment === 'production') {
    console.log(`📡 Using Production MongoDB: ${process.env.MONGODB_URI_PRODUCTION}`);
    return process.env.MONGODB_URI_PRODUCTION;
  } else {
    console.log(`💻 Using Development MongoDB: ${process.env.MONGODB_URI_DEVELOPMENT}`);
    return process.env.MONGODB_URI_DEVELOPMENT;
  }
};

const uri = getMongoURI();

async function seedMonthlyPayments() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Lấy tất cả reservation COMPLETED
    const completedReservations = await Reservation.find({
      status: { $in: ["COMPLETED", "CHECKED OUT", "BOOKED", "PENDING", "CHECKED IN"] },
    }).populate("rooms.room");

    console.log("completedReservations: ", completedReservations.length);
    // Gom nhóm theo hotel, month, year
    const monthlyMap = {};
    completedReservations.forEach((reservation) => {
      const date = new Date( reservation.createdAt);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hotel = reservation.hotel.toString();
      const key = `${hotel}-${year}-${month}`;

      if (!monthlyMap[key]) {
        monthlyMap[key] = {
          hotel: reservation.hotel,
          year,
          month,
          amount: 0,
          paymentCount: 0,
        };
      }
      monthlyMap[key].amount += reservation.totalPrice || 0;
      monthlyMap[key].paymentCount += 1;
    });

    // Chuyển thành mảng và insert vào monthlyPayments
    const monthlyDocs = Object.values(monthlyMap);
    if (monthlyDocs.length > 0) {
      await MonthlyPayment.insertMany(monthlyDocs);
      console.log("Seeded monthlyPayments:", monthlyDocs.length);
    } else {
      console.log("No COMPLETED reservations found.");
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedMonthlyPayments();
