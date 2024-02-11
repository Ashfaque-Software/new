const express = require("express");
const { NoteModel } = require("../models/noteModel");
const { auth } = require("../middleware/auth.middleware");

const noteRouter = express.Router();

noteRouter.get("/", auth, async (req, res) => {
    try {
        const notes = await NoteModel.find({ userID: req.user.userId });
        res.send(notes);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

noteRouter.post("/add", auth, async (req, res) => {
    const { title, body, device } = req.body;
    try {
        const note = new NoteModel({ title, body, device, userID: req.user.userId });
        await note.save();
        res.send("Note has been added");
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

noteRouter.patch("/update/:noteId", auth, async (req, res) => {
    const { noteId } = req.params;
    try {
        await NoteModel.findOneAndUpdate({ _id: noteId, userID: req.user.userId }, req.body);
        res.send(`Note has been updated with the id: ${noteId}`);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

noteRouter.delete("/delete/:noteId", auth, async (req, res) => {
    const { noteId } = req.params;
    try {
        await NoteModel.findOneAndDelete({ _id: noteId, userID: req.user.userId });
        res.send(`Note has been deleted with the id: ${noteId}`);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

module.exports = {
    noteRouter
};
