
import React, { Component } from 'react';

// Importing HTML Elements from Material UI
import { Grid,Select, InputLabel, MenuItem } from '@material-ui/core';

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
                <InputLabel id={"dropdown-header-"+ header}>{header}</InputLabel>

                <Select
                    value={selectedValue}
                    variant="outlined"
                    autoWidth={false}
                    labelId={"dropdown-header-"+ header}
                    name={header}
                    onChange={handleDropDownChange}
                >
                    <MenuItem value='0' disabled>Select {header}</MenuItem>

                    {selectedDetails && selectedDetails.map((selectedDetail, index) =>

                        header === c.HEADER_ROUTES ?

                            <MenuItem key={index} value={selectedDetail.RouteId}>
                            
                                {selectedDetail.Description}
                            
                            </MenuItem>

                            :header === c.HEADER_DIRECTIONS ?
                            
                            <MenuItem key={index} value={selectedDetail.DirectionId}>
                            
                                {selectedDetail.DirectionName}
                            
                            </MenuItem>
                            
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