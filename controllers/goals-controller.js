// router
const router = require("express").Router();

//database
const Goal = require("../db").goals;
const User = require("../db").user;


////////////////////////////////////////////////
// CREATE GOAL
////////////////////////////////////////////////
router.post("/goals", (req, res) => {
    const goalEntry = {
        dueDate: req.body.dueDate,
        description: req.body.description,
        userId: req.user.id
    };

    Goal.create(goalEntry)
        .then((goal) => res.status(200).json(goal))
        .catch((err) => res.status(500).json({ error: err }));
});

////////////////////////////////////////////////
// GET GOALS (PAGINATED)
////////////////////////////////////////////////
router.get("/goals", async (req, res) => {
    //setup pagination constants
    const limit = req.params.limit;
    const offset = (req.params.page - 1) * limit;

    //get goals from pagination and createdAt Descending order
    //most recent goals will be sent first
    const query = {
        limit: limit,
        offset: offset,
        order: [["createdAt", "DESC"]],
    };

    //get total number of goals
    const count = await Goal.count();

    //get goals and return them with count
    Goal.findAll(query)
        .then((goals) => {
            const restRes = { goals: goals, total: count };
            res.status(200).json(restRes);
        })
        .then((err) => res.status(500).json(err))
        .catch((err) => console.log(err));
});


////////////////////////////////////////////////
// UPDATE GOAL
////////////////////////////////////////////////
router.put("/goalID", async (req, res) => {

    const goalEntry = {
        dueDate: req.body.dueDate,
        description: req.body.description,
        userId: req.user.id
    };

    const query = { where: { id: req.params.goalID } };

    //update Post
    Goal.update(goalEntry, query)
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
