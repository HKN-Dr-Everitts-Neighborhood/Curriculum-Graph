#! node.exe

var data = require('./data.js');
var common = require('./common.js');

var fs = require('fs');

// subfield graphs
// first, identify all subfields.
var subfields = {};
var tech_elec_types = {
  "ECE tech elective": 1,
  "ECE tech elective / lab": 1,
  "CS tech elective": 1,
  "3of5": 1,
  "3of5 / lab": 1  
};

for (var i=0; i<data.json.length; i++)
{
  var course = data.json[i];
  if (course.type in tech_elec_types || course.eetype in tech_elec_types || course.cetype in tech_elec_types)
  {
    if (course.subfield)
    {
      if (!(course.subfield in subfields))
        subfields[course.subfield] = [];
      
      // add the object representing the class to the list of classes in that subfield
      subfields[course.subfield].push(course);
    }
    else
      console.log(course.name + " is missing a subfield");
  }
}

var output = "";
for (subfield in subfields)
{
  output += "h3. " + subfield + "\n";
  subfields[subfield].sort(function(course1, course2){return course1.name > course2.name;});
  for (var i = 0; i < subfields[subfield].length; i++)
  {
    var course = subfields[subfield][i];
    if (course.link)
      output += "* [" + course.name + " - " + course.title + "|" + course.link + "]\n";
    else
      output += "* " + course.name + " - " + course.title + "\n";
  }
  output += "\n{html}"
  var graph = fs.readFileSync(
    common.subfield_to_file_name(subfield)+".svg"
  );
  output += graph;
  output += "{html}"
  output += "\n\n";
}

fs.writeFileSync("tech_electives_by_subfields.txt", output);