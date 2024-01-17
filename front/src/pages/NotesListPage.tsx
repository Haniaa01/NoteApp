import React, { useState, useEffect, useContext } from 'react';
import ListItem from '../components/ListItem';
import AddButton from "../components/AddButton"; // Correctly importing AddButton
import AuthContext from "../context/AuthContext";

const NotesListPage: React.FC = () => {
    const [notes, setNotes] = useState<any[]>([]); // Consider using a specific type instead of any
    const { authTokens, logoutUser } = useContext(AuthContext); // Destructuring authTokens directly

    useEffect(() => {
        getNotes();
    }, []); // Dependency array is empty, meaning this effect runs once on component mount

    const getNotes = async () => {
        if (!authTokens) {
            console.log("No auth tokens available.");
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/notes/', {
            headers: {
                'Authorization': `Bearer ${authTokens.access}` // Corrected the spacing in the Authorization header
            }
        });

        if (!response.ok) {
            console.error("Failed to fetch notes:", response.statusText);
            return;
        }
        if(response.status === 200){
            setNotes(notes)
        }else if(response.statusText === "Unauthorized"){
            logoutUser()
        }

        const data = await response.json();
        console.log("DATA:", data);
        setNotes(data);
    };

    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">Count of notes: {notes.length}</p>
            </div>

            <div className="notes-list">
                {notes.map((note, index) => (
                    <ListItem key={index} note={note} />
                ))}
            </div>

            <AddButton />
        </div>
    );
}

export default NotesListPage;
