var https = require("https");
const utils = require("./utils");
const api = require('./api');
var qs = require("querystring");

let options = {
    "hostname": "accounts.spotify.com"
}

const getArtistAlbumsCovers = async (clientId, clientSecret, artistId) => {
    try {
        const authorization = await getToken(clientId, clientSecret);

        const firstAlbumArray = await getArtistAlbums(authorization.access_token, artistId, 0);
        const secondAlbumArray = await getArtistAlbums(authorization.access_token, artistId, 50);

        const albums = [...firstAlbumArray.items, ...secondAlbumArray.items];

        let albumsCoversMap = utils.mapAlbumWithCover(albums);

        return albumsCoversMap;
        
    } catch (error) {
        console.log(error)
    }

}

const getToken = (clientId, clientSecret) => {
    const base64Encode = Buffer.from(`${clientId}:${clientSecret}`, 'ascii').toString('base64');

    options.method = "POST";
    options.path = '/api/token';
    options.headers = {
        "content-type": "application/x-www-form-urlencoded",
        "authorization": "Basic " + base64Encode
    }

    return api.request(options);

}

const getArtistAlbums = (token, artistId, offset) => {
    const limit = 50;

    options = {
        "method": "GET",
        "hostname": "api.spotify.com",
        "port": null,
        "path": `/v1/artists/${artistId}/albums?market=ES&offset=${offset}&limit=${limit}`,
        "headers": {
            "accept": "application/json",
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    };

    return api.request(options);
}

module.exports.getArtistAlbumsCovers = getArtistAlbumsCovers;