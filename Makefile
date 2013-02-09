ALL: thegraph.png thegraph.svg

thegraph.png : thegraph.dot
	dot -Tpng thegraph.dot > thegraph.png

thegraph.svg : thegraph.dot
	dot -Tsvg thegraph.dot > thegraph.svg
