const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const NoteSchema = mongoose.Schema({
    titleNote: {type: String},
    bodyNote: {type: String},
    active: {type: Boolean},
    createdDate: {type: Date},
});

NoteSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Note', NoteSchema);
