const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        location: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

const UploadSchema = new mongoose.Schema({
    imagename: String
})
const uploadModel = mongoose.model('uploadimage', UploadSchema);
const Note = mongoose.model("Note", NoteSchema);
module.exports = { Note, uploadModel };