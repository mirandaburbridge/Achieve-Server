let express = require("express");
let router = express.Router();
const Item = require("../db").import("../models/items.js");

router.get("/:userId", async (req, res) => {
    //setup pagination constants
    // const limit = req.params.limit;
    // const offset = (req.params.page - 1) * limit;
    const userId = req.user.id
    // //get goals from pagination and createdAt Descending order
    // //most recent goals will be sent first
    // const query = {
    //     limit: limit,
    //     offset: offset,
    //     order: [["createdAt", "DESC"]],
    // };

    // //get total number of goals
    // const count = await Goal.count();

    //get goals and return them with count
    Item.findAll({
        where: { userId: userId }
    })
        .then((items) => {
            const restRes = { items: items };
            res.status(200).json(restRes);
        })
        .then((err) => res.status(500).json(err))
        .catch((err) => console.log(err));
});

//Create Item
router.post("/:userId/:goalId", function (req, res) {
    const item = {
        userId: req.params.userId,
        goalId: req.params.goalId,
        dueDate: req.body.item.dueDate,
        description: req.body.item.description,
        isComplete: false,
    };
    Item.create(item)
        .then((item) => res.status(200).json(item))
        .catch((err) => res.status(500).json({ error: err }));
});
//Update item
router.put("/update/:itemId", function (req, res) {
    const updateItemEntry = {
        dueDate: req.body.item.dueDate,
        description: req.body.item.description,
        isComplete: false,
    };
    const query = { where: { id: req.params.itemId } };
    Item.update(updateItemEntry, query)
        .then((item) => res.status(200).json(item))
        .catch((err) => res.status(500).json({ error: err }));
});
//Delete Item
router.delete("/delete/:itemId", function (req, res) {
    const query = { where: { id: req.params.itemId } };
    Item.destroy(query)
        .then(() => res.status(200).json({ message: "This item has been removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;