import React, { useState, useContext  } from 'react'
import noteContext from "../context/notes/noteContext" 

const AddNote = (props) => {
    const context = useContext(noteContext) // used the useContext here for notes.
    const { addNote } = context // used the destructuring to get the addNotes from the context (NoteState.js file).

    const [note, setNote] = useState({title:"", description:"", tag:""}) //

    const handleClick = (e)=>{// we have take the event's e in the onChange(e)
        e.preventDefault(); // this will avoid the page reloding while clicking on the submit button.
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
        props.showAlert("Added Successfully", "success") // added alert
    } 

    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }

    return (
        <div className="conatainer my-3">
            <h2>Add a Note</h2>
            {/*  we have copy paste this form from the bootstrap. */}
            <form className="container my-3">

                <div className="mb-3">
                    <label htmlFor="title" className="form-label"> Title </label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={3} required /> 
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label> 
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={3} required />
                </div>

                {/*  along with title and description we created tag here. */}
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={3} required /> 
                </div>

                <button disabled={note.title.length<3 || note.description.length<3} type="submit" className="btn btn-primary" onClick={handleClick} > Add Note</button>

            </form>
        </div>
    )
}

export default AddNote