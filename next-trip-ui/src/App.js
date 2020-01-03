import React, { Component } from 'react';

// Router Variables for linking to different Pages
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from 'react-router-dom';

// Importing HTML Elements from Material UI
import {
        Grid, 
        Card, CardContent,
        Button

  } from '@material-ui/core';

import NavBar           from './components/AppBar';
import DepartureByRoute from './pages/DepartureByRoute';
import DepartureByStop  from './pages/DepartureByStop';

import * as c       from './utils/constants';
import * as sample  from './utils/sampleJson';

import './App.css';

class App extends Component {

  state = {
    selectedTab : (window.location.href.indexOf(c.ROUTE_PAGE_URL) >0 ? c.ROUTE_PAGE_URL : c.STOP_PAGE_URL),
  }

  render() {
    return (
      <Router>

        <NavBar />

        <div className='imageSection'></div>

            <Grid
              className='pageTabs'
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Link to={c.ROUTE_PAGE_URL}
                    className={this.state.selectedTab === c.ROUTE_PAGE_URL ? 'active' : 'inactive'}
                    onClick={() => this.state.selectedTab !== c.ROUTE_PAGE_URL &&  this.setState({ selectedTab: c.ROUTE_PAGE_URL })}
              >
                By Route 

              </Link>

              <Link to={c.STOP_PAGE_URL}
                    className={this.state.selectedTab === c.STOP_PAGE_URL ? 'active' : 'inactive'} 
                    onClick={() => this.state.selectedTab !== c.STOP_PAGE_URL && this.setState({ selectedTab: c.STOP_PAGE_URL }) }
                    >
              By Stop Id 
              
              </Link>
              </Grid>

        {/*---- Routing the Navigation Links to different Pages according to the Path -----*/}
        <Switch>

          {/*  Router for Search By Route Page */}
          <Route path={c.ROUTE_PAGE_URL}
                component={DepartureByRoute} />

          {/*  Router for Search By Stop Page */}
          <Route path={c.STOP_PAGE_URL}
              component={DepartureByStop}
          />
          {/*  Router for Home Page */}
          <Route render={() => <> <Redirect exact to={c.ROUTE_PAGE_URL} /> </>} />
        </Switch>

      </Router>
    );
  }
}

export default App;