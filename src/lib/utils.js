const albumObject = require('./album');

const associateAlbumsWithCovers = (albumCoversMap, extractedLinesFromFile) => {
    const result = [];
    const yearRgx = /^..../g;
    const titleRgx = /(?<=^.....)(.*)/g;

    extractedLinesFromFile.forEach(line => {
        const album = Object.create(albumObject);
        album.year = Number(line.match(yearRgx));
        album.title = line.match(titleRgx).toString().replace('’', "'");
        album.decade = album.year - (album.year % 10);
        album.cover = albumCoversMap.get(album.title.toLowerCase());
        
        result.push(album);
    });

    let albums = groupAlbumByDecade(result);

    return orderGroupedAlbums(albums);
}

const groupAlbumByDecade = (albums) => {
    return groupBy(albums, 'decade');
}

const groupBy = function (collection, key) {
    return collection.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

function mapAlbumWithCover(albums) {
    var albumCoverMap = new Map();

    for(let items in albums) {
        albumCoverMap.set(albums[items].name.toLowerCase(), albums[items].images[1].url)
    }

    return albumCoverMap;
}

function orderGroupedAlbums(albums) {
    for (let decade in albums) {
        albums[decade].sort(compareAlbums);
    }

    return albums;
}

function compareAlbums(a, b) {

    if(a.year < b.year) return -1;
    if(a.year > b.year) return 1;

    if(a.title.toLowerCase() < b.title.toLowerCase()) return -1; 
    if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
    
    return 0; 
}

module.exports.associateAlbumsWithCovers = associateAlbumsWithCovers;
module.exports.mapAlbumWithCover = mapAlbumWithCover;