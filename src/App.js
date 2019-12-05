import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './components/Navbar';
import Search from './components/Search';

function App() {
  return (
    <MuiThemeProvider>
      <BrowserRouter basename='/MovieApp/'>
         <Navbar/>
         <Search/>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
