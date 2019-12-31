import axios from "axios";

const API_URL = 'http://svc.metrotransit.org/NexTrip';

export default {
  
    /*----  Sign in Authentication for the user -----*/
    getRoutes: function () {
        return axios.get(API_URL + '/providers/');
    },

    /*---- Error Response for all the HTTP Request --- */
    APIErrorResponse : function (error, ReqDetails) {
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
    },




}