ALL: thegraph-small.svg thegraph.svg thegraph-ee.svg thegraph-compe.svg

data.js: data.json makedatajs.sh
	. ./makedatajs.sj > data.js

thegraph.dot thegraph-small.dot thegraph-ee.dot thegraph-compe.dot: data.js
	node make_dot.js

thegraph.svg: thegraph.dot
	dot -Tsvg thegraph.dot > thegraph.svg

thegraph-small.svg: thegraph-small.dot
	dot -Tsvg thegraph-small.dot > thegraph-small.svg

thegraph-ee.svg: thegraph-ee.dot
	dot -Tsvg thegraph-ee.dot > thegraph-ee.svg

thegraph-compe.svg: thegraph-compe.dot
	dot -Tsvg thegraph-compe.dot > thegraph-compe.svg
