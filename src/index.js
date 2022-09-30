const GetOnline = require('./GetOnline');

const getOnline = new GetOnline({
    debug: false
});

/**
 * Get an array of all the tournaments that are coming up.
*/
getOnline.TulevatTurnaukset().then((res) => {
    console.log(res); // Palauttaa joukon tulevia turnauksia - Returns array of Upcoming tournaments
}).catch((err) => {
    console.log(err); // Tapahtui virhe - An error has occurred
})


/**
 * Get an array of all the tournaments that are finished.
*/
getOnline.MenneetTurnaukset().then((res) => {
    console.log(res); // Palauttaa joukon Päättyneitä turnauksia - Returns an array of Finished tournaments
}).catch((err) => {
    console.log(err); // Tapahtui virhe - An error has occurred
})