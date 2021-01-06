const https = require('https');
const api = require('./api');

let options = {
    "method": "POST",
    "hostname": "api.trello.com"
}

const createArtistBoardWithListAndCards = async (clientKey, token, boardName, albums) => {
    try {
        const board = await createBoard(clientKey, token, escape(boardName));

        await Promise.all(Object.keys(albums).map(async (decade) => {
            let list = await createList(clientKey, token, board.id, escape(decade));

            for (const album in albums[decade]) {
                let card = await createCard(clientKey, token, list.id, escape(albums[decade][album].year + ' ' + albums[decade][album].title));
                if (albums[decade][album].cover) {
                    await createAttachmentCoverOnAcard(clientKey, token, card.id, 'Cover', albums[decade][album].cover);
                }
            }
        }));
    } catch (error) {
        console.log(error);
    }
    
}

const createBoard = (clientKey, token, boardName) => {
    options.path = `/1/boards/?key=${clientKey}&token=${token}&name=${boardName}&defaultLists=false`;

    return api.request(options);
}

const createList = (clientKey, token, boardId, listName) => {
    options.path = `/1/lists?key=${clientKey}&token=${token}&name=${listName}&idBoard=${boardId}&pos=bottom`;

    return api.request(options);
}

const createCard = (clientKey, token, listId, cardName) => {
    options.path = `/1/cards?key=${clientKey}&token=${token}&idList=${listId}&name=${cardName}`;

    return api.request(options);
}

const createAttachmentCoverOnAcard = (clientKey, token, cardId, coverName, coverUrl) => {
    options.path = `/1/cards/${cardId}/attachments?key=${clientKey}&token=${token}&name=${coverName}&url=${coverUrl}&setCover=true`;

    return api.request(options);
}

module.exports.createArtistBoardWithListAndCards = createArtistBoardWithListAndCards;