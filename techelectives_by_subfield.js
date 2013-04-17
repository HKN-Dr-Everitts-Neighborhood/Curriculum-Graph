#! node.exe

var data = require('./data.js');
var common = require('./common.js');

var fs = require('fs');

// Subfields is an object that will map the name of a subfield to the list of classes in that subfield.
var subfields = {};
var tech_elec_types = {
  "ECE tech elective": 1,
  "ECE tech elective / lab": 1,
  "CS tech elective": 1,
  "3of5": 1,
  "3of5 / lab": 1  
};

// go through all the data, fill in subfields object
for (var i=0; i<data.json.length; i++)
{
  var course = data.json[i];
  if (course.type in tech_elec_types || course.eetype in tech_elec_types || course.cetype in tech_elec_types)
  {
    if (course.subfield)
    {
      // if the subfield hasn't been seen before, need to create a list for it.
      if (!(course.subfield in subfields))
        subfields[course.subfield] = [];
      
      // add the object representing the class to the list of classes in that subfield
      subfields[course.subfield].push(course);
    }
    else
      console.log(course.name + " is missing a subfield");
  }
}

// Now build the tech electives by subfields wiki text from the subfields object.
var output = "";

// sort the subfields
var fields = [];
for (subfield in subfields) {
  fields.push(subfield);
}
fields.sort();

//now, generate the index
function to_anchor(subfield){return subfield.replace(/[ :,/]/g, '_').replace(/&/g, 'and');}

output += "h3. Subfields:\n";
for (var i = 0; i < fields.length; i++)
{
  var subfield = fields[i];
  output += "* [" + subfield + "|#" + to_anchor(subfield) + "]\n";
}
output += "\n";

function link(course)
{
  if (course.crosslist)
    return course.name + " (" +course.crosslist.join(', ') + ") - " + course.title;
  return course.name + " - " + course.title;
}

// print out the subfields / graphs / bullets
for (var j = 0; j < fields.length; j++)
{
  var subfield = fields[j];
  output += "{anchor:" + to_anchor(subfield) + "}\n";
  output += "h3. " + subfield + "\n";
  subfields[subfield].sort(function(course1, course2){return course1.name > course2.name;});
  for (var i = 0; i < subfields[subfield].length; i++)
  {
    var course = subfields[subfield][i];
	  
    if (course.link)
      output += "* [" + course.name + " - " + course.title + "|" + link(course) + "]";
    else
      output += "* " + course.name + " - " + course.title;
    
    output += common.same_as(course) + "\n";
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