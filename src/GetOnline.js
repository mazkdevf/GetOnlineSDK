const fetch = require('node-fetch');
const cheerio = require('cheerio');


class GetOnline {
    /**
     * @param {debug} - Debug mode true/false 
    */
    constructor({ debug = false }) {
        this.debug = debug;
        this.url = "https://tms.garde.fi/tournaments";
    }

    /**
     * @returns {Promise} - Returns an array of Upcoming tournaments
     */
    TulevatTurnaukset = () => new Promise(async (resolve) => {
        this.req(this.url).then((res) => {
            var $ = cheerio.load(res);

            var ff = $('div[class="tournaments index"]');

            for (var i = 0; i < ff.length; i++) {
                const element = ff[i];

                var ok = $(element),
                    ok = ok.html().split("<h2>Päättyneet turnaukset</h2>")

                $ = cheerio.load(ok[0]);

                var okx = [];
                var ok2 = $(element).find('div');

                for (var o = 0; o < ok2.length; o++) {
                    const em = ok2[o];

                    $(em).each(function (index, item) {
                        var id = $(item).attr("id");

                        if (id !== undefined) {
                            if (id.includes("2022")) {
                                if (this.debug) console.log("ID Pushattu: ", id);
                                okx.push($(item).html());
                            }
                        }
                    });
                }

                var list = []
                okx.forEach(function (item) {
                    var ok3 = $(item);

                    var nimi = ok3.find("a").first().text(),
                        nimi = nimi.split("GetOnline 2022")[1].trim()

                    var alkaa = ok3.find('span[class="tournament_start"]').first().text(),
                        alkaa = alkaa.split("\nAlkaa : ")[1].trim();

                    var loppuu = ok3.find('span[class="tournament_end"]').first().text(),
                        loppuu = loppuu.split("\nPäättyy :")[1].trim();

                    var pelinNimi = ok3.find('span[class="tournament_game"]').first().text(),
                        pelinNimi = pelinNimi.split("\nPeli : ")[1].trim();


                    list.push({
                        turnauksenNimi: nimi,
                        pelinNimi: pelinNimi,
                        alkaa: alkaa,
                        loppuu: loppuu,
                    })
                });

                this.list = list;
            }

            resolve(this.list);
        }).catch((err) => {
            if (this.debug) console.log(err);
            resolve([]);
        })
    });

    /**
     * @returns {Promise} - Returns an array of Finished tournaments
    */
    MenneetTurnaukset = () => new Promise(async (resolve) => {
        this.req(this.url).then((res) => {
            var $ = cheerio.load(res);

            var ff = $('div[class="tournaments index"]');

            for (var i = 0; i < ff.length; i++) {
                const element = ff[i];

                var ok = $(element),
                    ok = ok.html().split("<h2>Päättyneet turnaukset</h2>")

                $ = cheerio.load(ok[1]);

                var okx = [];
                var ok2 = $(element).find('div');

                for (var o = 0; o < ok2.length; o++) {
                    const em = ok2[o];

                    $(em).each(function (index, item) {
                        var id = $(item).attr("id");

                        if (id !== undefined) {
                            if (!id.includes("2022")) {
                                if (this.debug) console.log("ID Pushattu: ", id);
                                okx.push($(item).html());
                            }
                        }
                    });
                }

                var list = []
                okx.forEach(function (item) {
                    var ok3 = $(item);

                    var nimi = ok3.find("a").first().text();
                    if (nimi.includes("GetOnline")) { nimi = nimi.split("GetOnline ")[1].trim() } else { nimi = nimi.trim() }

                    var alkaa = ok3.find('span[class="tournament_start"]').first().text(),
                        alkaa = alkaa.split("\nAlkaa : \n")[1].trim();

                    var loppuu = ok3.find('span[class="tournament_end"]').first().text(),
                        loppuu = loppuu.split("\nPäättyy : \n")[1].trim();

                    var pelinNimi = ok3.find('span[class="tournament_game"]').first().text(),
                        pelinNimi = pelinNimi.split("\nPeli : \n")[1].trim();

                    list.push({
                        turnauksenNimi: nimi,
                        pelinNimi: pelinNimi,
                        alkoi: alkaa,
                        loppui: loppuu,
                    })
                });

                this.list = list;
            }

            resolve(this.list);
        }).catch((err) => {
            if (this.debug) console.log(err);
            resolve([]);
        })
    });

    /**
     * @param {url} url - Url to fetch 
     * @returns {Promise} - Returns a promise with the fetched data
    */
    req = (url) => new Promise(async (resolve) => {
        fetch(url)
            .then((res) => res.text()).then((res) => resolve(res)).catch((err) => {
                if (this.debug) {
                    console.log(err);
                }
                resolve([]);
            });
    });

}



/**
 * Exports the class GetOnline
*/
module.exports = GetOnline;