const mongoose = require("mongoose");

const noteSchema =  mongoose.Schema({
    title: String,
    body: String,
    device: String,
    user: String,
    userID: String
}, {
    versionKey: false
}); // <-- Add closing parenthesis here

const NoteModel = mongoose.model("Note", noteSchema);

module.exports = {
    NoteModel
};
