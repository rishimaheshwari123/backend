const express = require("express");
const { registerCtrl, loginCtrl, user } = require("../controllers/authCtrl");
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/register", registerCtrl)
router.post("/login", loginCtrl)
router.get("/user", authMiddleware, user)

module.exports = router;