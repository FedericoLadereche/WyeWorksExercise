const spotify = require('../src/lib/spotify');
const processFile = require('../src/lib/parser');
const createAlbums = require('../src/lib/utils');
const trello = require('../src/lib/trello');
const { spotifyClientId, spotifyClientSecret, artistId, filePath, trelloClientId, trelloClientSecret, boardName } = require('../src/lib/config');

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