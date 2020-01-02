
import React, { Component } from 'react';

// Importing HTML Elements from Material UI
import { 
        Grid, Button,
        Card, CardHeader, CardContent,
        Icon, Chip, Avatar,
        Typography
} from '@material-ui/core';

import * as c from '../../utils/constants';
import './style.css';

class DepartureDetails extends Component {

    state={
        showMore : false,
    }
    render() {

        let { Stop,Departures } = this.props.departuresDetails;

        let { showMore } = this.state;

        return (
            <Card raised={true} className='departureCard'>
                <CardHeader title='Departures' align='center'/>

                <CardContent>
                    <Grid container
                        direction="row"
                        justify="space-around"
                        alignItems="stretch">

                        <span>Stop {Stop.StopId} : {Stop.Description} </span>
                        
                        <Chip variant="outlined"
                                color="primary" 
                                avatar={<Avatar> <Icon >watch_later</Icon> </Avatar>}
                                label={<h3>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).split(':').join(' : ')}</h3>} 
                        />
                    
                    </Grid>
                    {Departures && Departures.length > 0 ?
                        (Departures.map((departure,index) =>
                        ((!showMore && index <3) || showMore) &&
                        <Card className='departureDetailsCard'>
                                <CardContent>
                                    <Grid container
                                        direction="row"
                                        justify="space-around"
                                        alignItems="stretch">
                                        <Grid item xs={9}>
                                            <b>{departure.RouteId}{departure.Terminal}</b> {departure.Description}
                                        </Grid>
                                        <Grid item xs={2} align='right'>
                                            <b>{departure.DepartureText}</b>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))
                        :
                        <Card className='departureDetailsCard'>
                            <CardContent align='center'>
                                <h3> No Departures at this time</h3>
                            </CardContent>
                        </Card>
                    }
                    <Grid container
                        direction="row"
                        justify="flex-start"
                        alignItems="stretch">
                        <Grid item>
                            {Departures.length >3 && 
                                (showMore ?
                                <Button variant="outlined" onClick={() => this.setState({ showMore: !showMore })}>
                                    <Icon>remove_circle_outline</Icon>
                                    <span> &nbsp; &nbsp;Show less departure times </span>
                                </Button>
                                :
                                <Button variant="outlined" onClick={() => this.setState({ showMore: !showMore })}>
                                    <Icon>add_circle_outline</Icon>
                                    <span> &nbsp; &nbsp;Show more departure times </span>
                                </Button>
                                )
                            }
                        </Grid>
                    </Grid>
                </CardContent>
               
            </Card>
        );
    }
}

export default DepartureDetails;