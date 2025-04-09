const mongoose = require("mongoose");
const User = require("./src/models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB connected");
    seedUsers();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

async function seedUsers() {
  try {
    // Xoá toàn bộ user
    await mongoose.connection.dropDatabase();

    // Danh sách user seed
    const users = [
      {
        name: "Nguyễn Văn A",
        email: "cus1@gm.com",
        password: "12345678",
        role: "CUSTOMER",
        phoneNumber: "0934726073",
        address: "123 Trần Cao Vân, quận Thanh Khê, thành phố Đà Nẵng, Việt Nam",
        isVerified: true,
        isLocked: false,
        cmnd: "047003012342",
        image: {
          public_ID: "avatar_NguyenVanA",
          url: "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"
        },
      },
      {
        name: "Nguyễn Văn B",
        email: "cus2@gm.com",
        password: "12345678",
        role: "CUSTOMER",
        phoneNumber: "0934726073",
        address: "123 Trần Cao Vân, quận Thanh Khê, thành phố Đà Nẵng, Việt Nam",
        isVerified: true,
        isLocked: true,
        cmnd: "047003012342",
        image: {
          public_ID: "avatar_NguyenVanB",
          url: "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"
        },
      },
      {
        name: "Nguyễn Văn Admin",
        email: "ad1@gm.com",
        password: "12345678",
        role: "ADMIN",
        phoneNumber: "0934726073",
        address: "123 Trần Cao Vân, quận Thanh Khê, thành phố Đà Nẵng, Việt Nam",
        isVerified: true,
        isLocked: false,
        cmnd: "047003012342",
        image: {
          public_ID: "avatar_NguyenVanAdmin",
          url: "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"
        },
      },

    ];

    // Dùng new + save() để AutoIncrement hoạt động
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created user ${user.name} with _id = ${user._id}`);
    }

    console.log("✅ Seed completed!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}
