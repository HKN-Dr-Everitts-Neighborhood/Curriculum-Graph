#! python

import json, requests, urllib

# goal of this script: check for broken links in the data

def make_internal_link(course):
    
    unescaped = (course['name'] +
        ((' (' + ', '.join(course['crosslist']) + ')') if ('crosslist' in course) else '')
      + " - " + course['title'])
    
    return ("https://wiki.engr.illinois.edu/display/HKNDEN/" +
        urllib.quote(unescaped.replace(' ', '+')).replace('%2B', '+')
    )


def main():
  with open('./data.json', 'r') as f:
      data = json.loads(f.read())
      
  for course in data:
      link = course.get('link')
      if link:
          response = requests.get(link)
          if (response.status_code != 200):
              print course['name'], "link", link, "returned", response.status_code
          
          internal_link = make_internal_link(course)
          if link != internal_link:
              print "mismatch between link in data and generated internal link"
              print '\t', link
              print '\t', internal_link

if __name__ == "__main__":
    main()
