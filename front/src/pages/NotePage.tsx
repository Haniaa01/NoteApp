import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { ReactComponent as Back } from '../assets/back.svg';
import AuthContext from "../context/AuthContext";
interface MatchParams {
    id: string;
}

interface NotePageProps extends RouteComponentProps<MatchParams> {}

interface Note {
    id?: string | undefined;
    body: string;
}

const NotePage: React.FC<NotePageProps> = ({ match, history }) => {
    const noteID = match.params.id;
    const { authTokens } = useContext(AuthContext); // Destructuring authTokens directly

    const [note, setNote] = useState<Note | null>(null);

    useEffect(() => {
        getNote();
    }, [noteID]);

    const getNote = async () => {
        try {
            if (noteID === 'new') return

            const response = await fetch(`/api/notes/${noteID}/`, {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`
                }
            });
            if (!response.ok) {
                console.error('Failed to fetch note:', response.statusText);
                return;
            }

            const data: Note = await response.json();
            setNote(data);
        } catch (error) {
            console.error('Error fetching note:', error);
        }

    };


    const createNote = async () => {
        try {
            const response = await fetch(`/api/notes/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`
                },
                body: JSON.stringify(note)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error('Error during note creation:', error);
        }
    };


    const updateNote = async () => {

        const response = await fetch(`/api/notes/${noteID}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            },
            body: JSON.stringify(note)
        });

    };


    const deleteNote = async () => {
        try {
            const response = await fetch(`/api/notes/${noteID}/`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            history.push('/');
        } catch (error) {
            console.error('Error during deletion:', error);
        }
    };


    const handleSubmit = async () => {
        if (note) {
            if (noteID !== 'new' && note.body === '') {
                await deleteNote();
            } else if (noteID !== 'new') {
                await updateNote();
            } else if (noteID === 'new' && note.body !== '') {
                await createNote();
            }
            history.push('/');
        } else {
            console.error('Note is null');
        }
    };


    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNote({...note, body: e.target.value});
    };

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/"><Back onClick={handleSubmit}/></Link>
                </h3>
                {noteID !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (<button onClick={handleSubmit}>Done</button>)
                }

            </div>
            <textarea onChange={handleTextareaChange} value={note?.body}></textarea>
        </div>
    );
};

export default NotePage;
