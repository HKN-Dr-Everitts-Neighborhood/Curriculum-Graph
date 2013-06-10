Corporate Survey
==================

This folder contains scripts used for the Engineering Industry Prospectus section of the wiki.

Use
=====

The format_corporate_survey.py script takes one argument: the path to the csv file of the survey results.  When run, it spits out all the results in the output folder.  index.txt is wiki-markup for the table of contents of the section; reponse0.txt, response1.txt, etc. are markdown generated from each response to the survey, intended to be posted as separate pages.

Dependencies
==============

format_corporate_data.py requires python 2.7 (3.0+ may work, but hasn't been tested; it requires the unidecode package, which can easily be installed with pip.
