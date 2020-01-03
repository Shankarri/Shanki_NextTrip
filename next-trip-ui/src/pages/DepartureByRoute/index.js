import React, { Component } from 'react';

// Importing HTML Elements from Material UI
import { Container,
        Card, CardHeader, CardContent,
        CircularProgress
 } from '@material-ui/core';

// Importing Common Components
import DepartureDetails from '../../components/DepatureDetails';
import DropDownContent  from '../../components/DropDownContent';

// Importing constants file
import * as c       from '../../utils/constants';

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

  /* Once the page is loaded and the component is mounted, 
     get route details from API and load the dropdown 
  */
  componentDidMount = () => {
    
    let requestURL =  c.getAPIRequestURL('','',this.state);

    this.getDropdownData( requestURL ,'');
  }
  /*----------------------------------------------------------*/

  /*---------- handle the dropdown changes in the route page  -----------*/
  handleDropDownChange = (event) => {
    
    let dropdownName = event.target.name;
    let dropdownValue = event.target.value;

    // Clear the existing values and set default before accessing the API
    this.setState({  routeDepartureReqStatus :c.REQUEST_STATUS_INITIAL });
    this.setState({ departuresDetails: {} });

    // Get the API url according to the dropdown selected
    let requestURL = c.getAPIRequestURL(dropdownName,dropdownValue,this.state);

    // If we get a non empty url, then hit the API function
    if(requestURL !== '')
      this.getDropdownData(requestURL,dropdownName);  

    // Now reset the Dropdowns accroding to the user Selected values  
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

      //If we receive departure details, then we have set a interval function to fetch real time updates every 30 seconds for the selected criteria
      var _this =this;      

      clearInterval(_this.state.routeRefreshIntervalId);

      var interval =  setInterval(function(){ _this.getDropdownData(requestURL,c.HEADER_STOPS); }, 30000);
      
      this.setState({ routeRefreshIntervalId : interval});
      this.setState({ routeDepartureReqStatus :c.REQUEST_STATUS_LOADING });
    }

  }
  /*----------------------------------------------------------*/

  /*-------- API for getting the Reponse based on the Request -------------*/

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
        
        // Depending upon the Dropdown selected, asssign the values to repective states
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

  /*----------------------------------------------------------*/


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
      {/*--------------- Main Content section for Search by Stop Page -----------------*/}
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
            
          {/* ----------------------------------------------------------------------------- */}

      {/*--------------- Departure Details section for Search by Route Page -----------------*/}

        <Container maxWidth='md' className='mainContent'>

        {/* If the page is just loaded without any stop ids then departure section should not be loaded  */}
          {routeDepartureReqStatus !== c.REQUEST_STATUS_INITIAL &&

            <Card raised={true} className='departureCard'>

              <CardHeader title='Departures' align='center' />


              {routeDepartureReqStatus === c.REQUEST_STATUS_SUCCESS ?

              /* If API for Searching by stop id is success, then display the respective details in the page  */
                Object.keys(routeDeparturesDetails).length > 0 &&
                <DepartureDetails departuresDetails={routeDeparturesDetails} />

              /* If API for Searching by stop id is failure, then display error message in the  page  */
              : routeDepartureReqStatus === c.REQUEST_STATUS_FAILED ?
              
                  <Card className='departureDetailsCard'>
                    <CardContent align='center'>
                      <h3> Something went wrong. Please refresh the page</h3>
                    </CardContent>
                  </Card>

                  /* If API for Searching by stop id is loading, then display loading image  */
                  : routeDepartureReqStatus === c.REQUEST_STATUS_LOADING &&
                  <CardContent align='center'> <CircularProgress /> </CardContent>
              }
              
            </Card>
          }
          </Container>
          {/* ----------------------------------------------------------------------------- */}
    </>
    );
  }
}

export default DepartureByRoute;