import {ThemeProvider,createTheme,makeStyles } from '@material-ui/core';
import './App.css';
import Home from './components/Home'

function App() {
 
  const theme = createTheme({
    spacing:4,
   palette:{
     primary:{
       main: '#f44336'
     },
     secondary:{
       main:'#3f51b5'
     }
   },
  });


  return (
    <ThemeProvider theme={theme}>
     <Home/>
    </ThemeProvider>
  
  );
}



export default App;
