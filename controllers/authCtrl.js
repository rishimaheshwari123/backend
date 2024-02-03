const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")

const registerCtrl = async (req, res) => {
    try {
        const { username, email, date, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "Email is already registred " })
        }

        // ********************************
        // hash password start 
        // ********************************
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(password, salt);

        // ********************************
        // hash password end
        // ********************************

        const newUser = await new userModel({ username, email, date, password: hash_password }).save();
        res.status(201).send({ message: "user registration successfully", newUser, token: await newUser.generateToken(), userId: newUser._id.toString() })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "enternal server errror" })

    }
}


const loginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await userModel.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // compare password ***********************
        const user = await bcrypt.compare(password, userExist.password);
        // compare password ***********************

        if (user) {
            res.status(200).json({
                message: "Login successfully",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            })
        } else {
            res.status(401).json({ message: "Invalid email or password" })
        }

    } catch (error) {
        res.status(500).json("Internal server error")
    }
}


const user = async (req, res) => {
    try {
        const userData = req.user;
        // console.log(userData)
        return res.status(200).json({ userData })
    } catch (error) {
        console.log("error from the user root ", error)
    }
}

module.exports = { registerCtrl, loginCtrl, user }