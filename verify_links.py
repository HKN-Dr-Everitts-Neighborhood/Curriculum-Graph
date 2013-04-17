#! python

import json, requests

# goal of this script: check for broken links in the data

with open('./data.json', 'r') as f:
    data = json.loads(f.read())
    
for course in data:
    link = course.get('link')
    if link:
        response = requests.get(link)
        if (response.status_code != 200):
            print course['name'], "link", link, "returned", response.status_code