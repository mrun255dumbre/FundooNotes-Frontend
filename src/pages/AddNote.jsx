import React from 'react';
import { Card, InputBase, Button, createMuiTheme, MuiThemeProvider } from '@material-ui/core/';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Unpin from '../assets/icons/pin.svg';
import Pin from '../assets/icons/unpin.svg';
import Archive from '@material-ui/icons/ArchiveOutlined';
import Unarchive from '@material-ui/icons/UnarchiveOutlined';
import Trash from '@material-ui/icons/DeleteOutlined';
import noteService from '../services/note-service';
import "./style.scss";
import Label from '@material-ui/icons/LabelOutlined';
import Restore from '@material-ui/icons/RestoreFromTrash';

const theme = createMuiTheme({
    overrides: {
        MuiChip: {
            label: {
                fontSize: '0.81 rem'
            },
            root: {
                height: 26
            }
        }
    }, typography: {
        useNextVariants: true,
    },
});


export default class AddNote extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            noteId: '',
            title: '',
            description: '',
            isPin: 0,
            isArchive: 0,
            isTrash: 0,
        };
        this.handleTakeNote = this.handleTakeNote.bind(this);
    }

    handleNewNote = (message) => {
        var Note = {
            noteId: '',
            title: this.state.title,
            description: this.state.description,
            isPin: this.state.isPin,
            isArchive: this.state.isArchive,
            isTrash: this.state.isTrash
        }
        if ((Note.title !== '' || Note.description !== '')) {
            Note = this.sendNote(Note);
            this.setState({
                active: !this.state.active,
                noteId: '',
                title: '',
                description: '',
                isPin: 0,
                isArchive: 0,
                isTrash: 0
            });
            console.log("pin"+Note.isPin+"archive"+Note.archive);
        }
        else {
            this.setState({
                active: !this.state.active,
                isPin: 0,
                isArchive: 0,
                isTrash: 0
            });
        }
    }

    sendNote = (note) => {
        console.log("pin",note);
        noteService.createNote(note).then(response => {
            console.log("note response",response);
            if (response.status === 200) {
                note.noteId = response.data.noteId;
                this.props.getNoteData();
            }
        }).catch();
        return note;
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleTakeNote = () => {
        this.setState({
            active: !this.state.active,
        });
        this.handleNewNote('Note Created');
    }

    handleClickAway = () => {
        this.setState({
            active: false,
        },
            this.handleNewNote('Note Created'));
    }

    handlePin = () => {
        this.setState({
            isPin: this.state.isPin === 1 ? 0 : 1
        });
    }

    handlearchive = () => {
        this.setState({
            isArchive: 1,
        }, () => {
            this.handleNewNote('Note archive');
            console.log('archive', this.state);
        });
    }

    render() {
        var Open = (<MuiThemeProvider theme={theme}>
            <ClickAwayListener onClickAway={this.handleClickAway} >
                <Card className='takenote-div-open' style={{ backgroundColor: this.state.color }} >
                    <div className='note-top-div'>
                        <InputBase name='title' fullWidth placeholder='Title' onChange={this.handleInput} />
                        <div className='note-icon-pin' role='button' onClick={this.handlePin} >
                            <img src={this.state.isPin === 1 ? Pin : Unpin} alt="" />
                        </div>
                    </div>
                    <InputBase name='description' multiline fullWidth placeholder='Take a note..' onChange={this.handleInput} />
                    <div className='takenote-bottom-icons-div'>
                        <div className="take-note-icon-div">
                            <div className='note-icon-div' role='Button' onClick={this.handletrash}>
                                {this.state.isTrash === 1 ? <Restore/> : <Trash/>}
                            </div>
                            <div className='note-icon-div' role='Button' onClick={this.handlearchive}>
                                {this.state.isArchive === 1 ? <Unarchive/> : <Archive/>}
                            </div>
                            <div className='note-icon-div' role='Button'>
                                <Label/>
                            </div>
                        </div>    
                        <Button className='card-button-close' component="span" onClick={this.handleTakeNote}>
                            Close
                        </Button>
                    </div>
                </Card>
            </ClickAwayListener>
        </MuiThemeProvider>
        );

        var Close = (<div className='takenote-div' onClick={this.handleTakeNote} >
            <InputBase fullWidth placeholder='Take a note..' />
        </div>);

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    {this.state.active ? (Open) : (Close)}
                </div>
            </MuiThemeProvider>
        );
    }


}