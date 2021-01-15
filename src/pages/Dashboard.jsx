import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Input, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import ToggleDisplay from 'react-toggle-display';
import SearchBar from 'material-ui-search-bar'
import Divider from '@material-ui/core/Divider';
import menu from '../assets/icons/menu.svg';
import newmenu from '../assets/icons/newmenu.svg';
import back from '../assets/icons/back.svg';
import refresh from '../assets/icons/refresh.svg';
import listview from '../assets/icons/listview.svg';
import gridview from '../assets/icons/gridview.svg';
import googleapp from '../assets/icons/googleapp.svg';
import notification from '../assets/icons/notification.svg';
import reminder from '../assets/icons/reminder.svg';
import notes from '../assets/icons/note.svg';
import createnewlabel from '../assets/icons/createlabel.svg';
import trash from '../assets/icons/trash.svg';
import archive from '../assets/icons/archive.svg';
import Note from '../components/notes/Note';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            background: null,
            show: false,
            open: false,
            user: null,
            username: null,
            title: null,
            labelopen: false,
            newlabel: null,
            viewbtn: true,
            opensearch: false
        };
    }

    render() {
        return (
            <div className="rootdiv">
                

                {window.location.pathname === '/home/notes' && <Note />}
                
            </div>
        );
    }
}

export default Dashboard;