#! python

import json
import link_utils
from utils import relative_to

# The point of this script is to take raw_data.json and links.json
# and combine it into data.json.

# read in raw_data.json
with open(relative_to(__file__, './raw_data.json'), 'r') as f:
    raw_data = f.read()

data = json.loads(raw_data)

# go through all courses, and look for a corresponding link.
# old implementation set up a dictionary to speed this up,
# but crosslisted courses caused trouble - hence now we look through
# all links looking for a match
for course in data:
    link_info = link_utils.find_link(course['name'])
    
    if 'link_fallback' in course:
        if not link_info:
            print 'Searching', course['name'], 'for fallback link'
            link_info = link_utils.find_link(course['link_fallback'])
    
        del course['link_fallback']
    
    if link_info:
        course['link'] = link_info['tinylink']
        course['pagetitle'] = link_info['pagetitle']
    course['internallink'] = link_utils.make_internal_link(course)

# write to data.json
with open(relative_to(__file__, '../data.json'), 'w') as outfile:
    outfile.write(
        json.dumps(data, indent=4, sort_keys=True, separators=(',', ': '))
    )

