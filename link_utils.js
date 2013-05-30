#! node

function make_internal_link(course){

  /*
  takes a course, and returns the pagetitle of the course OR if there is
  no corresponding wiki page, creates a title for the course based on the
  encoded convention.

  Make sure this stays in sync with the corresponding function in
  link_utils.js
  */

  if (course.pagetitle !== undefined)
    return course.pagetitle;

  var crosslist_str = '';
  if (course.crosslist !== undefined)
  {
    crosslist_str = ' (' + course.crosslist.join(', ') + ')';
  }

  var should_be_named = course.name.replace(':', ',') + crosslist_str + ' - ' + course.title;

  return should_be_named;
}

exports.make_internal_link = make_internal_link;
