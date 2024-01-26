const fs = require('fs');

const saveToDatabase = (DB, table = "db") => {
    fs.writeFileSync(`./src/database/${table}.json`, JSON.stringify(DB, null, 2), {
        encoding: "utf-8",
    });
};

module.exports = { saveToDatabase };
