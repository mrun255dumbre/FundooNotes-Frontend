import React from 'react';
import { InputBase, ListItem, ClickAwayListener, Dialog, ListItemIcon, ListItemText, DialogContent, DialogActions, Button, Grid, IconButton, TextField } from '@material-ui/core/';
import labelService from '../services/label-service';
import LabelIcon from '@material-ui/icons/Label';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CreateIcon from '@material-ui/icons/Create';
import List from '@material-ui/core/List';

export default class EditLabelsDialog extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            open: false,
            createNew: false,
            newLabel: '',
            deleteVisibility: null, //it will contain the id of label
            startEditingLabel: null, //it will contain the id of label
            editLabelValue: ""
        }
    }

    handleCloseEditor = () => {
        this.props.seLabelDialogVisibility(false)
    }
    handleClickEditLabels = () => {
        this.handleCloseEditor();
    }

    handleInputClick = () => {
        this.setState({
            createNew: true,
        });
    }

    handleInputClickAway = () => {
        this.setState({
            createNew: false,
        });
    }

    handleInputChange = (e) => {
        this.setState({
            newLabel: e.target.value,
        });
    }

    handleNewLabel = () => {
        if (this.state.newLabel !== '') {
            this.props.handleNewLabel(this.state.newLabel);
            this.setState({
                newLabel: ''
            });
        }
    }

    handleDeleteLabel = label => {
        labelService.deleteLabel(label.labelId).then(() => {
            this.props.updateLabels();
            this.handleCloseEditor();
        })

    }

    handleCreateLabel = () => {
        if (this.state.createNew && this.state.newLabel) {
            labelService.createLabel({ labelName: this.state.newLabel }).then(() => {
                this.props.updateLabels();
                this.setState({
                    newLabel: ""
                })
                this.handleCloseEditor()
            })
        } else {
            this.handleCloseEditor()
        }

    }

    handleEditLabel = label => {
        if (this.state.editLabelValue) {
            labelService.editLabel({ labelName: this.state.editLabelValue }, label.labelId).then(() => {
                this.setState({ startEditingLabel: null });
                this.props.updateLabels();
                // this.handleCloseEditor();
            })
        }

    }

    render() {
        // console.log('editlabel', this.state);

        const { fullScreen } = this.props;

        return (
            <div>
                {/* <div className={this.props.Page === 'Edit Labels' ? 'sidedrawer-list-selected' : 'sidedrawer-list'} onClick={this.handleClickEditLabels} >
                    <ListItem >
                        <ListItemIcon><img src={require('../assets/icons/editlabel.svg')} alt="" /></ListItemIcon>
                        <ListItemText primary='Edit Labels' />
                    </ListItem>
                </div> */}

                <Dialog
                    fullScreen={fullScreen}
                    open={this.props.open}
                    onClose={this.handleClickEditLabels}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                        <div className='edit-labels-diag-div'>
                            <div className='edit-labels-diag-heading'>
                                Edit Labels
                            </div>
                            <ClickAwayListener
                                onClickAway={this.handleInputClickAway}
                            >
                                <div className='edit-note-diag-createlabel' >
                                    <InputBase onClick={this.handleInputClick}
                                        className='create-new-label'
                                        fullWidth
                                        value={this.state.newLabel}
                                        placeholder="Create new label"
                                        onChange={this.handleInputChange}
                                    />
                                    <List onMouseLeave={() => this.setState({ deleteVisibility: null })}>
                                        {
                                            this.props.labels.map(item => (
                                                <ListItem key={item.labelId}
                                                    onMouseEnter={() => this.setState({ deleteVisibility: item.labelId })}
                                                >
                                                    <ListItemIcon>
                                                        {this.state.deleteVisibility === item.labelId ?
                                                            <IconButton onClick={() => this.handleDeleteLabel(item)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                            :
                                                            <IconButton onClick={() => { }}>
                                                                <LabelIcon />
                                                            </IconButton>}
                                                    </ListItemIcon>
                                                    {this.state.startEditingLabel === item.labelId ?
                                                        <TextField value={this.state.editLabelValue} onChange={event => this.setState({ editLabelValue: event.target.value })} />
                                                        :
                                                        <ListItemText primary={item.labelName} />
                                                    }
                                                    <ListItemIcon slot="end">
                                                        {this.state.startEditingLabel === item.labelId ?
                                                            <IconButton onClick={() => this.handleEditLabel(item)}>
                                                                <CheckOutlinedIcon />
                                                            </IconButton>
                                                            :
                                                            <IconButton onClick={() => this.setState({ startEditingLabel: item.labelId, editLabelValue: item.labelName })}>
                                                                <CreateIcon />
                                                            </IconButton>
                                                        }
                                                    </ListItemIcon>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </div>
                            </ClickAwayListener>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCreateLabel} color="primary">
                            Done
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
