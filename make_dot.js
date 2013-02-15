#! /c/Program Files/nodejs/node.exe

var mygraph = require('./mygraph.js');
var data = require('./data.js');
var fs = require('fs');

var g = mygraph.makegraph(data.json);

var small_dot = g.make_dot(false, true, {"rankdir": "LR", "ranksep": ".75", "size": "\"8.5,11\""});
var dot = g.make_dot(false, true, {"rankdir": "LR", "ranksep": ".75"});

var errorfunc = function(err)
{
  if (err)
    console.log("Error saving file: " + err);
};

fs.writeFile("./thegraph.dot", dot, errorfunc);
fs.writeFile("./thegraph-small.dot", small_dot, errorfunc);

