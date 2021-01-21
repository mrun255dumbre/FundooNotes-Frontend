import React, { useContext, useEffect, useState } from 'react';
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
import listview from '../assets/icons/listview.svg';
import gridview from '../assets/icons/gridview.svg';
import { AppContext } from '../utils/AppContext';
import { NavLink, useHistory } from "react-router-dom";
import { menu } from '../utils/menu';
import { ViewTypes } from '../utils/constants';
import userService from '../services/user-service';
import EditLabelsDialog from '../components/EditLabels';
import labelService from '../services/label-service';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#fff",
    color: "#000",
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
    marginRight: 10,
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
    backgroundColor: "#f1f3f4"
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
  },
  selectedMenu: {
    backgroundColor: "#feefc3",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  }
}));

const ThemeWrapper = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { user, logout, viewType, setViewType } = useContext(AppContext);
  const [selectedMenu, setSelectedMenu] = useState(menu[0].key)
  let history = useHistory();
  const [username, setUsername] = React.useState(false);
  const [labels, setLabels] = useState([]);
  const [labelDialogVisibility, seLabelDialogVisibility] = useState(false);

  const updateLabels = () => {
    labelService.getLabel().then(labelsResponse => {
      setLabels(labelsResponse.data);
    })
  }

  useEffect(() => {
    userService.getUser().then(response => {
      setUsername(response.data.data);
      updateLabels();
    })
  }, [user])

  const handleDrawerOpen = () => {
    setOpen(!open);
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

  const changeViewType = () => {
    viewType === ViewTypes.Grid ? setViewType(ViewTypes.List) : setViewType(ViewTypes.Grid)
  }

  const currentMenu = menu.find(item => item.key === selectedMenu);
  const pageHeader = currentMenu && (currentMenu.key === menu[0].key ? null : currentMenu.label);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          {pageHeader ?
            <Typography variant="h5">{pageHeader}</Typography> :
            <>
              <img src={KeepLogo} alt="logo" />
              <Typography variant="h6" noWrap>
                Fundoo Note
              </Typography>
            </>
          }
          <SearchBar className={classes.searchBar}
            onChange={() => { }}
            onRequestSearch={() => console.log('onRequestSearch')} />
          <div className={classes.toolbarIcons}>
            {viewType === ViewTypes.Grid ? <img src={listview} className={classes.toolbarIcon} onClick={changeViewType} /> : <img src={gridview} className={classes.toolbarIcon} onClick={changeViewType} />}
            <RefreshIcon className={classes.toolbarIcon} onClick={() => window.location.reload()} />
            <div className={classes.userProfile} onClick={clearUserData}>{username && username.charAt(0).toUpperCase()}</div>
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
          {menu.map(({ key, label, link, icon: Icon, nonLink }) => (
            <ListItem
              className={clsx({
                [classes.selectedMenu]: selectedMenu === key
              })}
              button
              key={key}
              component={nonLink ? 'div' : LinkBtn}
              onClick={() => {
                setSelectedMenu(key)
                if (nonLink) {
                  seLabelDialogVisibility(true);
                }
              }}
              to={link || ""}>
              <ListItemIcon><Icon /></ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
          {labels.map(({ labelId, labelName }) => (
            <ListItem
              className={clsx({
                [classes.selectedMenu]: selectedMenu === `${labelId}`
              })}
              button
              key={`${labelId}`}
              component={LinkBtn}
              onClick={() => setSelectedMenu(`${labelId}`)}
              to={`/label/${labelId}`}>
              <ListItemIcon><LabelOutlinedIcon /></ListItemIcon>
              <ListItemText primary={labelName} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      <EditLabelsDialog
        open={labelDialogVisibility}
        labels={labels}
        seLabelDialogVisibility={seLabelDialogVisibility}
        updateLabels={updateLabels} />
    </div>
  );
}

export { ThemeWrapper };