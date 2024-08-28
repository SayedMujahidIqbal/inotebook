import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    
    const notesInitial = [
        {
          "_id": "66cdcd1392e6a8975b35cf2d",
          "user": "66cd849881c69040bf275868",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2024-08-27T12:56:51.664Z",
          "__v": 0
        },
        {
          "_id": "66cdcd2392e6a8975b35cf2f",
          "user": "66cd849881c69040bf275868",
          "title": "My Title 2",
          "description": "Please wake up early Please",
          "tag": "very personal",
          "date": "2024-08-27T12:57:07.774Z",
          "__v": 0
        }
      ] 
      const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;