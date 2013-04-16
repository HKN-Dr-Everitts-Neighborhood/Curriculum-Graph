#! node.exe

// You add your own extension.
var subfield_to_file_name = function(subfield)
{
  return "thegraph-" + subfield.toLowerCase().replace(/[ :,/]/g, '_').replace(/&/g, 'and');
};

exports.subfield_to_file_name = subfield_to_file_name;