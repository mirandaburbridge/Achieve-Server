// router
const router = require("express").Router();

//database
const Note = require("../db").notes;
const User = require("../db").user;


////////////////////////////////////////////////
// CREATE NOTE
////////////////////////////////////////////////
router.post("/notes", (req, res) => {
    const noteEntry = {
        description: req.body.description,
        userId: req.user.id
    };

    Note.create(noteEntry)
        .then((note) => res.status(200).json(note))
        .catch((err) => res.status(500).json({ error: err }));
});

////////////////////////////////////////////////
// GET NOTES (PAGINATED)
////////////////////////////////////////////////
router.get("/notes", async (req, res) => {
    //setup pagination constants
    const limit = req.params.limit;
    const offset = (req.params.page - 1) * limit;

    //get notes from pagination and createdAt Descending order
    //most recent notes will be sent first
    const query = {
        limit: limit,
        offset: offset,
        order: [["createdAt", "DESC"]],
    };

    //get total number of notes
    const count = await Note.count();

    //get notes and return them with count
    Note.findAll(query)
        .then((notes) => {
            const restRes = { notes: notes, total: count };
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