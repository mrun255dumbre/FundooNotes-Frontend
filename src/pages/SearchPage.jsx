import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../utils/AppContext';
import { NoteComponent } from '../components/NoteComponent';
import noteService from '../services/note-service';
import labelService from '../services/label-service';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

})
)

const SearchPage = props => {
    const classes = useStyles();
    const { user } = useContext(AppContext);
    const [notes, setNotes] = useState([]);
    const [labelsLookup, setLabelsLookup] = useState([]);
    const { searchText = '0' } = useParams();

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

    const searchResult = notes.filter(item => (
        item.title.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1
        || item.description.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1
        || item.labels.some(label => label.labelName.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1)
    ));

    return <Grid container spacing={3}>
        {searchResult.length > 0 ?
            <>{searchResult.map(note =>
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
            )}</> :
            <>
                <Grid item xs={12} md={12}>
                    <Typography align="center">
                        No matching results.
                    </Typography>
                </Grid>        
            </>}
    </Grid>;
}

export { SearchPage };