const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    artistId: process.env.ARTIST_ID,
    filePath: process.env.FILE_PATH,
    trelloClientId: process.env.TRELLO_CLIENT_ID,
    trelloClientSecret: process.env.TRELLO_CLIENT_SECRET,
    boardName: process.env.BOARD_NAME
};