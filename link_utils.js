#! node

function make_internal_link(course){
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
