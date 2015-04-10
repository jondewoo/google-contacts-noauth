'use strict';

var https = require('https');

function GoogleContactsNoauth() {

  if (!(this instanceof GoogleContactsNoauth)) {
    return new GoogleContactsNoauth();
  }

  this.httpOptions = {
    host: 'www.google.com',
    port: 443,
    path: '/m8/feeds/contacts/default/full?alt=json',
    method: 'GET',
    headers: {
      'GData-Version': '3.0',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

}

GoogleContactsNoauth.prototype.setAccessToken = function (accessToken) {

  this.httpOptions.headers['Authorization'] = 'Bearer ' + accessToken;

};

GoogleContactsNoauth.prototype.getContacts = function (callback) {

  var req = https.request(this.httpOptions, function(res) {

    var output = '';
    console.log(this.httpOptions.host + ':' + res.statusCode);
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
        output += chunk;
    });

    res.on('end', function() {
        var obj = JSON.parse(output);
        console.log(res.statusCode);
        console.log(obj.feed.entry);
        callback(null, obj.feed.entry);
    });

  });

  req.on('error', function(err) {
      console.log('error:', err.message);
      callback(err);
  });

  req.end();

};

exports = module.exports = GoogleContactsNoauth;
