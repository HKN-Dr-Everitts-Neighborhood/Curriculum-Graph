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

[
  {
    "name": <course number and name>,
    "prereqs": [<prereq1>, <prereq2>, ... ]
  },
  {
    "name": <next course name>,
    "prereqs": [<prereq1>, ... ]
  },
  ...
]
