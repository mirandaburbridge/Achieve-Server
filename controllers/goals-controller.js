// router
const router = require("express").Router();

//database
const Goal = require("../db").import('../models/goals');
const User = require("../db").import('../models/user');


////////////////////////////////////////////////
// CREATE GOAL
////////////////////////////////////////////////
router.post("/create", (req, res) => {
    const goal = {
        dueDate: req.body.goal.dueDate,
        description: req.body.goal.description,
        userId: req.user.id
    };

    Goal.create(goal)
        .then((goal) => res.status(200).json(goal))
        .catch((err) => res.status(500).json({ error: err }));
});

////////////////////////////////////////////////
// GET GOALS
////////////////////////////////////////////////
router.get("/", async (req, res) => {

    const userId = req.user.id

    Goal.findAll({
        where: { userId: userId }
    })
        .then((goals) => {
            const restRes = { goals: goals };
            res.status(200).json(restRes);
        })
        .then((err) => res.status(500).json(err))
        .catch((err) => console.log(err));
});


////////////////////////////////////////////////
// UPDATE GOAL
////////////////////////////////////////////////
router.put("/:goalID", async (req, res) => {

    const goal = {
        dueDate: req.body.dueDate,
        description: req.body.description,
        userId: req.user.id
    };

    const query = { where: { id: req.params.goalID } };

    //update Post
    Goal.update(goal, query)
        .then((goal) => res.status(200).json(goal))
        .catch((err) => res.status(500).json({ error: err }));
});

///////////////////////////////////////////////////////////////
//DELETE GOAL
///////////////////////////////////////////////////////////////
router.delete("/:goalID", async (req, res) => {

    const query = { where: { id: req.params.goalID } };

    Goal.destroy(query)
        .then(() => res.status(200).json({ message: "Goal Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
