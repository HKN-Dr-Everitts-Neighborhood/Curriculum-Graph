curriculum_graph
==============

This subfolder holds all the code necessary for

* The Curriculum Graphs on the wiki, including the EE, CompE, and subfield graphs
* The code to generate tech electives by subfields
* Code for an interactive, javascript/html version of the graph. (not used)
* Code for interactivity support on the wiki

Design Goals
============

We want the graph to be interactive.  We want the code to be easy to develop, maintain, and extend.  Some features we'd like to implement:
* Automatic layout - fosters easier maintainence
* Ability to show / hide courses (and their prereqs) - the full graph will most likely be too large to be comfortably viewed.
* Classification of courses by specializations, and ability to show / hide whole specializations
* Distinguish between prereqs and coreqs; we may also want to distinguish between officially pre/coreq classes and DEN recommendations

Requirements
===========

To generate the graphs, the following are required:
* nodejs for running javascript on the commandline.
* graphviz tools, namely dot
* The data.json file produced by data/prepare.py.

The in-browser layout does not use nodejs or graphviz.

Design Decisions
================

*Original Design Decisions / The web version*:

Because we consider interactivity to be a core goal, this project should be in javascript; for maintainability, it's easiest to have everything in javascript (we have no server to run server-side code).

After evaluating several possible libraries (see the top answer: http://stackoverflow.com/questions/7034/graph-visualization-code-in-javascript), two alternatives seem reasonable: d3, or jsplumb/jquery/etc.  Either way we'll have to write our own layout code, since the graph is a DAG (plenty of tools exist for trees); moreover, d3 has a lot of tutorials, and looks like it will be a more maintainable/sensible choice.  Thus, we'll be implementing everything on top of d3.

Originally, the interactive tree example caught my eye; it might be worth trying to hack the tree code instead of writing our own from the ground up; on the other hand, it might be best to use the tree code as an example.

A bunch of d3 tutorials can be found at https://github.com/mbostock/d3/wiki/Tutorials

When I came back to this project in december, I found the following library had popped up: https://github.com/cpettitt/dagre.  The in-browser version is built on it.

*But the dagre layout sucked.*

Our original intention was for everything to run in a browser, but we've since found that command line tools such as graphviz can do a much better job (although generating static graphs).  The project moved to nodejs so that we wouldn't have to port the code, and additionally, if for some reason we want to use dagre, our code is still compatible - this could make sense if we have an application that renders small graphs on the fly.

The svg format allows many features, such as tooltips and links, which allow for a decent amount of interactivity, though not quite as much as we had hoped for.  It may be possible to build more interactivity on top of the pre-layed-out graphiz generated svg, by manipulating this svg from javascript.

Building & Deploying
======================

Running build.sh rebuilds everything (it's not smart about dependencies - it does extra work, as compared to a makefile).  Note that the scrapers need to be run first, if you want to update the input data - see the readme in the data_scrapers directory.

Deploying new graphs takes several steps:
* copying thegraph-small.svg to the Curriculum Graph page on the wiki (between {html} tags in wiki markup)
* copying thegraph-ee.svg to the EE Curriculum Graph page on the wiki (between {html} tags in wiki markup)
* copying thegraph-compe.svg to the CompE curriculum Graph page on the wiki (between {html} tags in wiki markup)
* uploading thegraph.svg as an attachment to the Curriculum Graph page
* copying tech_electives_by_subfields.txt to the ECE & CS Tech Electives by Subfields page on the wiki - this should replace most the wiki markup of the page, though be careful to not erase the introductory material.

See below section for info about changing / deploying the interactivity support.

Interactivity
==============

Interactivity can be added to the graph via several files:
* graph_interactivity.js is the most important one - it does all the cool effects.
* make_html.sh is used by the build script to generate an html preview of the graph.
* graph.css: the little bit of non-inline css used for interactivity; these rules should be added to the wiki style sheet so they can be used everywhere.
* graph.html: the html preview of the graph, for local development.

Note that the interactivity requires jQuery to work.
