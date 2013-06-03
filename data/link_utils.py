#! python


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

