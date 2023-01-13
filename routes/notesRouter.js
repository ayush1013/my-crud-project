const express = require("express");
const { NoteModel } = require("../models/notes.model");

const notesRouter = express();

notesRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find();
        res.send(notes)
    } catch (err) {
        console.log("couldn't get the notes")
        console.log(err);
    }
})

notesRouter.post("/create", async (req, res) => {
    const payload = req.body;
    try {
        const note = new NoteModel(payload);
        await note.save();
        res.send("note created successfully")
    } catch (err) {
        console.log("note couldn't be created")
        console.log(err);
    }
})

notesRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const id = req.params.id
    const note = await NoteModel.find({"_id": id});
    const userID_in_note = note[0].userID
    const userID_in_req = req.body.userID
    console.log(userID_in_note)
    try {
        if(userID_in_note === userID_in_req){
            await NoteModel.findByIdAndUpdate({ _id: id }, payload);
            res.send("note updated successfully")
        }else{
            res.send("You are not athorized")
        }
    } catch (err) {
        console.log("note couldn't be updated")
        console.log(err);
    }
})

notesRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    try {
        await NoteModel.findByIdAndDelete({ _id: id });
        res.send("note Deleted successfully")
    } catch (err) {
        console.log("note couldn't be deleted")
        console.log(err);
    }
})

module.exports = {
    notesRouter
}