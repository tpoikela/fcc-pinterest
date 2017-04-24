
'use strict';

const Search = require('bing.search');

/** A wrapper around bing search module. */
class BingSearch {

    constructor(key) {
        this.key = key;
        this.searchObj = new Search(key);
    }

    search(query, cb) {
        if (this.key) {
            let expr = query.keyword;
            let offset = query.offset;

            this.searchObj.images(expr,
                {top: 10, skip: offset},
                (err, results) => {
                    if (err) {cb(err);}
                    else {
                        cb(null, results);
                    }
                }
            );
        }
        else {
            console.error('API key not set. Cannot search.');

        }
    }

}

module.exports = BingSearch;
