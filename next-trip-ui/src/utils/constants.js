
export const HEADER_ROUTES      = 'Routes';
export const HEADER_DIRECTIONS  = 'Directions';
export const HEADER_STOPS       = 'Stops';


export const ROUTE_PAGE_URL     = '/search-by-Route/';
export const STOP_PAGE_URL      = '/search-by-stop/';


export const API_URL_FOR_GET_ROUTES     = '/routes/';
export const API_URL_FOR_GET_DIRECTIONS = '/directions/';
export const API_URL_FOR_GET_STOPS      = '/stops/';

export const REQUEST_STATUS_INITIAL = 'intial';
export const REQUEST_STATUS_LOADING = 'loading';
export const REQUEST_STATUS_SUCCESS = 'success';
export const REQUEST_STATUS_FAILED  = 'failed';


export const getAPIRequestURL =  (headerName, dropdownValue, state) =>
{
    if (headerName === '') {
        // url = /routes/
        return API_URL_FOR_GET_ROUTES;
    }

    else if (headerName === HEADER_ROUTES)
    { 
        // url =  /directions/{ROUTE}
        return API_URL_FOR_GET_DIRECTIONS + dropdownValue;
    }

    else if (headerName === HEADER_DIRECTIONS)
    { 
        // url =  /directions/{ROUTE}/{DIRECTION}
        return API_URL_FOR_GET_STOPS  + state.selectedRoute + '/' + dropdownValue;
    }
    
    else if (headerName === HEADER_STOPS)
    {
        //url =  /{ROUTE}/{DIRECTION}/{STOP}
        return '/'+state.selectedRoute+ '/'  + state.selectedDirection + '/' + dropdownValue;
    }
    else return '';
}


export const convertTimeForDisplay = (dateUTC) =>
{
   return dateUTC.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).split(':').join(' : ').toLowerCase();
}

/*---- Error Response for all the HTTP Request --- */
export const APIErrorResponse = (error, ReqDetails) => {
    // Error
    if (error.response) {
        console.log('Failed for', ReqDetails);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        console.log('Error Status : ', error.response.status);
        // console.log(error.response.headers);
    }
    else if (error.request) {
        // The request was made but no response was received
        console.log('Error: The request was made but no response was received');
        // `error.request` is an instance of XMLHttpRequest in the
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
}