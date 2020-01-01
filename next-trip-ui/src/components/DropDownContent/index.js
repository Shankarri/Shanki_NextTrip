
import React, { Component } from 'react';

// Importing HTML Elements from Material UI
import { Select } from '@material-ui/core';

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
            <>
                <h5> {header} </h5>
                <Select
                    value={selectedValue}
                    variant="outlined"
                    autoWidth={false}
                    name={header}
                    onChange={handleDropDownChange}
                >
                    <option value='0' disabled>Select {header}</option>
                    {selectedDetails && selectedDetails.map((selectedDetail, index) =>
                        header === 'Routes' ?
                            <option key={index} value={selectedDetail.Route}>
                                {selectedDetail.Description}
                            </option>
                            :
                            <option key={index} value={selectedDetail.Value}>
                                {selectedDetail.Text}
                            </option>
                    )}
                </Select>
            </>
        );
    }
}

export default DropDownContent;