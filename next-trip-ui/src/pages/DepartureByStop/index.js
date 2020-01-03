import React, { Component } from 'react';

// Importing HTML Elements from Material UI
import { Grid, Container, 
           TextField,
          Icon, Button,
          Card, CardHeader, CardContent,
          CircularProgress
  } from '@material-ui/core';

import DepartureDetails from '../../components/DepatureDetails';

import * as c       from '../../utils/constants';
import * as sample  from '../../utils/sampleJson';

import './style.css';

class DepartureByStop extends Component {

  // Main Section Values assigned to state  
  state = {
    stopId : '',
    stopDeparturesDetails:{},
    stopRefreshIntervalId : 0,
    stopDepartureReqStatus : c.REQUEST_STATUS_INITIAL,
  }

  handleStopIdChange = (event) => {
      
      event.preventDefault(); 

      let finalValue =  event.target.value.match(/\d+/g);

      this.setState({ stopId: (finalValue !== null ? finalValue : '')});

      // var _this =this;
      
      // clearInterval(_this.state.departureRefreshIntervalId);

      // var interval =  setInterval(function(){ 
      
      // _this.getDropdownData(requestUrl,c.HEADER_STOPS); }, 30000);
      
      // this.setState({departureRefreshIntervalId : interval});
   
  }

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


  render() {

    const {
            stopId,
            stopDeparturesDetails,
            stopDepartureReqStatus
          } = this.state;

    return (

      <>
        <Container maxWidth='sm' className='mainContent'>
          <CardContent>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
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
            <Grid item xs={2}>
            <Button size='small' onClick={()=> this.getStopDetails('/'+stopId)}>
              <Icon onClick={()=> this.getStopDetails('/'+stopId)}>search</Icon>
            </Button>
            </Grid>

          </Grid>
          </CardContent>
        </Container>
        <Container maxWidth='md' className='mainContent'>

          {stopDepartureReqStatus !== c.REQUEST_STATUS_INITIAL &&

            <Card raised={true} className='departureCard'>
              <CardHeader title='Departures' align='center' />

              {stopDepartureReqStatus === c.REQUEST_STATUS_SUCCESS ?

                Object.keys(stopDeparturesDetails).length > 0 &&
                <DepartureDetails departuresDetails={stopDeparturesDetails} />

                : stopDepartureReqStatus === c.REQUEST_STATUS_FAILED ?
                  <Card className='departureDetailsCard'>
                    <CardContent align='center'>
                      <h3> Entered Stop Number is not a valid.</h3>
                    </CardContent>
                  </Card>

                  : stopDepartureReqStatus === c.REQUEST_STATUS_LOADING &&
                  <CircularProgress />
              }
            </Card>
          }
        </Container>

      </>
    );
  }
}

export default DepartureByStop;