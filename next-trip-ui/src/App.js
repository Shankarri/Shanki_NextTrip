import React, { Component } from 'react';

// Router Variables for linking to different Pages
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Importing HTML Elements from Material UI
import {
  Grid,
  Toolbar,
  Icon, Typography, Avatar, Container,
} from '@material-ui/core';

import NavBar from './components/AppBar';

import API from './utils/api/api';
import './App.css';


class App extends Component {

  // Main Section Values assigned to state  
  state = {

  }

  componentDidMount = () =>
  {
    // API.getRoutes()
    fetch('/Routes',
    {
      headers : new Headers ({
      // 'Accept':'application/xml', 
      // 'content-type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
    .then(res => res.text())          // convert to plain text
    .then(text => console.log(JSON.parse(text)))
    .catch(err => {
        API.APIErrorResponse(err, 'User Signin');
    });

  }


  render() {

    // const { } = this.state;

    return (

      <Router>
        <NavBar />
      </Router>
    );
  }
}

export default App;