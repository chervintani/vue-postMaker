const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        location: { type: String, required: true },
        filename: String,
        image: String
    },
    {
        timestamps: true
    }
);

var imageSchema = new Schema({
    filename: String,
    image: String
})
const Image = mongoose.model('Albumn', imageSchema);
const Post = mongoose.model("Post", PostSchema);
module.exports = { Post, Image };