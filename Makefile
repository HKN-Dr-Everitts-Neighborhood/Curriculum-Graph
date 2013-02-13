ALL: thegraph.png thegraph.svg

thegraph.dot : data.js
  node make_dot.js > thegraph.dot

thegraph.png : thegraph.dot
	dot -Tpng thegraph.dot > thegraph.png

thegraph.svg : thegraph.dot
	dot -Tsvg thegraph.dot > thegraph.svg
