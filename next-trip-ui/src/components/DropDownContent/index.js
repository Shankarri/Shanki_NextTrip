
import React, { Component } from 'react';

// Importing HTML Elements from Material UI
import { Grid,Select, InputLabel, MenuItem } from '@material-ui/core';

// Importing constants file
import * as c from '../../utils/constants';

import './style.css';

class DropDownContent extends Component {

    render() {

        let {
            header,
            selectedValue,
            selectedDetails,
            handleDropDownChange
        } = this.props;

        return (

            <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="stretch"
            className='dropdownSection'
            >
                {/* Label for the DropDown */}
                <InputLabel id={"dropdown-header-"+ header}>{header}</InputLabel>

                {/* DropDown Field  */}
                <Select
                    value={selectedValue ? selectedValue : '0'}
                    variant="outlined"
                    autoWidth={false}
                    labelId={"dropdown-header-"+ header}
                    name={header}
                    onChange={handleDropDownChange}
                >
                    {/* Default Dropdown field */}
                    <MenuItem value='0' disabled>Select {header}</MenuItem>

                    {selectedDetails && selectedDetails.map((selectedDetail, index) =>

                        // If the dropdown is for Routes 
                        header === c.HEADER_ROUTES ?

                            <MenuItem key={index} value={selectedDetail.RouteId}>
                            
                                {selectedDetail.Description}
                            
                            </MenuItem>

                            // If the dropdown is for Directions
                            :header === c.HEADER_DIRECTIONS ?
                            
                            <MenuItem key={index} value={selectedDetail.DirectionId}>
                            
                                {selectedDetail.DirectionName}
                            
                            </MenuItem>
                            
                            // If the dropdown is for Stops
                            :
                            <MenuItem key={index} value={selectedDetail.PlaceCode}>

                                {selectedDetail.Description}
                                
                            </MenuItem>
                            
                    )}
                </Select>
            </Grid>
        );
    }
}

export default DropDownContent;