import React, { Component } from 'react';

// Importing HTML Elements from Material UI
import {  
          Grid, Container, 
          TextField,
          Icon, Button, CircularProgress,
          Card, CardHeader, CardContent
  } from '@material-ui/core';

// Importing Common Components
import DepartureDetails from '../../components/DepatureDetails';

// Importing constants file
import * as c       from '../../utils/constants';

class DepartureByStop extends Component {

  // Main Section Values assigned to state  
  state = {
    stopId : '',
    resultStopId : '',
    stopDeparturesDetails:{},
    stopRefreshIntervalId : 0,
    stopDepartureReqStatus : c.REQUEST_STATUS_INITIAL,
  }

  /* -------  If the user changes the stop Id, validate to allow only the numbers  ------------*/
  handleStopIdChange = (event) => {
      
      event.preventDefault(); 

      let finalValue =  event.target.value.match(/\d+/g);

      this.setState({ stopId: (finalValue !== null ? finalValue : '')});   
  }
  /*----------------------------------------------------------*/

  /* Once the Search Button is clicked, get the current Stop id in the search text
   Then call the API once, then set a timeout functionality to call the API every 30 seconds. 
  */
  handleStopIdSubmit = (stopId) =>
  {
    let resultStopId = stopId;
    this.setState({resultStopId : stopId});
    this.getStopDetails('/'+resultStopId);

    var _this =this;
      
    clearInterval(_this.state.stopRefreshIntervalId);

    var interval =  setInterval(function(){ 
    
    _this.getStopDetails('/'+_this.state.resultStopId) }, 30000);
    
    this.setState({stopRefreshIntervalId : interval});
  }
  /*----------------------------------------------------------*/

  /*-------- API for getting the Departure Details based on the Stop id -------------*/
  getStopDetails = (requestUrl) =>
  {
    this.setState({  stopDepartureReqStatus :c.REQUEST_STATUS_LOADING });
    fetch(requestUrl,
      {
        headers: new Headers({ 'Accept': 'application/json' })
      })
      .then(res => 
        (res.status === 200) ? 
          res.text() : 
          this.setState({  stopDepartureReqStatus :c.REQUEST_STATUS_FAILED })
      ) 
      .then(text => {
        this.setState({ stopDeparturesDetails: JSON.parse(text) });
        this.setState({  stopDepartureReqStatus :c.REQUEST_STATUS_SUCCESS });
      })
      .catch(err => {
        this.setState({  stopDepartureReqStatus :c.REQUEST_STATUS_FAILED });
        c.APIErrorResponse(err, 'Get Departure List for Stops');
      });
  }
  /*----------------------------------------------------------*/

  render() {

    const {
            stopId,
            stopDeparturesDetails,
            stopDepartureReqStatus
          } = this.state;

    return (
      <>
      {/*--------------- Main Content section for Search by Stop Page -----------------*/}
        <Container maxWidth='sm' className='mainContent'>

          <CardContent>

            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
            >
              {/* Text Field for getting the Stop id from user */}
              <Grid item xs={10}>
                
                <TextField variant="outlined"
                  label="Stop #"
                  fullWidth={true}
                  margin='dense'
                  value={stopId}
                  placeholder='Please enter Stop number'
                  onChange={this.handleStopIdChange}
                />

              </Grid>

              {/*Search Button for submission of the Stop id */}
              <Grid item xs={2}>
                
                <Button onClick={() => stopId !== '' && this.handleStopIdSubmit(stopId)}
                        startIcon={<Icon>search</Icon>} />

              </Grid>

            </Grid>

          </CardContent>

        </Container>
        {/* ----------------------------------------------------------------------------- */}

      {/*--------------- Departure Details section for Search by Stop Page -----------------*/}
        <Container maxWidth='md' className='mainContent'>

          {/* If the page is just loaded without any stop ids then departure section should not be loaded  */}
          {stopDepartureReqStatus !== c.REQUEST_STATUS_INITIAL &&

            <Card raised={true} className='departureCard'>

              <CardHeader title='Departures' align='center' />

              
              {stopDepartureReqStatus === c.REQUEST_STATUS_SUCCESS ?
                
                /* If API for Searching by stop id is success, then display the respective details in the page  */
                Object.keys(stopDeparturesDetails).length > 0 &&
                  <DepartureDetails departuresDetails={stopDeparturesDetails} />

                /* If API for Searching by stop id is failure, then display error message in the  page  */
                : stopDepartureReqStatus === c.REQUEST_STATUS_FAILED ?

                  <Card className='departureDetailsCard'>
                    <CardContent align='center'>
                      <h3> Stop Number is not a valid.</h3>
                    </CardContent>
                  </Card>

                /* If API for Searching by stop id is loading, then display loading image  */
                : stopDepartureReqStatus === c.REQUEST_STATUS_LOADING &&
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

export default DepartureByStop;