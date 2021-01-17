import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader, CardContent, CardActions, Tooltip, makeStyles, Dialog, DialogContentText, DialogActions, Button, DialogTitle, InputBase } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import Unpin from '../assets/icons/pin.svg';
import Pin from '../assets/icons/unpin.svg';
import noteService from '../services/note-service';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles((theme) => ({
    cardIcons: {
        zoom: 0.8
    },
    paper: { minWidth: "500px" },
    dialogTitle: {
        display: 'flex',
        flexDirection: "row"
    },
    actionContainer: {
        width: "90%"
    }
})
)

const NoteComponent = props => {
    const classes = useStyles();
    const { noteId, title, description, pin, trash, archive, getNoteData } = props;
    const [actionsVisibility, setActionsVisibility] = useState(false);
    const [editDialog, setEditDialog] = useState({
        visible: false,
        noteId: '',
        title: '',
        description: '',
        pin: 0,
        archive: 0,
        trash: 0,
    });

    const pinNote = () => {
        noteService.pinNote(noteId).then(() => {
            getNoteData();
        })
    }

    const archiveNote = () => {
        noteService.archiveNote(noteId).then(() => {
            getNoteData();
        })
    }

    const trashNote = () => {
        noteService.trashNote(noteId).then(() => {
            getNoteData();
        })
    }

    const deleteForEver = () => {
        noteService.deleteForEver(noteId).then(() => {
            getNoteData();
        })
    }

    const handleSave = () => {
        noteService.updateNote(editDialog).then(response => {
            if (response.status === 200) {
                //alert("note Updated");
                getNoteData();
            }
            setEditDialog({ ...editDialog, visible: false });
        }).catch();
    }

    const updateFields = newValues => {
        setEditDialog(prev => {
            const newContent = { ...prev, ...newValues };
            return newContent;
        })
    }

    return (
        <>
            <Card
                onMouseEnter={() => setActionsVisibility(true)}
                onMouseLeave={() => setActionsVisibility(false)}>
                <CardHeader
                    title={title}
                    action={
                        <IconButton aria-label="settings" onClick={pinNote}>
                            <img src={pin ? Pin : Unpin} alt="pin" />
                        </IconButton>
                    }
                    onClick={() => setEditDialog({ ...editDialog, noteId, title, description, pin, trash, archive, visible: true })}
                />
                <CardContent onClick={() => setEditDialog({ ...editDialog, noteId, title, description, pin, trash, archive, visible: true })}>
                    {description}
                </CardContent>
                <CardActions>
                    {trash ?
                        <>
                            <Tooltip title={"Delete forever"}>
                                <IconButton onClick={deleteForEver}>
                                    <DeleteForeverIcon className={classes.cardIcons} style={{ visibility: actionsVisibility ? 'visible' : 'hidden' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Restore"}>
                                <IconButton onClick={trashNote}>
                                    <RestoreFromTrashIcon className={classes.cardIcons} style={{ visibility: actionsVisibility ? 'visible' : 'hidden' }} />
                                </IconButton>
                            </Tooltip>

                        </>
                        : <>
                            <Tooltip title={archive ? "Unarchive" : "Archive"}>
                                <IconButton onClick={archiveNote}>
                                    <ArchiveOutlinedIcon className={classes.cardIcons} style={{ visibility: actionsVisibility ? 'visible' : 'hidden' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Delete"}>
                                <IconButton onClick={trashNote}>
                                    <DeleteOutlinedIcon className={classes.cardIcons} style={{ visibility: actionsVisibility ? 'visible' : 'hidden' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Label">
                                <IconButton>
                                    <LabelOutlinedIcon className={classes.cardIcons} style={{ visibility: actionsVisibility ? 'visible' : 'hidden' }} />
                                </IconButton>
                            </Tooltip>
                        </>}
                </CardActions>
            </Card>

            <Dialog
                open={editDialog.visible}
                onClose={handleSave}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{ paper: classes.paper }}
            >
                <DialogTitle id="alert-dialog-title">
                    <div className={classes.dialogTitle}>
                        <InputBase value={editDialog.title} fullWidth placeholder='Title' onChange={event => updateFields({ title: event.target.value })} />
                        <div className='note-icon-pin' role='button' onClick={() => updateFields({ pin: editDialog.pin === 1 ? 0 : 1 })} >
                            <img src={editDialog.pin === 1 ? Pin : Unpin} alt="" />
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <InputBase value={editDialog.description} multiline fullWidth placeholder='Take a note..' onChange={event => updateFields({ description: event.target.value })} />
                </DialogContent>
                <DialogActions>
                    {trash ?
                        <div className={classes.actionContainer}>
                            <Tooltip title={"Delete forever"}>
                                <IconButton onClick={deleteForEver}>
                                    <DeleteForeverIcon className={classes.cardIcons} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Restore"}>
                                <IconButton onClick={trashNote}>
                                    <RestoreFromTrashIcon className={classes.cardIcons} />
                                </IconButton>
                            </Tooltip>

                        </div>
                        : <div className={classes.actionContainer}>
                            <Tooltip title={archive ? "Unarchive" : "Archive"}>
                                <IconButton onClick={archiveNote}>
                                    <ArchiveOutlinedIcon className={classes.cardIcons} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Delete"}>
                                <IconButton onClick={trashNote}>
                                    <DeleteOutlinedIcon className={classes.cardIcons} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Label">
                                <IconButton>
                                    <LabelOutlinedIcon className={classes.cardIcons} />
                                </IconButton>
                            </Tooltip>
                        </div>}
                    <Button onClick={handleSave} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export { NoteComponent };