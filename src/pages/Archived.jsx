import { Grid, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../utils/AppContext';
import { NoteComponent } from '../components/NoteComponent';
import noteService from '../services/note-service';
import labelService from '../services/label-service';

const useStyles = makeStyles((theme) => ({

})
)

const Archived = props => {
    const classes = useStyles();
    const { user } = useContext(AppContext);
    const [notes, setNotes] = useState([]);
    const [labelsLookup, setLabelsLookup] = useState([]);

    const getNoteData = () => {
        noteService.getNote().then(noteResponse => {
            labelService.getLabel().then(labelResponse => {
                let mergedResponse = [];
                noteResponse.data.forEach(n => {
                    let newNoteObject = { ...n, labels: [] };
                    labelResponse.data.forEach(l => {
                        let isNoteInLabel = l.listNotes.some(item => item.noteId === n.noteId)
                        if (isNoteInLabel) {
                            newNoteObject = { ...newNoteObject, labels: [...newNoteObject.labels, l] }
                        }
                    })
                    mergedResponse = [...mergedResponse, newNoteObject];
                })
                setNotes(mergedResponse);
                setLabelsLookup(labelResponse.data);
            })
        });
    }

    useEffect(() => {
        getNoteData();
    }, [user])

    return <Grid container spacing={3}>
        {notes.filter(item => item.archive).map(note =>
            <Grid item xs={6} md={3} key={`${note.noteId}`}>
                <NoteComponent
                    noteId={note.noteId}
                    title={note.title}
                    description={note.description}
                    pin={note.pin}
                    trash={note.trash}
                    archive={note.archive}
                    getNoteData={getNoteData}
                    labelsLookup={labelsLookup}
                    labels={note.labels}
                />
            </Grid>
        )}
    </Grid>;
}

export { Archived };