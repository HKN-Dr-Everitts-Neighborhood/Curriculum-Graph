ALL: thegraph-small.svg thegraph.svg thegraph-ee.svg thegraph-compe.svg

data.js: data.json makedatajs.sh
	. ./makedatajs.sj > data.js

thegraph.dot thegraph-small.dot thegraph-ee.dot thegraph-compe.dot thegraph.svg thegraph-small.svg thegraph-ee.svg thegraph-compe.svg: data.js
	node make_dot.js

