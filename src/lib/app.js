const spotify = require('./spotify');
const processFile = require('./parser');
const createAlbums = require('./utils');
const trello = require('./trello');
const { spotifyClientId, spotifyClientSecret, artistId, filePath, trelloClientId, trelloClientSecret, boardName } = require('./config');

const main = async () => {
    try {
        const albumsCoversMap = await spotify.getArtistAlbumsCovers(spotifyClientId, spotifyClientSecret, artistId);
        const albumsTitles = await processFile.collectAlbumsFromFile(filePath);
        const albums = await createAlbums.associateAlbumsWithCovers(albumsCoversMap, albumsTitles);
        await trello.createArtistBoardWithListAndCards(trelloClientId, trelloClientSecret, boardName, albums);
    } catch (error) {
        console.log(error);
    }
}

main().then(() => { return });