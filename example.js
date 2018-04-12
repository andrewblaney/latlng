const LatLng = require("latlng")('sqlite');

async function doLookup() {
    let N8 =  await LatLng.lookup('N8');
    let NG19 =  await LatLng.lookup('NG19');
    console.log(N8, NG19.lat);
}

doLookup();