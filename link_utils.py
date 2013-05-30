#! python

def make_internal_link(course):
    
    if 'pagetitle' in course:
        return course['pagetitle']

    crosslist_str = (
        (' (' + ', '.join(course['crosslist']) + ')')
        if ('crosslist' in course) else ''
    )
    should_be_named = (course['name'].replace(':', ',') +
        crosslist_str + " - " + course['title'])

    return should_be_named

