import noteContext from "../context/notes/noteContext" 
import React, { useContext, useEffect, useRef, useState } from 'react' 
import Noteitem from "./Noteitem"
import AddNote from "./AddNote"
import { useNavigate } from "react-router-dom" 

const Notes = (props) => {

    const context = useContext(noteContext) // used the useContext here for notes.
    let navigate = useNavigate(); //new// added navigate here
    const { notes, getNotes, editNote } = context; // used the destructuring to get the notes, getNotes from the context (NoteState.js file).
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            navigate("/login") //new// added navigate location here
        }
        // eslint-disable-next-line
    }, [])

    //  added above line to avoid error, that line is: // eslint-disable-next-line

    const ref = useRef(null) //  used ref here
    const refClose = useRef(null) //  used another different named ref here
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" }) //


    const updateNote = (currentNote) => { //  used ref here
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag }) //

    }

    const handleClick = (e) => {
        // console.log("updating the notes doremon", note) //
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click() //
        props.showAlert("Updated Successfully", "success") // added alert
    }

    const onChange = (e) => { 
        setNote({ ...note, [e.target.name]: e.target.value }) 
    }

    return (
        <>

            <AddNote showAlert={props.showAlert} /> {/* we added <AddNote/> component here from the AddNote.js file. // added showAlert */}

            {/*  <!-- Button trigger modal --> */}
            {/* bellow line we used ref, and used d-none means display none it is for display hide */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/*  <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">


                            <form className="container my-3">

                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label"> Title </label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required /> {/*  added minLength 3 */}
                                    {/*  above we added value={} */}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={3} required /> {/*  added minLength 3 */}
                                    {/*  above we added value={} */}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                    {/*  above we added value={} */}
                                </div>

                            </form>


                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> {/* // used refClose here to close the modal. */}
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 3} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button> {/*  used the disabled here*/}
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <h2>Your Notes</h2>

                <div className="container mx-2">
                    {notes.length === 0 && "No notes to display"} {/*  if the notes length is 0 then this string will print */}
                </div>

                {/*  used the .map function to print the notes on the DOM. */}
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} /> // we are sending note to the <Noteitem> as a props,  and we have set the key also.

                })}
            </div>
        </>
    )
}

export default Notes
