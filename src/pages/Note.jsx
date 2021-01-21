import React, { Component, useContext, useEffect, useState } from 'react';
import AddNote from './AddNote';
import { NoteComponent } from '../components/NoteComponent';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import noteService from '../services/note-service';
import labelService from '../services/label-service';
import { AppContext } from '../utils/AppContext';
import { ViewTypes } from '../utils/constants';

const useStyles = makeStyles((theme) => ({
    sectionTitle: {
        fontSize: 10,
        margin: 20,
        marginTop: 40
    }
})
)

const Note = () => {
    const classes = useStyles();
    const { user, viewType } = useContext(AppContext);
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

    const gridXS = viewType === ViewTypes.List ? 12 : 6;
    const gridMD = viewType === ViewTypes.List ? 7 : 3;
    const gridJustify = viewType === ViewTypes.List ? 'center' : 'left';
    const gridAlign = viewType === ViewTypes.List ? 'center' : 'left';

    const hasPinnedItems = notes.some(item => item.pin);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <AddNote getNoteData={getNoteData} />
            </Grid>
            <Grid item xs={12}>
                {hasPinnedItems &&
                    <div>
                        <Typography className={classes.sectionTitle} align={gridAlign}>PINNED</Typography>
                        <Grid container spacing={3} justify={gridJustify}>
                            {notes.filter(item => item.pin && !item.trash && !item.archive).map(note =>
                                <Grid item xs={gridXS} md={gridMD} key={`${note.noteId}`}>
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
                        </Grid>
                    </div>
                }
                {hasPinnedItems && <Typography className={classes.sectionTitle} align={gridAlign}>OTHERS</Typography>}
                <Grid container spacing={3} justify={gridJustify}>
                    {notes.filter(item => !item.pin && !item.trash && !item.archive).map(note =>
                        <Grid item xs={gridXS} md={gridMD} key={`${note.noteId}`}>
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
                </Grid>
            </Grid>
        </Grid>

    );
}

export { Note };