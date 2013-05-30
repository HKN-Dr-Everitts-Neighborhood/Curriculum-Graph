#! python

import json

# combine all the data in here into data.json.

# read in raw_data.json
with open('raw_data.json', 'r') as f:
    raw_data = f.read()

data = json.loads(raw_data)

# read in links.json
with open('links.json', 'r') as f:
    links_json = f.read()

links = json.loads(links_json)


# build a mapping from class name (e.g. 'ECE 110') to link info

link_map = dict(
    (item['pagetitle'].split('-')[0].strip(),item)
    for item in links
)

# go through all courses, and add links and pagetitles
# when a corresponding wiki page exists.
for course in data:
    # not all courses have corresponding wiki pages.
    if course['name'] in link_map:
        course['link'] = link_map[course['name']]['tinylink']
        course['pagetitle'] = link_map[course['name']]['pagetitle']

with open('../data.json', 'w') as outfile:
    outfile.write(json.dumps(data))

