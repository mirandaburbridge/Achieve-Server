// router
const router = require("express").Router();

//database
const Note = require("../db").import('../models/notes');
const User = require("../db").import('../models/user');


////////////////////////////////////////////////
// CREATE NOTE
////////////////////////////////////////////////
router.post("/create", (req, res) => {
    const note = {
        description: req.body.note.description,
        userId: req.user.id
    };

    Note.create(note)
        .then((note) => res.status(200).json(note))
        .catch((err) => res.status(500).json({ error: err }));
});

////////////////////////////////////////////////
// GET NOTES (PAGINATED)
////////////////////////////////////////////////
router.get("/", async (req, res) => {
    // //setup pagination constants
    // const limit = req.params.limit;
    // const offset = (req.params.page - 1) * limit;
    const userId = req.user.id

    // //get notes from pagination and createdAt Descending order
    // //most recent notes will be sent first
    // const query = {
    //     limit: limit,
    //     offset: offset,
    //     order: [["createdAt", "DESC"]],
    // };

    // //get total number of notes
    // const count = await Note.count();


    //get notes and return them with count
    Note.findAll({
        where: { userId: userId }
    })
        .then((notes) => {
            const restRes = { notes: notes };
            res.status(200).json(restRes);
        })
        .then((err) => res.status(500).json(err))
        .catch((err) => console.log(err));
});


///////////////////////////////////////////////////////////////
//DELETE NOTE
///////////////////////////////////////////////////////////////
router.delete("/:noteID", async (req, res) => {

    const query = { where: { id: req.params.noteID } };

    Note.destroy(query)
        .then(() => res.status(200).json({ message: "Note Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;