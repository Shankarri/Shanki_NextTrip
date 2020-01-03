
import React, { Component } from 'react';

// Importing HTML Elements from Material UI
import {
	Grid,
	Card, CardHeader, CardContent,
	Icon, Chip, Avatar, Button,
} from '@material-ui/core';

// Import of the constants file
import * as c from '../../utils/constants';
import './style.css';

class DepartureDetails extends Component {

	state = {
		showMore: false,
	}

	render() {

		let { Stop, Departures } = this.props.departuresDetails;

		let { showMore } = this.state;

		return (

			<CardContent>

				{/*--------------- Displaying the Stop Id and Clock at the top of the Departures Section ------------*/}
				<Grid container
					direction="row"
					justify="space-around"
					alignItems="stretch">

					{/* Stop Id of the seleted route */}
					<span>Stop {Stop.StopId} : {Stop.Description} </span>

					{/* Digital Clock showing the current system time  */}
					<Chip variant="outlined"
								color="primary"
								avatar={<Avatar> <Icon >watch_later</Icon> </Avatar>}
								label={<h3>{c.convertTimeForDisplay(new Date())}</h3>}
					/>

				</Grid>
				{/* ----------------------------------------------------------------------------- */}

				{/*--------------- Displaying the Stop Id and Clock at the top of the Departures Section ------------*/}

				{Departures && Departures.length > 0 ?
					(Departures.map((departure, index) =>
						((!showMore && index < 3) || showMore) &&

						<Card className='departureDetailsCard' key={index}>

							<CardContent>

								<Grid container
									direction="row"
									justify="space-around"
									alignItems="stretch">
									
									{/* Showing the Bus Number along with the Route Details  */}
									<Grid item xs={9}>

										<b>{departure.RouteId}{departure.Terminal}</b> {departure.Description}

									</Grid>

									{/* Showing the time of the Bus arraival along  */}
									<Grid item xs={2} align='right'>
	
										{departure.Actual && departure.Actual === true ?
											
											//If it is a real time update, then show the Wifi Icon  
											<>
												<Icon className='wifiSignal' color='primary'>rss_feed</Icon>
												<b>{departure.DepartureText}</b>
											</>
											:
											// else show normally
											<b>{c.convertTimeForDisplay(new Date(departure.DepartureTime))}</b>
										}

									</Grid>

								</Grid>

							</CardContent>

						</Card>
					))
					:
					// If the bus does not have any departure timings available then show error message
					<Card className='departureDetailsCard'>
					
						<CardContent align='center'> <h3> No Departures at this time</h3> </CardContent>
					
					</Card>
				}

				{/* ----------------------------------------------------------------------------- */}

				{/*--------------- Displaying the show more Departure Timings button only if there are more than 3 departures ------------*/}
				<Grid container
					direction="row"
					justify="center"
					alignItems="center">

					<Grid item xs={8}>

						{Departures.length > 3 &&
							(showMore ?
								
								// Show more timings if it is clicked
								<Button variant="outlined" onClick={() => this.setState({ showMore: !showMore })}>
									<Icon>remove_circle_outline</Icon>
									<span> &nbsp; &nbsp;Show less departure times </span>
								</Button>

								:
								// Show less timings if it is clicked
								<Button variant="outlined" onClick={() => this.setState({ showMore: !showMore })}>
									<Icon>add_circle_outline</Icon>
									<span> &nbsp; &nbsp;Show more departure times </span>
								</Button>

							)
						}

					</Grid>

					{/* Displaying user message for Real time departures */}
					<Grid item xs={4}>

						<h5 align='right'>
							<Icon className='wifiSignal' color='primary'>rss_feed</Icon>
							Real-time departures
            </h5>
						
					</Grid>
				</Grid>

			</CardContent>
		);
	}
}

export default DepartureDetails;