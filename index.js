const express = require("express")
const connectDB = require("./utils/db")
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();
// rest object 
const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", require("./routers/authRoute"))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})