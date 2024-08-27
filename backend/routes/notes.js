const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')

// ROUTE 1: Get All the notes using: GET /api/notes/fetchallnotes. Login Required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// ROUTE 2: Create a new note using: POST /api/notes/addnote. Login Required
router.post('/addnote', fetchUser,
    [
        body('title', 'Enter a valid title').isLength({ min: 5 }),
        body('description', 'Description must be atleast 5 charatcers').isLength({ min: 5 })
    ],
    async (req, res) => {
        const { title, description, tag } = req.body;
        // If errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

// ROUTE 3: Update Existing note using: PUT /api/notes/udpatenote/:id. Login Required
router.put('/updatenote/:id', fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // Create new note object
        const newNote = {};
        if(title){ newNote.title = title }
        if(description){ newNote.description = description }
        if(title){ newNote.tag = tag }
        
        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send ("Not Found") }

        // Allow Updation only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// ROUTE 4: Delete a note using: Delete /api/notes/deletenote/:id. Login Required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        const{ title, description, tag } = req.body;  
        
         //Find the note to be deleted and delete it
         let note = await Notes.findById(req.params.id);
         if(!note){ return res.status(404).send ("Not Found") }

         // Allow Deletion only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })

    } catch (error) {   
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


module.exports = router