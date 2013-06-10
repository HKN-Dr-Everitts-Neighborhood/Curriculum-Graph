
import json

with open('../data.json', 'r') as data_file:
    data = json.loads(data_file.read())
    course_map = dict((x['name'],x) for x in data)
    for course in data:
        if 'crosslist' in course:
            for crosslisted in course['crosslist']:
                course_map[crosslisted] = course

def find_course(name):
    return course_map.get(name)

