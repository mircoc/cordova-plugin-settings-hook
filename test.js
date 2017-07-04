#!/usr/bin/env node

var fs = require("fs"),
    path = require("path"),
    cordova = require('cordova'),
    et = require('elementtree');


var configXmlData;

// Parses a given file into an elementtree object
var parseElementtreeSync = function (filename) {
    var contents = fs.readFileSync(filename, 'utf-8');
    if(contents) {
        //Windows is the BOM. Skip the Byte Order Mark.
        contents = contents.substring(contents.indexOf('<'));
    }
    return new et.ElementTree(et.XML(contents));
};