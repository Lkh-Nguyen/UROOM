
const mongoose = require('mongoose');
require('dotenv').config();

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

// Connect to MongoDB
const dbConnecion = async () =>{
    const mongoURI = getMongoURI();
    try{
        const db = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`✅ Connected to MongoDB: ${db.connection.host}`);
        console.log(`📍 Database: ${mongoURI.includes('mongodb+srv') ? 'MongoDB Atlas (Production)' : 'Local MongoDB (Development)'}`);
    } catch(error){
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

module.exports = dbConnecion;
