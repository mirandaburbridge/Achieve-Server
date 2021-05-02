let express = require("express");
let router = express.Router();
const Item = require("../db").import("../models/items.js");
//Create Item
router.post("/action/:goalId", function (req, res) {
    const item = {
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