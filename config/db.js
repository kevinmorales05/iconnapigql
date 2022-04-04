const mongoose =require('mongoose');
require('dotenv').config({ path: '.env'});

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database connected!')
    } catch (error) {
        console.log('Connection error');
        console.log(error);
        process.exit(1);

    }
}
module.exports = connectDB;