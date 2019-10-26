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

const DeletedSchema = Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
},
    {
        timestamps: true
    })


const Note = mongoose.model("Note", NoteSchema);
const Delete = mongoose.model("Delete", DeletedSchema);
module.exports = {Note, Delete};