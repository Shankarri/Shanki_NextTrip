import React, { Component } from 'react';

// Router Variables for linking to different Pages
import { BrowserRouter as Router } from 'react-router-dom';

// Importing HTML Elements from Material UI
import { Grid, Container } from '@material-ui/core';

import NavBar from './components/AppBar';
import DropDownContent from './components/DropDownContent';

import * as c from './utils/api/constants';
import './App.css';


class App extends Component {

  // Main Section Values assigned to state  
  state = {
    routesDetails: [],
    directionDetails: [],
    stopDetails: [],
    departuresDetails:[],
    selectedRoute: '0',
    selectedDirection: '0',
    selectedStop: '0',
  }

  componentDidMount = () => {
    fetch('/Routes',
      {
        headers: new Headers({ 'Accept': 'application/json' })
      })
      .then(res => res.text())          // convert to plain text
      .then(text => {
        this.setState({ routesDetails: JSON.parse(text) });
      })
      .catch(err => {
        c.APIErrorResponse(err, 'Get Routes');
      });

  }

  handleDropDownChange = (event) => {
    
    console.log('name', event.target.name);
    let dropdownName = event.target.name;
    let dropdownValue = event.target.value;
    let requestUrl = '';

    if (dropdownName === c.DROP_DOWN_HEADER_ROUTES) {
      this.setState({ selectedRoute: dropdownValue });
      requestUrl = '/'+ c.DROP_DOWN_HEADER_DIRECTIONS+ '/' + dropdownValue;
    }
    else if (dropdownName === c.DROP_DOWN_HEADER_DIRECTIONS) {
      this.setState({ selectedDirection: dropdownValue });
      requestUrl = '/'+ c.DROP_DOWN_HEADER_STOPS + '/'  + this.state.selectedRoute + '/' + dropdownValue;
    }

    else if (dropdownName === c.DROP_DOWN_HEADER_STOPS) {
      this.setState({ selectedStop: dropdownValue });
      requestUrl = '/'+this.state.selectedRoute+ '/'  + this.state.selectedDirection + '/' + dropdownValue;
    }

    fetch(requestUrl,
      {
        headers: new Headers({ 'Accept': 'application/json' })
      })
      .then(res => res.text())          // convert to plain text
      .then(text => {
        let responseJson = JSON.parse(text);
        

        if (dropdownName === c.DROP_DOWN_HEADER_ROUTES)
          this.setState({ directionDetails: responseJson });
        else if (dropdownName === c.DROP_DOWN_HEADER_DIRECTIONS) 
          this.setState({ stopDetails: responseJson });
        else if (dropdownName === c.DROP_DOWN_HEADER_STOPS)
        this.setState({ departuresDetails: responseJson });
      })
      .catch(err => {
        c.APIErrorResponse(err, 'Get DropDown List for ', dropdownName);
      });
  }


  render() {

    const {
            routesDetails,
            directionDetails,
            stopDetails,
            selectedRoute,
            selectedDirection,
            selectedStop,
          } = this.state;

    return (
      <Router>
        <NavBar />

        <div className='imageSection'></div>

        <Container maxWidth='sm'>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
          >
            <DropDownContent header={c.DROP_DOWN_HEADER_ROUTES}
                              selectedValue={selectedRoute} 
                              selectedDetails={routesDetails}
                              handleDropDownChange={this.handleDropDownChange}
            />
            {selectedRoute !== '0' && 
              directionDetails.length >0 &&
              <DropDownContent header={c.DROP_DOWN_HEADER_DIRECTIONS}
                              selectedValue={selectedDirection} 
                              selectedDetails={directionDetails}
                              handleDropDownChange={this.handleDropDownChange}
            />
            }
            {selectedDirection !== '0' && 
              stopDetails.length >0 &&
              <DropDownContent header={c.DROP_DOWN_HEADER_STOPS}
                              selectedValue={selectedStop} 
                              selectedDetails={stopDetails}
                              handleDropDownChange={this.handleDropDownChange}
            />
             }
          </Grid>
        </Container>

      </Router>
    );
  }
}

export default App;