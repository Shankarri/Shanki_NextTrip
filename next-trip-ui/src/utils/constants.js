
export const DROP_DOWN_HEADER_ROUTES = 'Routes';
export const DROP_DOWN_HEADER_DIRECTIONS = 'Directions';
export const DROP_DOWN_HEADER_STOPS = 'Stops';



export const getCurrentTime = () =>
{
    let currentHour = (new Date().getHours() >12 ? new Date().getHours()-12 : new Date().getHours());
    let currentMin  = new Date().getMinutes();
    let currentAMorPM = (new Date().getHours() >12 ? 'pm' : 'am');
    let currentTime = ' ' + currentHour + ' : '+ currentMin +' '+ currentAMorPM ;
    return currentTime;
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