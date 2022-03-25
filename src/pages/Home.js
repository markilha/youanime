import React, { useState, useEffect } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Button,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Grid,
  Hidden,
  Switch,
} from "@material-ui/core";
import { useTheme,alpha } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";     
import HomeIcon from "@material-ui/icons/Home";



import qs from "qs";
import SearchInput from "../components/SearchInput";
import Pagination from "../components/Pagination";
import './styles.css';
const api = "https://kitsu.io/api/edge/";

const LIMIT = 12;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: theme.palette.background.dark,
  },
  appBar: {
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    height: 25,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    borderRight: "none",
  },
  menuIcon: {
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(6),
  },
  icons: {
    paddingRight: theme.spacing(5),
  },
  grow: {
    flexGrow: 1,
  },
  listItemText: {
    fontSize: 14,
  },
  listItem: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  subheader: {
    textTransform: "uppercase",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),   
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  
}));
function Home({ darkMode, setDarkMode }) {
  const classes = useStyles();
  const theme = useTheme();
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setInfo({});

    const query = {
      page: {
        limit: LIMIT,
        offset,
      },
    };

    if (text) {
      query.filter = {
        text,
      };
    }

    fetch(`${api}anime?${qs.stringify(query)}`)
      .then((response) => response.json())
      .then((response) => {
        setInfo(response);
      });
  }, [text, offset]);

  return (
    <div className={classes.root}>
      <AppBar color="inherit" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuIcon}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <img
            src={ 
              theme.palette.type === "dark"
                ? "/images/branco.png"
                : "/images/preto.png"
            }
            alt="logo"
            className={classes.logo}
          />
          <div className={classes.grow} />


          <div className={classes.search}> 
           
           
            <SearchInput value={text} onChange={(search) => setText(search)} />           
           
          </div>


          <Switch
            value={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className={classes.icons}
          />
        
          <Button
            startIcon={<AccountCircle />}
            variant="outlined"
            color="secondary"
          >
            Fazer Login
          </Button>
        </Toolbar>
      </AppBar>
      <Box display="flex">
        <Hidden mdDown>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                <ListItem button classes={{ root: classes.listItem }}>
                  <ListItemIcon>{<HomeIcon />}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.listItemText,
                    }}
                    primary={"Início"}
                  />
                </ListItem>
                
              </List>
              <Divider />          

             
            </div>
          </Drawer>
        </Hidden>

        <Box p={8}>
          <Toolbar />
          <Typography
            variant="h5"
            color="textPrimary"
            style={{ fontWeight: 600 }}
          >
            Animes
          </Typography>

          <Grid container spacing={4}>
            {text && !info.data && <span>Carregando...</span>}
            {info.data &&
              info.data.map((anime) => (
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Box>
                    <img
                      style={{ width: "100%" }}
                      src={anime.attributes.posterImage.small}
                      alt={anime.attributes.canonicalTitle}
                    />
                    <Box>
                      <Typography
                        style={{ fontWeight: 600 }}
                        gutterBottom
                        variant="body1"
                        color="textPrimary"
                      >
                        {anime.attributes.canonicalTitle}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}

            <Grid item lg={3} md={4} sm={6} xs={12}>
              {info.meta && (
                <Pagination
                  limit={LIMIT}
                  total={info.meta.count}
                  offset={offset}
                  setOffset={setOffset}
                />
              )}
            </Grid>        
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
