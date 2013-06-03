#! python

import json, os, sys
from link_utils import make_internal_link

# The point of this script is to take raw_data.json and links.json
# and combine it into data.json.



# first, set the working directory.  Important since we use relative paths.
os.chdir(os.path.dirname(sys.argv[0]))

# read in raw_data.json
with open('raw_data.json', 'r') as f:
    raw_data = f.read()

data = json.loads(raw_data)


# read in links.json
with open('links.json', 'r') as f:
    links_json = f.read()

links = json.loads(links_json)


# go through all courses, and look for a corresponding link.
# old implementation set up a dictionary to speed this up,
# but crosslisted courses caused trouble - hence now we look through
# all links looking for a match
for course in data:
    for link_info in links:
        if course['name'] in link_info['pagetitle']:
            course['link'] = link_info['tinylink']
            course['pagetitle'] = link_info['pagetitle']
            break
    course['internallink'] = make_internal_link(course)

# write to data.json
with open('../data.json', 'w') as outfile:
    outfile.write(
        json.dumps(data, indent=4, sort_keys=True, separators=(',', ': '))
    )

