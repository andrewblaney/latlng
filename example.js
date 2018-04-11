import latlng from 'latlng';

const latlng = latlng('http://mydatasrc.com/api/stuff', '.geometry.location.lng');

let address = "73 Arun Dale, Mansfield Woodhouse, NG199RE";

let [lat, lng] = latlng.lookup(`${myAddress}`);

if (address) {
    console.log(`${address} is at lat:${lat}, lng:${lng}`);
} else {
    console.error(`Latitude and Longitude not found for ${address}`);
}