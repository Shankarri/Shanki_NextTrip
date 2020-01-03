# NextTrip
 Web application that displays Minneapolis Metro Transit bus line information based on  APIs available via MetroTransit NextTrip API.


 ## 1. Steps to Build and Run Application

* In order to run the UI, please clone the Git repo in the local using the below command in your CLI

    ```
        $ git clone https://github.com/Shankarri/Shanki_NextTrip.git
    ```

* After cloning the folder, go inside the folder structure and install the neccessary packages

    ```
        $ cd Shanki_NextTrip/next-trip-ui/
        $ npm install
    ```
* Once all the packages are installed, enter the below command to start the react server in your local system

    ```
        $ npm start
    ```

* Your Default browser should open with the NexTrip UI Application.

## 2. Manual Test Cases

* Once the application is up and running, Check the browser to see if everything is loaded.

* By default 'Search By Route' is selected, Click on the 'Search By Stop Id' to see if the nvaigation is working.

* Go back and forth to see if the page is loading according to the Tab selected.

* On the 'Search By Route' page. Select the 'Routes' Dropdown to see the list of Routes displayed in the frontend.

* On Selection of a Route, 'Directions' Dropdown should appear with the list of directions available for the selected Route.

* On Selection of a Direction, 'Stops' Dropdown should appear with the list of stops available.

* On Selection of a Stop, 'Departure' Details section should appear with a set of bus timings for the particular stop.

* This 'Departure' details section should be updated every 30 seconds to provide real time update of the timings.

* Click on the 'Search by Stop' Tab and the app will take us to the respective page.

* In the displayed Text box, enter the stop id that needed to be searched and click the search Icon.

* If the entered stop id is wrong, then error Message should occur. Else the departure details of the particular stop will appear below.


## 3. List of assumptions made during development

* User will be able to build and run the application without any issues.

* On loading the screen, we will get the list of 'Routes' from the Metro Transit API call without any issues.

* Clicking on the By Stop Id button should redirect user to a search by stop page.

    ### Search by Routes Page:
    * Once the User selects the 'Routes' from the Dropdown List, we will get the list of 'Directions' from the Metro Transit API call without any issues.

    * Once the User selects the 'Directions' from the Dropdown List, we will get the list of 'Stops' from the Metro Transit API call without any issues.

    * Once the User selects the 'Stops' from the Dropdown List, we will get the 'Departure Details' from the Metro Transit API call without any issues.

    * If the 'Routes' dropdown value is changed at any point in time, then 'Departure Details' and 'Stops' Dropdown will be removed from the page and 'Directions' dropdown value will be reset.

    * If the 'Directions' dropdown value is changed at any point in time, then 'Departure Details' will be removed from the page and 'Stops' dropdown value will be reset.

    * If the 'Stops' dropdown value is changed at any point in time, then 'Departure Details' will get refreshed to show the new value.

    * Departure Details in the page will be refreshed every 30 seconds to get the Real time updates.


    ### Search by Stop Id Page:

    * User should be able to enter only numbers in the Search field. And do not let them enter anything else.

    * If the user clicks on the search icon without entering any values, then nothing should happen.

    * If the user enters any numbers and click on the search Icon. We will get the 'Departure Details' from the Metro Transit API call without any issues.

