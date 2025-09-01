import Note from "../models/Note.js";

export const addNote = async (req, res) => {
  const note = await Note.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(note);
};

export const getNotes = async (req, res) => {
  const notes = await Note.find({ contact: req.params.contactId }).populate("createdBy", "email");
  res.json(notes);
};
