import { Grid, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../utils/AppContext';
import { NoteComponent } from '../components/NoteComponent';
import noteService from '../services/note-service';

const useStyles = makeStyles((theme) => ({

})
)

const Trash = props => {
    const classes = useStyles();
    const { user } = useContext(AppContext);
    const [notes, setNotes] = useState([]);

    const getNoteData = () => {
        noteService.getNote().then(data => {
            setNotes(data.data);
        });
    }

    useEffect(() => {
        getNoteData();
    }, [user])

    return <Grid container spacing={3}>
        {notes.filter(item => item.trash).map(note =>
            <Grid item xs={6} md={3} key={`${note.noteId}`}>
                <NoteComponent
                    noteId={note.noteId}
                    title={note.title}
                    description={note.description}
                    pin={note.pin}
                    trash={note.trash}
                    archive={note.archive}
                    getNoteData={getNoteData}
                />
            </Grid>
        )}
    </Grid>;
}

export { Trash };