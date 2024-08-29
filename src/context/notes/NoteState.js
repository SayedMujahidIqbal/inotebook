import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const notesInitial = [
    {
      "_id": "66cdcd13192e6a8975b35cf2d",
      "user": "66cd849881c69040bf275868",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-08-27T12:56:51.664Z",
      "__v": 0
    },
    {
      "_id": "66cdcd2392e63a8975b35cf2f",
      "user": "66cd849881c69040bf275868",
      "title": "My Title 2",
      "description": "Please wake up early Please",
      "tag": "very personal",
      "date": "2024-08-27T12:57:07.774Z",
      "__v": 0
    },
    {
      "_id": "66cdcd1392e64a8975b35cf2d",
      "user": "66cd849881c69040bf275868",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-08-27T12:56:51.664Z",
      "__v": 0
    },
    {
      "_id": "66cdcd2392e6a85975b35cf2f",
      "user": "66cd849881c69040bf275868",
      "title": "My Title 2",
      "description": "Please wake up early Please",
      "tag": "very personal",
      "date": "2024-08-27T12:57:07.774Z",
      "__v": 0
    },
    {
      "_id": "66cdcd1392e6a89756b35cf2d",
      "user": "66cd849881c69040bf275868",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-08-27T12:56:51.664Z",
      "__v": 0
    },
    {
      "_id": "66cdcd2392e6a89757b35cf2f",
      "user": "66cd849881c69040bf275868",
      "title": "My Title 2",
      "description": "Please wake up early Please",
      "tag": "very personal",
      "date": "2024-08-27T12:57:07.774Z",
      "__v": 0
    },
    {
      "_id": "66cdcd1392e6a89785b35cf2d",
      "user": "66cd849881c69040bf275868",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-08-27T12:56:51.664Z",
      "__v": 0
    },
    {
      "_id": "66cdcd2392e6a89975b35cf2f",
      "user": "66cd849881c69040bf275868",
      "title": "My Title 2",
      "description": "Please wake up early Please",
      "tag": "very personal",
      "date": "2024-08-27T12:57:07.774Z",
      "__v": 0
    },
  ]
  const [notes, setNotes] = useState(notesInitial)

  // Add a Note
  const addNote = (title, description, tag) => {
    // Todo API Call
    console.log("Adding a new Note");
    const note = {

      "_id": "66cdcd2392wd6a89975b35cf2f",
      "user": "66cd849881c69040bf275868",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-08-27T12:57:07.774Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  // Delete a Note
  const deleteNote = (id) => {

  }
  // Edit a Note
  const editNote = (id) => {

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;