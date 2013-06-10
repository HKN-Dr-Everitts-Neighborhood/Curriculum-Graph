
// You add your own extension.
var subfield_to_file_name = function(subfield)
{
  return "thegraph-" + subfield.toLowerCase().replace(/[ :,/]/g, '_').replace(/&/g, 'and');
};

// returns " (same as ...)" text (or empty string if there is no crosslist).
var same_as = function(course)
{
  var txt = "";
  // write out crosslist
  if (course.crosslist) {
    txt += " (same as ";
    var len = course.crosslist.length;
    for (var i=0; i < len; i++) {
      txt += course.crosslist[i];
      if (len-2 > i)
        txt += ", ";
      else if (i === len-2) {
        if (len === 2)
          txt += " and ";
        else
          txt += ", and ";
      }
    }
    txt += ")";
  }
  
  return txt;
};

if (typeof exports !== "undefined")
{
  exports.subfield_to_file_name = subfield_to_file_name;
  exports.same_as = same_as;
}