ALL: thegraph-small.svg thegraph.svg

thegraph.dot thegraph-small.dot: data.js
	node make_dot.js

thegraph.svg: thegraph.dot
	dot -Tsvg thegraph.dot > thegraph.svg

thegraph-small.svg: thegraph-small.dot
	dot -Tsvg thegraph-small.dot > thegraph-small.svg
