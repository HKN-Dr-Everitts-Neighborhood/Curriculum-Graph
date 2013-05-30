#! python

import sys, json
import requests
import urlparse # this is urllib.parse in Python 3
from bs4 import BeautifulSoup

def get_tiny_link(url, soup):
    '''Take the url and soup of a wiki page and returns the wiki tinylink.
    '''

    tiny_link = soup.find('link', rel='shortlink')

    return tiny_link['href']


def get_pagetitle(soup):
    '''Takes the soup of a page, returns the title of that page
    
    Note that this is the title that we'd use to link to the page internally
    '''
    
    return soup.select('#title-heading a')[0].contents[0]

def child_page_urls(url, soup):
    '''returns a list of the urls of the children pages
    
    Input: url and soup of the page to get the children from.
    '''

    return [
        urlparse.urljoin(url, link['href'])
        for link in soup.select('#page-children a')
    ]

def crawl(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text)
    
    results = [ dict(
        tinylink=get_tiny_link(url, soup),
        pagetitle=get_pagetitle(soup)
    ) ]

    # This is slow because it crawls the wiki serially.
    # May be worth trying to do some threading here in the future.
    urls = child_page_urls(url, soup)
    results.extend(crawl(url) for url in urls)

    return results

def main():
    results = crawl("https://wiki.engr.illinois.edu/display/HKNDEN/Home")
    with open('../data/links.json', 'w') as f:
        f.write(json.dumps(results))

if __name__ == '__main__':
    main()
