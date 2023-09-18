const Note = require('../models/notes');

function getNotes(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdDate: "desc" },
    }

    Note.paginate({}, options, (error, notesStored) => {
        if (error) {
            res.status(400).send({ msg: "Error to get notes."})
        } else {
            res.status(200).send(notesStored)
        }
    });
}

function getNote(req, res) {
    const { _id } = req.params;

    Note.findOne({_id}).then((noteStored) => {
        res.status(200).send({ msg: noteStored });
    })
    .catch((err) => {
        res.status(400).send({ msg: `Error to get notes.: ${err}`});
    });

}

function createNote(req, res) {
    const note = new Note(req.body);
    note.createdDate = new Date();

    note.save().then((noteStored) => {
        res.status(201).send(noteStored);
    }).catch((err) => { 
        res.status(400).send({ msg: 'Error to create note.'});
    });
}

function updateNote(req, res) {
    const { _id } = req.params;
    const noteData = req.body;
    
    Note.findByIdAndUpdate({ _id }, noteData).then((result) => {
        res.status(200).send({ msg : "Success : Note updated."})
    }).catch((err) => {
        res.status(400).send({ msg : "Error to updated note."})
    });
}

function deleteNote(req, res) {
    const { _id } = req.params;

    Note.findByIdAndDelete({_id}).then(() => {
        res.status(400).send({ msg: "Success: Note deleted."});
    })
    .catch((err) => {
        res.status(400).send({ msg: "Error to delete note."});
    });
}

module.exports = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
}