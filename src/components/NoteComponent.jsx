import React, { useContext, useState } from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader, CardContent, CardActions, Tooltip, makeStyles, Dialog, DialogContentText, DialogActions, Button, DialogTitle, InputBase, Chip, Grid, Paper, MenuList, Popper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import Unpin from '../assets/icons/pin.svg';
import Pin from '../assets/icons/unpin.svg';
import noteService from '../services/note-service';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { AppContext } from '../utils/AppContext';
import labelService from '../services/label-service';

const useStyles = makeStyles((theme) => ({
    cardIcons: {
        zoom: 0.8
    },
    paper: { minWidth: "200px" },
    dialogTitle: {
        display: 'flex',
        flexDirection: "row"
    },
    actionContainer: {
        width: "90%"
    },
    chip:{
        marginRight:5,
        height:22
    },
    cardContentStyle:{
        paddingBottom:'0px'
    }
})
)

const NoteComponent = props => {
    const classes = useStyles();
    const { noteId, title, description, pin, trash, archive, getNoteData, labelsLookup = [], labels } = props;
    const [actionsVisibility, setActionsVisibility] = useState(false);
    const { handleClick } = useContext(AppContext);
    const [editDialog, setEditDialog] = useState({
        visible: false,
        noteId: '',
        title: '',
        description: '',
        pin: 0,
        archive: 0,
        trash: 0,
    });

    const [labelDialog, setLabelDialog] = useState({ open: false })

    const getLabelCheck = id => {
        return labels.some(item => item.labelId === id);
    }

    const handleAddLabel = item => {
        labelService.addLabeltoNote(item.labelId, noteId).then(() => {
            getNoteData();
        })
    }

    const removeLabel = item => {
        labelService.removeLabelToNote(item.labelId, noteId).then(() => {
            getNoteData();
        })
    }

    const pinNote = () => {
        noteService.pinNote(noteId).then(() => {
            getNoteData();
        })
    }

    const archiveNote = () => {
        noteService.archiveNote(noteId).then(data => {
            getNoteData();
            handleClick(data.data.message);
        }).catch((error) => {
            if (error.response) {
                handleClick(error.response.data.data);
            }
        })
    }

    const trashNote = () => {
        noteService.trashNote(noteId).then(data => {
            getNoteData();
            handleClick(data.data.message);
        }).catch((error) => {
            if (error.response) {
                handleClick(error.response.data.data);
            }
        })
    }

    const deleteForEver = () => {
        noteService.deleteForEver(noteId).then(data => {
            getNoteData();
            handleClick(data.data.message);
        }).catch((error) => {
            if (error.response) {
                handleClick(error.response.data.data);
            }
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

    const handlePopupLabel = () => {
        setLabelDialog({ open: !labelDialog.open })
    }

    return (
        <>
            <Card
                onMouseEnter={() => setActionsVisibility(true)}
                onMouseLeave={() => setActionsVisibility(false)}>
                <CardContent style={{ display: 'flex' }} className={classes.cardContentStyle}>
                    <Typography variant="h6" style={{ flex: 1 }} onClick={() => setEditDialog({ ...editDialog, noteId, title, description, pin, trash, archive, visible: true })}>{title}</Typography>
                    <IconButton aria-label="settings" onClick={pinNote} style={{ justifyContent: 'flex-end',padding:'4px' }}>
                        <img src={pin ? Pin : Unpin} alt="pin" />
                    </IconButton>
                </CardContent>
                <CardContent onClick={() => setEditDialog({ ...editDialog, noteId, title, description, pin, trash, archive, visible: true })} className={classes.cardContentStyle}>
                    {description}
                </CardContent>
                <CardContent onClick={() => setEditDialog({ ...editDialog, noteId, title, description, pin, trash, archive, visible: true })} style={{paddingTop:'5px'}} className={classes.cardContentStyle}>
                    {labels.map(item => (<Chip key={item.labelId} label={item.labelName} className={classes.chip} onDelete={() => removeLabel(item)} />))}
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
                                    {archive ? <UnarchiveOutlinedIcon className={classes.cardIcons} style={{ visibility: actionsVisibility ? 'visible' : 'hidden' }} /> : <ArchiveOutlinedIcon className={classes.cardIcons} style={{ visibility: actionsVisibility ? 'visible' : 'hidden' }} />}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Delete"}>
                                <IconButton onClick={trashNote}>
                                    <DeleteOutlinedIcon className={classes.cardIcons} style={{ visibility: actionsVisibility ? 'visible' : 'hidden' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Label">
                                <IconButton onClick={handlePopupLabel}>
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

            <Dialog
                open={labelDialog.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{ paper: classes.paper }}
            >
                <DialogContent style={{ overflowY: 'hidden' }}>
                    <Grid container spacing={3}>
                        {labelsLookup.map(label => (
                            <Grid key={label.labelId} item xs={12} md={12}>
                                <Checkbox
                                    checked={getLabelCheck(label.labelId)}
                                    onChange={event => event.target.checked ? handleAddLabel(label): removeLabel(label)}
                                    name="checkedF"
                                    color="default"
                                />
                                {label.labelName}
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePopupLabel} color="default" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export { NoteComponent };