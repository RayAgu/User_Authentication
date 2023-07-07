const {newUser, userLogin, getUser, getSingle, updateUser, deleteUser} = require("../controller/userCnotroller");
const router = require("express").Router();
const {ChekUser} = require("../controller/authorization")

router.route("/").get( (req, res) => {
    res.json("Welcome to my authentication api homepage")
});

router.route("/signup").post(newUser)
router.route("/login").post(userLogin)
router.route("/users").get(getUser)
router.route("/:id/single").get(getSingle)
router.route("/:id/update/:userId").patch(ChekUser, updateUser)
router.route("/:id/users/:userId").get(ChekUser, getUser)
router.route("/:id/delete/:userId").delete(ChekUser, deleteUser)

module.exports = router