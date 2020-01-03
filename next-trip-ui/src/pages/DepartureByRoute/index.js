import React, { Component } from 'react';

// Importing HTML Elements from Material UI
import { Container,
        Card, CardHeader, CardContent,
        CircularProgress
 } from '@material-ui/core';

import DepartureDetails from '../../components/DepatureDetails';
import DropDownContent  from '../../components/DropDownContent';

import * as c       from '../../utils/constants';
import * as sample  from '../../utils/sampleJson';

import './style.css';

class DepartureByRoute extends Component {

  // Main Section Values assigned to state  
  state = {
    routesDetails: [],
    directionDetails: [],
    stopDetails: [],
    routeDeparturesDetails:{},
    selectedRoute: '0',
    selectedDirection: '0',
    selectedStop: '0',
    routeRefreshIntervalId : 0,
    routeDepartureReqStatus : c.REQUEST_STATUS_INITIAL,
  }

  componentDidMount = () => {
    
    let requestURL =  c.getAPIRequestURL('','',this.state);

    this.getDropdownData( requestURL ,'');
  }

  handleDropDownChange = (event) => {
    
    let dropdownName = event.target.name;
    let dropdownValue = event.target.value;

    this.setState({  routeDepartureReqStatus :c.REQUEST_STATUS_INITIAL });
    this.setState({ departuresDetails: {} });

    let requestURL = c.getAPIRequestURL(dropdownName,dropdownValue,this.state);

    if(requestURL !== '')
      this.getDropdownData(requestURL,dropdownName);  

    if (dropdownName === c.HEADER_DIRECTIONS || dropdownName === c.HEADER_ROUTES) 
      {
        this.setState({ stopDetails: [] });
        this.setState({ selectedStop: '0' });

        if(dropdownName == c.HEADER_ROUTES)
        {
          this.setState({ selectedRoute: dropdownValue }); 
          this.setState({ directionDetails: [] });
          this.setState({ selectedDirection: '0' });
        }
        else this.setState({ selectedDirection: dropdownValue });
    }

    else if (dropdownName === c.HEADER_STOPS) {
      this.setState({ selectedStop: dropdownValue });

      var _this =this;      

      clearInterval(_this.state.routeRefreshIntervalId);
      var interval =  setInterval(function(){ 
      _this.getDropdownData(requestURL,c.HEADER_STOPS); }, 30000);
      
      this.setState({routeRefreshIntervalId : interval});
      this.setState({  routeDepartureReqStatus :c.REQUEST_STATUS_LOADING });
    }
    
    
  }

  getDropdownData = (requestUrl,dropdownName) =>
  {
    

    fetch(requestUrl,
      {
        headers: new Headers({ 'Accept': 'application/json' })
      })
      .then(res => 
        (res.status === 200) ? 
          res.text() : 
          this.setState({  routeDepartureReqStatus :c.REQUEST_STATUS_FAILED })
      ) 
      .then(text => {
        let responseJson = JSON.parse(text);
          
        if (dropdownName === '')
          this.setState({ routesDetails: responseJson });
        
        if (dropdownName === c.HEADER_ROUTES)
          this.setState({ directionDetails: responseJson });

        else if (dropdownName === c.HEADER_DIRECTIONS) 
          this.setState({ stopDetails: responseJson });

        else if (dropdownName === c.HEADER_STOPS)
         { 
           this.setState({ routeDeparturesDetails: responseJson });
            this.setState({  routeDepartureReqStatus :c.REQUEST_STATUS_SUCCESS });
        }  
      })
      .catch(err => {
        this.setState({  routeDepartureReqStatus :c.REQUEST_STATUS_FAILED });
        c.APIErrorResponse(err, 'Get DropDown List for ', dropdownName);
      });
  }


  render() {

    const {
            routesDetails,
            directionDetails,
            stopDetails,
            routeDeparturesDetails,
            selectedRoute,
            selectedDirection,
            selectedStop,
            routeDepartureReqStatus
          } = this.state;

    return (

<>
        <Container maxWidth='sm' className='mainContent'>

          <DropDownContent header={c.HEADER_ROUTES}
                            selectedValue={selectedRoute} 
                            selectedDetails={routesDetails}
                            handleDropDownChange={this.handleDropDownChange}
          />

          {selectedRoute !== '0' && 
            directionDetails.length >0 &&
            <DropDownContent header={c.HEADER_DIRECTIONS}
                            selectedValue={selectedDirection} 
                            selectedDetails={directionDetails}
                            handleDropDownChange={this.handleDropDownChange}
          />
          }

          {selectedDirection !== '0' && 
            stopDetails.length >0 &&
              <DropDownContent header={c.HEADER_STOPS}
                              selectedValue={selectedStop} 
                              selectedDetails={stopDetails}
                              handleDropDownChange={this.handleDropDownChange}
            />
          }

          </Container>
            
        <Container maxWidth='md' className='mainContent'>

          {routeDepartureReqStatus !== c.REQUEST_STATUS_INITIAL &&

            <Card raised={true} className='departureCard'>
              <CardHeader title='Departures' align='center' />

              {routeDepartureReqStatus === c.REQUEST_STATUS_SUCCESS ?

                Object.keys(routeDeparturesDetails).length > 0 &&
                <DepartureDetails departuresDetails={routeDeparturesDetails} />

                : routeDepartureReqStatus === c.REQUEST_STATUS_FAILED ?
                  <Card className='departureDetailsCard'>
                    <CardContent align='center'>
                      <h3> Something went wrong. Please refresh the page</h3>
                    </CardContent>
                  </Card>

                  : routeDepartureReqStatus === c.REQUEST_STATUS_LOADING &&
                  <CircularProgress />
              }
            </Card>
          }
          </Container>
    </>
    );
  }
}

export default DepartureByRoute;