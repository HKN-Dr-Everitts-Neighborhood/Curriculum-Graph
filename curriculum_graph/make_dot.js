#! node.exe

var mygraph = require('./mygraph.js');
var data = require('./data.js');
var common = require('./common.js');

var fs = require('fs');
var exec = require('child_process').exec;

// helper function

var exec_callback = function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
};

// A bunch of stuff related to colorings
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

// function that saves the dot file, then runs dot to create svg
var make_svg_from_dot = function(dot, name, dot_folder, svg_folder)
{
  fs.writeFile(dot_folder + "/" + name + ".dot", dot, function(err)
  {
    if (err)
      console.log("Error saving file: " + err);
    else
      exec("dot -Tsvg " + dot_folder + "/" + name + ".dot > "
           + svg_folder + "/" + name + ".svg", exec_callback);
  });
};

// function to create and save graphs
var make_svg = function(g, options, coloring, name, constraints)
{
  var dot = g.make_dot(false, true, options, coloring, constraints);

  // main graphs: svg is final output, so it goes in the output folder.  dot
  // goes in the temp folder.
  make_svg_from_dot(dot, name, "temp", "output");
};

// function to create and save subfield graphs
var make_subfield_svg = function(g, options, coloring, subfield)
{
  var dot = g.make_subfield_dot(false, true, options, coloring, subfield);
  var filename = common.subfield_to_file_name(subfield);
  console.log(filename);

  // dot and svg of subfields goes in temp
  make_svg_from_dot(dot, filename, "temp", "temp");
};

// Actual code - no more helpers.

var options = {"rankdir": "LR", "ranksep": "1", "size": "\"8.5,13\""};

// Picks out the math 415 to CS 418 transition.  Many graphs we don't
// want to be constrained by it - it seems to be the last straw that
// finally fucks up the whole layout.
var constrained = {"MATH 415 -> CS 418": false} 

// parse the data
var g = mygraph.makegraph(data.json);

make_svg(g, options, coloring_func, "thegraph-small", constrained);
make_svg(g, {"rankdir": "LR", "ranksep": "1"}, coloring_func, "thegraph", constrained);
make_svg(g, options, ee_coloring, "thegraph-ee", constrained);
make_svg(g, options, compe_coloring, "thegraph-compe", constrained);

// subfield graphs
// first, identify all subfields.
var subfields = {};
for (var i=0; i<data.json.length; i++)
{
  if (data.json[i].subfield)
    subfields[data.json[i].subfield] = 1;
}

// This makes the subfield graphs narrower = helps at right margin of the
// tech electives by subfield page
options.size = "\"8,13\"";

// make graphs for each subfield
for (var s in subfields)
{
  make_subfield_svg(g, options, coloring_func, s);
}
