# latlng

🗺 Fetch and cache longitude and latitudes for addresses and place names.

A package that leverage [DSTK](http://www.datasciencetoolkit.org/)s Google-style Geocoder to find the latitude and 
longitude values for a given location/place. If a location already exists in the database the details are returned,
if not the external API is called, the data is returned to the user and stored in the database for quick return on 
next query.

### Requirements
- Node v8

### Installation
`yarn add https://github.com/andrewblaney/latlng`

## Usage

Currently supported drivers:
   - sqlite

### require('latlng')(driverName)
`const LatLng = require("latlng")('sqlite');`

### LatLng#lookup(location)
    
```javascript
// LatLng.lookup returns a promise
LatLng.lookup('Mansfield').then((result) => {
    console.log(result);
    // -> { name: 'Mansfield', lat: 53.13333, lng: -1.2 }
})

// e.g. add lng/lat from address when creating a user 
async function createUser(userData) {
    let location = await LatLng.lookup(userData.Address);
    userData.lat = location.lat;
    userData.lng = location.lng;
    User.save(userData);
}
```

### Todo
- Add postgres / mysql adapters
- Add option to point to own hosted DSTK
- Add minified build
- Tests
- Publish on NPM

### Credits
Uses [DSTK](http://www.datasciencetoolkit.org/) for lat/long lookup.

### Licence
MIT
