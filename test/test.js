'use strict';
var assert = require('assert');
var googleContactsNoauth = require('../');

describe('google-contacts-noauth node module', function () {
  it('must return an error if the access token was not set', function () {
    googleContactsNoauth().getContacts(function (error) {
      assert(error !== null, 'an error should have occured');
    });
  });
});
