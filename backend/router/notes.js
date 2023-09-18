const express = require('express');
const NoteController = require('../controllers/note');
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

api.get('/note', [md_auth.asureAuth], NoteController.getNotes);
api.get('/note/:_id', [md_auth.asureAuth], NoteController.getNote);
api.post('/note', [md_auth.asureAuth], NoteController.createNote);
api.patch(
    '/note/:_id',
    [md_auth.asureAuth],
    NoteController.updateNote
);
api.delete(
    '/note/:_id',
    [md_auth.asureAuth],
    NoteController.deleteNote
);

module.exports = api;
