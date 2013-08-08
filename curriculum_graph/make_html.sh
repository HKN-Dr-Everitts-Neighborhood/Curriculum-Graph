#! bash

echo '<html><head><style type="text/css">' > output/graph.html
cat graph.css >> output/graph.html
echo '</style></head><body>' >> output/graph.html
cat output/thegraph.svg                 >> output/graph.html

echo '<script type="text/javascript">'  >> output/graph.html
cat jquery-1.10.2.min.js             >> output/graph.html
echo '</script>'                        >> output/graph.html
echo '<script type="text/javascript">'  >> output/graph.html
cat graph_interactivity.js           >> output/graph.html
echo "</script></body></html>"                   >> output/graph.html
