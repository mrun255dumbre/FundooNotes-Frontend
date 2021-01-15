import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KeepLogo from '../assets/icons/keeplogo.png';
import SearchBar from 'material-ui-search-bar';
import RefreshIcon from '@material-ui/icons/Refresh';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { AppContext } from '../utils/AppContext';
import { NavLink, useHistory } from "react-router-dom";
import { menu } from '../utils/menu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  searchBar: {
    marginLeft: 20,
    width: '50%',
    backgroundColor: "#eeeeee"
  },
  toolbarIcon: {
    marginLeft: 40
  },
  toolbarIcons: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  userProfile: {
    display: "flex",
    width: 40,
    height: 40,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: "#008000",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    cursor: "pointer"
  }
}));

const ThemeWrapper = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useContext(AppContext);
  let history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const clearUserData = () => {
    logout();
    history.push("/");
  }

  const LinkBtn = React.forwardRef((props, ref) => (
    <NavLink to={props.to} {...props} innerRef={ref} exact />
  ));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="#fff"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <img src={KeepLogo} alt="logo" />
          <Typography variant="h6" noWrap>
            Fundoo Note
          </Typography>
          <SearchBar className={classes.searchBar}
            onChange={() => { }}
            onRequestSearch={() => console.log('onRequestSearch')} />
          <div className={classes.toolbarIcons}>
            <ViewStreamIcon className={classes.toolbarIcon} />
            <RefreshIcon className={classes.toolbarIcon} />
            <SettingsOutlinedIcon className={classes.toolbarIcon} />
          
            <div className={classes.userProfile} onClick={clearUserData}>{user && user.username && user.username.charAt(0).toUpperCase()}</div>
          </div> 
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menu.map(({ key, label, link, icon: Icon }) => (
            <ListItem
              button
              key={key}
              component={LinkBtn}
              to={link || ""}>
              <ListItemIcon><Icon /></ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export { ThemeWrapper };