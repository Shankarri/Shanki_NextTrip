import React, { Component } from 'react';

// Router Variables for linking to different Pages
import { BrowserRouter as Router } from 'react-router-dom';

// Importing HTML Elements from Material UI
import { Container } from '@material-ui/core';

import NavBar           from './components/AppBar';
import DepartureDetails from './components/DepatureDetails';
import DropDownContent  from './components/DropDownContent';

import * as c       from './utils/constants';
import * as sample  from './utils/sampleJson';

import './App.css';

class App extends Component {

  // Main Section Values assigned to state  
  state = {
    routesDetails: [],
    directionDetails: [],
    stopDetails: [],
    departuresDetails:{},
    selectedRoute: '0',
    selectedDirection: '0',
    selectedStop: '0',
    departureRefreshIntervalId : 0
  }

  componentDidMount = () => {
    this.getDropdownData('/'+c.DROP_DOWN_HEADER_ROUTES.toLowerCase(),'');
  }

  handleDropDownChange = (event) => {

    console.log('name', event.target.name);
    let dropdownName = event.target.name;
    let dropdownValue = event.target.value;
    let requestUrl = '';

    if (dropdownName === c.DROP_DOWN_HEADER_ROUTES) {

      this.setState({ selectedRoute: dropdownValue });
      
      requestUrl = '/'+ c.DROP_DOWN_HEADER_DIRECTIONS.toLowerCase()+ '/' + dropdownValue;

      this.getDropdownData(requestUrl,dropdownName);
    }
    else if (dropdownName === c.DROP_DOWN_HEADER_DIRECTIONS) {

      this.setState({ selectedDirection: dropdownValue });
      
      requestUrl = '/'+ c.DROP_DOWN_HEADER_STOPS.toLowerCase() + '/'  + this.state.selectedRoute + '/' + dropdownValue;
      
      this.getDropdownData(requestUrl,dropdownName);
    }

    else if (dropdownName === c.DROP_DOWN_HEADER_STOPS) {

      this.setState({ selectedStop: dropdownValue });
      
      requestUrl = '/'+this.state.selectedRoute+ '/'  + this.state.selectedDirection + '/' + dropdownValue;
      
      var _this =this;
      this.getDropdownData(requestUrl,dropdownName);
      
      clearInterval(_this.state.departureRefreshIntervalId);

      var interval =  setInterval(function(){ 

      // let requestUrl = '/'+ _this.state.selectedRoute+ '/'  + _this.state.selectedDirection + '/' + _this.state.selectedStop;    
      
      _this.getDropdownData(requestUrl,c.DROP_DOWN_HEADER_STOPS); }, 30000);
      
      this.setState({departureRefreshIntervalId : interval});
    }
    
    
  }

  getDropdownData = (requestUrl,dropdownName) =>
  {
    fetch(requestUrl,
      {
        headers: new Headers({ 'Accept': 'application/json' })
      })
      .then(res => res.text())          // convert to plain text
      .then(text => {
        let responseJson = JSON.parse(text);
          
        if (dropdownName === '')
          this.setState({ routesDetails: responseJson });
        
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
            departuresDetails,
            selectedRoute,
            selectedDirection,
            selectedStop,
          } = this.state;

    return (
      <Router>
        <NavBar />

        <div className='imageSection'></div>

        <Container maxWidth='sm' className='mainContent'>

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

          </Container>
            
          <Container maxWidth='md' className='mainContent'>
          { Object.keys(departuresDetails).length >0 &&
            // <DepartureDetails departuresDetails={sample.sampleDepartureDetails}/>
            <DepartureDetails departuresDetails={departuresDetails}/>
          }
          </Container>
        

      </Router>
    );
  }
}

export default App;