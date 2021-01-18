import React, { useState, useContext, useEffect } from 'react';
import { Card, InputBase, Button, createMuiTheme, MuiThemeProvider } from '@material-ui/core/';
import Chip from '@material-ui/core/Chip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import unpin from '../assets/icons/pin.svg';
import pin from '../assets/icons/unpin.svg';
import unarchive from '../assets/icons/unarchive.svg';
import archive from '../assets/icons/archive.svg';
import trash from '../assets/icons/trash.svg';
import more from '../assets/icons/more.svg';
import noteService from '../services/note-service'
import "./style.scss";
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
            pin: 0,
            archive: 0,
            trash: 0,
        };
        this.handleTakeNote = this.handleTakeNote.bind(this);
    }

    handleNewNote = (message) => {
        var Note = {
            noteId: '',
            title: this.state.title,
            description: this.state.description,
            pin: this.state.pin,
            color: this.state.color,
            archive: this.state.archive,
            trash: this.state.trash
        }
        if ((Note.title !== '' || Note.description !== '')) {
            Note = this.sendNote(Note);
            this.setState({
                active: !this.state.active,
                noteId: '',
                title: '',
                description: '',
                pin: 0,
                archive: 0,
                trash: 0
            });
        }
        else {
            this.setState({
                active: !this.state.active,
                pin: 0,
                archive: 0,
                trash: 0
            });
        }
    }

    sendNote = (note) => {
        noteService.createNote(note).then(response => {
            if (response.status === 200) {
                //alert("note Created");
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
            pin: this.state.pin === 1 ? 0 : 1

        });
    }

    handlearchive = () => {
        this.setState({
            archive: 1,
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
                            <img src={this.state.pin === 1 ? pin : unpin} alt="" />
                        </div>
                    </div>
                    <InputBase name='description' multiline fullWidth placeholder='Take a note..' onChange={this.handleInput} />
                    <div className='takenote-bottom-icons-div'>
                        <div className="take-note-icon-div">
                            <div className='note-icon-div' role='Button' onClick={this.handlearchive}>
                                <img src={this.state.archive === 1 ? trash : trash} alt="" />
                            </div>
                            <div className='note-icon-div' role='Button' onClick={this.handlearchive}>
                                <img src={this.state.archive === 1 ? unarchive : archive} alt="" />
                            </div>
                            <div className='note-icon-div' role='Button'>
                                <img src={more} alt="" />
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