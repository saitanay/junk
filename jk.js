var casper = require("casper").create({
    verbose: true,
    logLevel: 'info',     // debug, info, warning, error
    pageSettings: {
        loadImages: false,
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
});

var utils = require('utils');

var links;
function getLinks() {
// Scrape the links from top-right nav of the website
    var links = document.querySelectorAll('ul.navigation li a');
    return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href')
    });
}


// Opens casperjs homepage
casper.start('http://casperjs.org/');
casper.then(function () {
    this.echo("hi");
    links = this.evaluate(getLinks);
    utils.dump(links);

});
casper.run(function () {
    this.echo("in run");
    for(var i in links) {
        utils.dump(links[i]);
    }
    this.echo("Done");
    casper.done();
});