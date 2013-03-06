#! /c/Program Files/nodejs/node.exe

var mygraph = require('./mygraph.js');
var data = require('./data.js');
var fs = require('fs');

var g = mygraph.makegraph(data.json);

// colorings for everyone
var color_map = {
  "ECE tech elective": "blue",
  "ECE tech elective / lab": "blue",
  "CS tech elective": "cyan",
  "required": "red"
};
var coloring_func = function(node)
{
  var color = undefined;
  // Color code by type
  if (node.object.type)
  {
    if (node.object.type in color_map)
    {
      color = color_map[node.object.type];
    }
  }
  else if (node.object.cetype === "required" || node.object.eetype === "required")
  {
    color = "orange";
  }
  else if (node.object.eetype === "3of5")
  {
    color = "green";
  }

  return color;
};

var small_dot = g.make_dot(false, true, {"rankdir": "LR", "ranksep": ".75", "size": "\"8.5,11\""}, coloring_func);
var dot = g.make_dot(false, true, {"rankdir": "LR", "ranksep": ".75"}, coloring_func);

var ee_color_map = {
  "ECE tech elective": "blue",
  "ECE tech elective / lab": "blue",
  "CS tech elective": "cyan",
  "tech elective": "magenta",
  "required": "red",
  "3of5": "green",
  "3of5 / lab": "green"
};
var ee_coloring =function(node)
{
  var type = node.object.type || node.object.eetype;
  return ee_color_map[type];
};
var compe_coloring =function(node)
{
  var type = node.object.type || node.object.cetype;
  return ee_color_map[type];
};


var ee_dot = g.make_dot(false, true, {"rankdir": "LR", "ranksep": ".75", "size": "\"8.5,11\""}, ee_coloring);
var compe_dot = g.make_dot(false, true, {"rankdir": "LR", "ranksep": ".75", "size": "\"8.5,11\""}, compe_coloring);

var errorfunc = function(err)
{
  if (err)
    console.log("Error saving file: " + err);
};

fs.writeFile("./thegraph.dot", dot, errorfunc);
fs.writeFile("./thegraph-small.dot", small_dot, errorfunc);
fs.writeFile("./thegraph-ee.dot", ee_dot, errorfunc);
fs.writeFile("./thegraph-compe.dot", compe_dot, errorfunc);

