#! python

import json

# read in links.json
with open('data/links.json', 'r') as f:
    links_json = f.read()

links = json.loads(links_json)

def find_link(course_name):
    for link_info in links:
        if link_info['pagetitle'].startswith(course_name):
            print "Matched", course_name, "to", repr(link_info['pagetitle'])
            return link_info

    print "Failed to find page matching", course_name
    return None

def make_internal_link(course):
    '''takes a course, and returns the pagetitle of the course OR if there is
    no corresponding wiki page, creates a title for the course based on the
    encoded convention.

    WARNING: Changing this code could change red links generated in the future;
    if these are different that old red links that should point to the same
    page, it will cause red links to not link up automatically as they should.
    '''

    if 'pagetitle' in course:
        return course['pagetitle']

    crosslist_str = (
        (' (' + ', '.join(course['crosslist']) + ')')
        if ('crosslist' in course) else ''
    )
    should_be_named = (course['name'].replace(':', ',') +
        crosslist_str + " - " + course['title'].replace(':', ','))

    return should_be_named

