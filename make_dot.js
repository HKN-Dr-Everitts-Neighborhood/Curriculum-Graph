#! /c/Program Files/nodejs/node.exe

var mygraph = require('./mygraph.js');
var data = require('./data.js');

var g = mygraph.makegraph(data.json);
console.log(g.make_dot(false, true));


