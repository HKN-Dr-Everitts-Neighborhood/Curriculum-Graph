echo '<html><head><link rel="stylesheet" type="text/css" href="../graph.css" /></head><body>' > output/graph.html
cat output/thegraph-small.svg >> output/graph.html

echo '<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>' >> output/graph.html
echo '<script type="text/javascript" src="../graph_interactivity.js"></script>' >> output/graph.html
echo "</body></html>" >> output/graph.html
