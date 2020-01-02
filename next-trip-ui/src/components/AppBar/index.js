import React, { Component } from 'react';

// Importing HTML Elements from Material UI
import {
  Grid, Chip,Icon,
  AppBar, Toolbar,
  Typography, Avatar, Container,
} from '@material-ui/core';

// Importing Common utils file
import logo from '../../images/bus_2.jpeg'

class NavBar extends Component {

  // Main Section Values assigned to state  
  state = {

  }

  render() {

    // const { } = this.state;

    return (
        /*---- Top Nav Bar with the Logo, Title and Links -----*/
        <AppBar position="sticky" color='default'>
          <Toolbar>
            <Container maxWidth='xl'>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >

                {/*  Logo Icon for the Top Nav Bar */}
                <Grid item xs={2}>

                  <Avatar alt="NexTrip" variant="square" src={logo} className='logo' />

                </Grid>

                {/* App Title shown in the Middle of the Top Nav Bar */}

                <Grid item xs={6} align='center' >

                  <Typography variant="h4" noWrap className='pageTitle'> NextTrip </Typography>

                </Grid>

                {/* Navigation Links displayed in the  Top Nav Bar*/}
                <Grid item xs={4}>

                  <Typography noWrap align='right' variant='h6'> Welcome !
                    </Typography>
                </Grid>

              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
      );
  }
}

export default NavBar;