const fs = require('fs');

const collectAlbumsFromFile = (path) => {
    let text = fs.readFileSync(path, "utf-8");
    let arrayOfLines = text.trim().split("\n");
    let albums = [];

    arrayOfLines.forEach(line => {
        albums.push(line);
    });

    return albums;
}

module.exports.collectAlbumsFromFile = collectAlbumsFromFile;
