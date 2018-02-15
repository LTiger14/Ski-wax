# Ski-wax
Repository for the Ski wax app  ❄️ :rocket: - This is still a work in progress

## Prerequisite
1. It is required to have NodeJs with version 8.5 or higher
2. If you do not have installed node.js in your machine then go to [this link](https://nodejs.org/en/download/) in order to install node.

## How to use
1. Clone repository
2. Run `npm install`
3. Generate an api key for [darksky API](https://darksky.net/dev) and one for [Goodgle map](https://developers.google.com/maps/documentation/javascript/get-api-key)
4. In the project root create a file named `.env`
5. In this file add the two following lines : 
  - `WEATHER_API_KEY=(your Darksky API key)`
  - `LOCATION_API_KEY=(your Google maps API key)`
6. To test in your browser just run `ionic serve`
