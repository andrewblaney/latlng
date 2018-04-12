const Adapters = require('./adapters/index.js');
const request = require("request");

module.exports = class LatLng {

    constructor(db){
        this.db = db;
        this.adapter = new Adapters[this.db];
    }

    async lookup(name) {
        let location = await this.adapter.getByName(name);
        if (location) return location;

        location = await this.lookupFromAPI(name);
        if (location) this.adapter.addToDatabase(location);

        return location;
    };

    async getAll() {
        let locations = await this.adapter.getAll();
        if (locations) return locations;
        return false;
    }

    async lookupFromAPI(name) {
        let encodedName = encodeURI(name);
        let url = `http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address=${encodedName}`;

        return new Promise((resolve, reject) => {
                request.get(url, (error, response, body) => {
                    try {
                        if (body) {
                            body = JSON.parse(body);
                            if (body.status === "OK") {
                                let result = body.results[0];
                                if (result) {
                                    resolve({
                                        name: name,
                                        lat: result.geometry.location.lat,
                                        lng: result.geometry.location.lng
                                    });
                                }
                            }
                            resolve(false);
                        }

                    } catch(err) {
                        console.log(err);
                        console.log(`${url} failed`);
                    }
                });
            }
        )
    }
};