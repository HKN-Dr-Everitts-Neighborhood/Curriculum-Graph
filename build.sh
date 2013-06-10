
# builds data.json from raw_data.json and links.json
./data/prepare.py

# creates data.js from data.json
. ./curriculum_graph/makedatajs.sh > ./curriculum_graph/data.js

# makes the files temp/*.dot and from those, temp/*.svg and output/*.svg
# all from data.json
node ./curriculum_graph/make_dot.js

# makes output/tech_electives_by_subfields.txt from temp/*.svg files and data.json
node ./curriculum_graph/techelectives_by_subfield.js
