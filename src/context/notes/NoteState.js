import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)



  // Fetch All Notes
  const getNotes = async () => {
    // Todo API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZDg0OTg4MWM2OTA0MGJmMjc1ODY4In0sImlhdCI6MTcyNDkzNTUzMn0.PoxD8csYOBmEk3VMRE4UIXgxzHS14gGO_83Yf4RDWU8"
      },
    });
    const json = await response.json()
    setNotes(json);  
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // Todo API Call
    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZDg0OTg4MWM2OTA0MGJmMjc1ODY4In0sImlhdCI6MTcyNDkzNDc4OH0.pkiGWfn_N4s-qXFc3cN3saXMH6C7nophosfsD0JvLyw"
      },
      body: JSON.stringify({ title, description, tag })
    });
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
    console.log(`Delete Note with id ${id}`);
    setNotes(notes.filter(note => note._id !== id))
  }
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZDg0OTg4MWM2OTA0MGJmMjc1ODY4In0sImlhdCI6MTcyNDkzNDc4OH0.pkiGWfn_N4s-qXFc3cN3saXMH6C7nophosfsD0JvLyw"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;