const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

const Note = mongoose.model("Note", NoteSchema);
module.exports = { Note };