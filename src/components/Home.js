import React from "react";
import { makeStyles, AppBar, Toolbar, IconButton, MenuIcon, Typography, Button } from "@material-ui/core";
import { Menu, AccountCircle,VideoCall,Apps,MoreVert } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    appBar: {
        boxShadow: 'none'
    },
    grow: {
        flexGrow: 1
    },
    menuIcon:{
        paddingRight: theme.spacing(5),
        padddingLeft: theme.spacing(6)
    },
    logo:{
        height: 25,
    },
    icons: {
        padding: theme.spacing(5)
    }
}));

export default function Home() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar color="inherit" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuIcon}
                        color="inherit"
                        aria-label="menu">
                        <Menu />
                    </IconButton>
                    <img src="/images/preto.png" alt="logo" className={classes.logo}/>


                    <div className={classes.grow} />

                    <IconButton
                        className={classes.icons}
                        color="inherit"
                    >
                        <MoreVert />
                    </IconButton>
                    <IconButton
                        className={classes.icons}
                        color="inherit"
                    >
                        <Apps/>
                    </IconButton>
                    <IconButton
                        className={classes.icons}
                        color="inherit"
                    >
                        <VideoCall />
                    </IconButton>

                    <Button
                        startIcon={<AccountCircle />}
                        variant="outlined"
                        color="secondary">
                        Fazer Login
                    </Button>


                </Toolbar>
            </AppBar>
        </div>
    )
}