
import React, { Component } from 'react';

// Importing HTML Elements from Material UI
import { Grid,Select, InputLabel } from '@material-ui/core';

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
                    <option value='0' disabled>Select {header}</option>
                    {selectedDetails && selectedDetails.map((selectedDetail, index) =>
                        header === c.DROP_DOWN_HEADER_ROUTES ?
                            <option key={index} value={selectedDetail.RouteId}>
                                {selectedDetail.Description}
                            </option>
                            :header === c.DROP_DOWN_HEADER_DIRECTIONS ?
                            <option key={index} value={selectedDetail.DirectionId}>
                                {selectedDetail.DirectionName}
                            </option>
                            :
                            <option key={index} value={selectedDetail.PlaceCode}>
                                {selectedDetail.Description}
                            </option>
                            
                    )}
                </Select>
            </Grid>
        );
    }
}

export default DropDownContent;