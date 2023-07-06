const {newUser, userLogin} = require("../controller/userCnotroller");
const router = require("express").Router();

router.route("/").get( (req, res) => {
    res.json("Welcome to my authentication api homepage")
});

router.route("/signup").post(newUser)
router.route("/login").post(userLogin)

module.exports = router