import React, { useState } from 'react';
import {ThemeProvider,createTheme,makeStyles } from '@material-ui/core';
import './App.css';
import Home from './components/Home'

function App() {
  const [darkMode, setDarkMode] = useState(false);
 
  const theme = createTheme({
    spacing:4,
   palette:{
    type: darkMode ? 'dark' : 'light',
     primary:{
       main: '#f44336'
     },
     secondary:{
       main:'#3f51b5'
     },
     background: {
      default: darkMode ? '#232323' : '#FFF',
      dark: darkMode ? '#181818' : '#f4f6f8',
      paper: darkMode ? '#232323' : '#FFF',
    },
   },
  });


  return (
    <ThemeProvider theme={theme}>
     <Home darkMode={darkMode} setDarkMode={setDarkMode}/>
    </ThemeProvider>
  
  );
}



export default App;
