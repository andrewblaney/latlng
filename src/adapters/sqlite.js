let sqlite3 = require('sqlite3').verbose();

module.exports = class sqlite {

    constructor() {
        this.dbPath = './sqlite.db';
        this.init();
    }

    init() {
        this.db = new sqlite3.Database(this.dbPath);
        this.db.exec("CREATE TABLE IF NOT EXISTS locations (name text, lat float, lng float);", (e) => {
            if (e) console.error(e);
        });
    }

    getByName(name) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM locations WHERE name = ?;', [name], (err, row) => {
                if (err) return console.error(err.message);
                resolve(row ? {name: row.name, lat: row.lat, lng: row.lng} : false);
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM locations;', (err, rows) => {
                if (err) return console.error(err.message);
                resolve(rows ? rows : false);
            });
        });
    }


    addToDatabase(location) {
        this.db.run("INSERT INTO locations VALUES (?, ?, ?);", [location.name, location.lat, location.lng], (e) => {
            if (e) console.error(e);
        });
    }
};