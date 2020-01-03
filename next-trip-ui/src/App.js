import React, { Component } from 'react';

// Router Variables for linking to different Pages
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from 'react-router-dom';

// Importing HTML Elements from Material UI
import { Grid } from '@material-ui/core';

// Different Pages and common Components
import NavBar           from './components/AppBar';
import DepartureByRoute from './pages/DepartureByRoute';
import DepartureByStop  from './pages/DepartureByStop';

// Different Utils that is used by the home page
import * as c       from './utils/constants';
// import * as sample  from './utils/sampleJson';

// Set of Styles specific to Home Page

import './App.css';

class App extends Component {

  state = {
    // By default the tab is selected as per the  page url
    selectedTab : (window.location.href.indexOf(c.ROUTE_PAGE_URL) >0 ? c.ROUTE_PAGE_URL : c.STOP_PAGE_URL),
  }

  render() {
    return (
      <Router>

        {/* Navigation Bar at the top of the Page  */}
        <NavBar />

        {/* Home Screen Image */}
        <div className='imageSection'></div>

        {/* Navigation to different Pages of the Application */}
        <Grid
          className='pageTabs'
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {/* Link for Navigating to Search by Route Page */}
          <Link to={c.ROUTE_PAGE_URL}
                className={this.state.selectedTab === c.ROUTE_PAGE_URL ? 'active' : 'inactive'}
                onClick={() => this.state.selectedTab !== c.ROUTE_PAGE_URL &&  this.setState({ selectedTab: c.ROUTE_PAGE_URL })}
          >
            Search By Route 
          </Link>

          {/* Link for Navigating to Search by Stop Id Page */}
          <Link to={c.STOP_PAGE_URL}
                className={this.state.selectedTab === c.STOP_PAGE_URL ? 'active' : 'inactive'} 
                onClick={() => this.state.selectedTab !== c.STOP_PAGE_URL && this.setState({ selectedTab: c.STOP_PAGE_URL }) }
                >
            Search By Stop Id 
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

          {/*  Redirecting the home page router to Search By Route Page */}
          <Route render={() => <> <Redirect exact to={c.ROUTE_PAGE_URL} /> </>} />
        </Switch>

      </Router>
    );
  }
}

export default App;