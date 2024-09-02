import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZDg0OTg4MWM2OTA0MGJmMjc1ODY4In0sImlhdCI6MTcyNTE4OTA1OH0.2XTM-APemqWSewRBfTsGOcGzJ86iiGfWADnBlPxiYFw"

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)



  // Fetch All Notes
  const getNotes = async () => {
    // Todo API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
    });
    const json = await response.json()
    setNotes(json);  
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
      body: JSON.stringify({title, description, tag})
    });
  }
  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
    });
  }
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;