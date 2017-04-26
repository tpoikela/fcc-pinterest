
'use strict';


const debug = require('debug')('search');

const https = require('https');
const querystring = require('querystring');

const apiHostname = 'api.cognitive.microsoft.com';

/** A wrapper around bing search module. */
class BingSearch {

    constructor(key) {
        if (key) {
            this.key = key;
        }
        else {
            let err = new Error('Bing API_KEY not given.');
            throw err;
        }
    }

    /* Performs a bing api image search. Query can contain keyword (q), offset
     * and count. */
    search(query, cb) {

        let queryObj = {q: query.keyword};

        if (query.count) {queryObj.count = query.count;}
        else {queryObj.count = 10;}

        if (query.offset) {queryObj.offset = query.offset;}

        let qs = querystring.stringify(queryObj);

        let options = {
            hostname: apiHostname,
            path: '/bing/v5.0/images/search?' + qs,
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': this.key
            }
        };

        let data = [];
        let req = https.request(options, (res) => {
            debug('req.status: ' + JSON.stringify(res.statusCode));
            debug('req.headers: ' + JSON.stringify(res.headers));
            debug('https.get req has been done');

            res.on('data', (d) => {
                data.push(d);
            });

            res.on('end', () => {
                debug('response finished OK');
                let str = data.map( item => {return item.toString();});
                let respObj = JSON.parse(str);
                debug('data finished: ' + JSON.stringify(respObj));
                let images = respObj.value;
                let filteredImages = images.map( item => {
                    return {
                        thumbnailUrl: item.thumbnailUrl,
                        url: item.contentUrl,
                        title: item.name
                    };
                });
                cb(null, {data: filteredImages});
            });

        });

        req.on('error', (err) => {
            console.error('https.get error ' + err);
            cb(err);
        });

        req.end();

    }

}

module.exports = BingSearch;
