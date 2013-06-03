#! python

import json

# read in links.json
with open('data/links.json', 'r') as f:
    links_json = f.read()

links = json.loads(links_json)

def find_link(course_name):
    for link_info in links:
        if link_info['pagetitle'].startswith(course_name):
            return link_info

def make_internal_link(course):
    '''takes a course, and returns the pagetitle of the course OR if there is
    no corresponding wiki page, creates a title for the course based on the
    encoded convention.
    '''

    if 'pagetitle' in course:
        return course['pagetitle']

    crosslist_str = (
        (' (' + ', '.join(course['crosslist']) + ')')
        if ('crosslist' in course) else ''
    )
    should_be_named = (course['name'].replace(':', ',') +
        crosslist_str + " - " + course['title'])

    return should_be_named

