Curriculum-Graph
================

This Repo contains the code for the curriculum graph project for the DEN wiki.

Design Goals
============

We want the graph to be interactive.  We want the code to be easy to develop, maintain, and extend.  Some features we'd like to implement:
* Automatic layout - fosters easier maintainence
* Ability to show / hide courses (and their prereqs) - the full graph will most likely be too large to be comfortably viewed
* Classification of courses by specializations, and ability to show / hide whole specializations
* Distinguish between prereqs and coreqs; we may also want to distinguish between officially pre/coreq classes and DEN recommendations

Design Decisions
================
Because we consider interactivity to be a core goal, this project should be in javascript; for maintainability, it's easiest to have everything in javascript (we have no server to run server-side code).

After evaluating several possible libraries (see the top answer: http://stackoverflow.com/questions/7034/graph-visualization-code-in-javascript), two alternatives seem reasonable: d3, or jsplumb/jquery/etc.  Either way we'll have to write our own layout code, since the graph is a DAG (plenty of tools exist for trees); moreover, d3 has a lot of tutorials, and looks like it will be a more maintainable/sensible choice.  Thus, we'll be implementing everything on top of d3.

Originally, the interactive tree example caught my eye; it might be worth trying to hack the tree code instead of writing our own from the ground up; on the other hand, it might be best to use the tree code as an example.

A bunch of d3 tutorials can be found at https://github.com/mbostock/d3/wiki/Tutorials

Data Format
===========

The data format needs to support the above design goals.  As long as no new features need to be added, it should be enough to edit the data to change the resulting graph.  The data should be written in JSON.

The format looks like this:

````
[
  {
    "name": <course number - e.g. ECE 110>
    "title": <course title - e.g. Introduction to Electrical and Computer Engineering>,
    "link": <link to wiki page> // This field is optional
    "crosslist": [<name1>, <name2>, ... ], // This field is also optional
    "nocredit": [<name1>, <name2>, ...], // This field is also optional
    "prereqs": [ [<prereq1 name>, <prereq2 name>], ... ],
    "coreqs": [ [<coreq1 name>, <coreq2 name>], ... ]
  },
  {
    "name": <next course name>,
    "title": <The course's title> //there is no page for this course, and hence no link
    "prereqs": [ [<prereq1 name>, ... ], ... ]
    "coreqs": [ [<coreq1 name>, <coreq2 name>, ... ], ... ]
  },
  ...
]
````

This format is still under development.  Right now, we'll have prereqs and coreqs being the official prereqs / coreqs; in the future, we may extend the format to allow for displaying "DEN recommendations" about prereqs/coreqs.  Worth mentioning about prereqs / coreqs: the format is a list of lists: each sublist is a set of prereqs which prepare you for that class.  So for example, if we want to say that for ECE 210 you need (MATH 286 or MATH 285) and PHYS 212, we'd set the prereqs to

````
[["MATH 286", "PHYS 212"], ["MATH 285", "PHYS 212"]]
````

The crosslist parameter is a list of names by which the course is crosslisted as.  A valid crosslist might look like this (for ECE 462):

````
"crosslist": [ "CS 462", "MATH 491"]
````

The nocredit field is a list of classes for which you can't get credit for if you take this class; for example, if you take Math 286, you can't get credit for Math 285 or Math 441, so Math 286 would have

````
"nocredit": ["MATH 285", "MATH 441"]
````

One issue is having multiple courses under the same name - e.g. ECE 498.  This issue will have to be tackled if we ever feel it necessary to tackle this in the graph - these courses tend to be outside the normal curriculum, and change from semester to semester.  A possible solution would be to have a suffix added to the name of these courses - e.g. "ECE 498SL" could be Steve Lumetta's "Engineering Parallel Software" class.  It's important that the names be unique.
