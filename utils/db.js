const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connection Successfully")
    } catch (error) {
        console.log("Connection Faild")
    }
}
module.exports = connectDB;