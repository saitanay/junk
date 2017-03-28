var casper = require("casper").create({
    // verbose: true,
    // logLevel: 'info',     // debug, info, warning, error
    pageSettings: {
        loadImages: false,
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
});

var url = 'http://2017.drupalmumbai.org/attendees?page=';
var currentPage = 0;
var candidates = [];
var utils = require('utils');

casper.start(url+currentPage, function () {
   this.waitForSelector('.team-attendees');
});


casper.then(function() {

    candidates = this.evaluate(getCandidates);

});

function getCandidates() {
    var links = document.querySelectorAll('#middle-content > div > div > div > div > div:nth-child(6) > div > span > div > div > div.user-name > h2 > a');
    return Array.prototype.map.call(links, function(e) {
        return e.fetchText('.selectorgadget_rejected');
    });
}

casper.run(function() {
    // echo results in some pretty fashion
    utils.dump(candidates);
});




//
// casper.then(function() {
//     // var nodelist = this.evaluate(function() {
//     //     return document.querySelectorAll('#middle-content > div > div > div > div > div > div > span > div > div > div.user-name > h2');
//     // });
//     // this.echo(nodelist.length);
//
//     var links = document.querySelectorAll('#middle-content > div > div > div > div > div:nth-child(6) > div > span > div > div > div.user-name > h2 > a');
//     var links2 =  Array.prototype.map.call(links, function (e) {
//         return e.fetchText('.selectorgadget_rejected');
//     });
//
//     utils.dump(links2);
//
//
//     // var nodeArray = [];
//     // for (var i = 0; i < nodelist.length; ++i) {
//     //     nodeArray[i] = nodelist[i];
//     // }
//     //
//     // // utils.dump(nodelist);
//     // // utils.dump(nodelist.length);
//     // // utils.dump(nodelist);
//     // utils.dump(nodeArray[1]);
//
// });
// casper.waitForSelector('.team-attendees', function() {
//     this.echo('Wiating for selector');
// });
//
//
// casper.run(function() {
//     this.echo('Complete!');
//     this.exit(); // <--- don't forget me!
// });