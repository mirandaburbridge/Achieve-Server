// require("dotenv");
const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

const validateSession = require("../middleware/validate-session");

////////////////////////////////////////////////
// CREATE USER
////////////////////////////////////////////////
router.post("/create", function (req, res) {
    User.create({
        username: req.body.user.username,
        passwordHash: bcrypt.hashSync(req.body.user.password, 13),
        isAdmin: false
    })
        .then((user) => {
            let token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: 60 * 60 * 24 }
            );

            res.json({
                user: user,
                message: "User successfully created",
                sessionToken: token,
            });
        })

        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

////////////////////////////////////////////////
// LOGIN USER
////////////////////////////////////////////////
router.post("/login", function (req, res) {
    User.findOne({
        where: {
            username: req.body.user.username,
        },
    })

        .then((user) => {
            if (user) {
                bcrypt.compare(
                    req.body.user.password,
                    user.passwordHash,
                    function (err, matches) {
                        if (matches) {
                            let token = jwt.sign(
                                { id: user.id, username: user.username },
                                process.env.JWT_SECRET,
                                { expiresIn: 60 * 60 * 24 }
                            );

                            res.status(200).json({
                                user: user,
                                message: "User successfully Logged in",
                                sessionToken: token,
                            });
                        } else {
                            res.status(502).send({ error: "Username or Password Incorrect" });
                        }
                    }
                );
            } else {
                res.status(500).json({ error: "User does not exist." });
            }
        })
        .catch((err) => res.status(500).json({ error: err }));
});

//////////////////////////////////////////////////////////////////////
// GET USERS
//////////////////////////////////////////////////////////////////////
//We use validateSession here to protect the path of unknown users from
//getting our users data
router.get("/display", validateSession, (req, res) => {
    if (req.user.isAdmin == true) {
        User.findAll()
            .then((user) => {
                res.status(200).json({ user });
            })
            .catch((err) => res.status(500).json({ err: err }));
    } else {
        res.status(502).json({ err: 'not authorized' })
    }
});

//UPDATE USER
router.put("/update/:userId", validateSession, (req, res) => {
    if (req.user.isAdmin == true) {
        const user = {
            username: req.body.user.username,
            isAdmin: req.body.user.isAdmin
        }
        const query = { where: { id: req.params.userId } };
        User.update(user, query)
            .then((user) => {
                res.status(200).json({ username: user.username });
            })
            .catch((err) => res.status(500).json({ err: err }));
    } else {
        res.status(502).json({ err: 'not authorized' })
    }
});

//DELETE USER
router.delete("/delete/:userId", validateSession, async (req, res) => {
    if (req.user.isAdmin == true) {
        const query = { where: { id: req.params.userId } };

        User.destroy(query)
            .then(() => res.status(200).json({ message: "User Removed" }))
            .catch((err) => res.status(500).json({ error: err }));
    } else {
        res.status(502).json({ err: 'not authorized' })
    }
});

module.exports = router;
