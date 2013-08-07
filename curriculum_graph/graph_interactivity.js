
var InteractiveGraph = (function() {

    // map node id's (A) to list of ids ([B1, B2, ...]) of nodes where
    // B1 -> A, B2 -> A, ... are all edges in our svg
    var backtrack_map = {};

    var node_map = {}; // maps node id's to the corresponding svg elements
    var edge_map = {}; // maps edge id's to the corresponding svg elements

    /* This function extracts the name of the node or edge that was used
       by the dot.  These names aren't very meaningful, but they are unique
       - i.e. you can use them to figure out which edges and nodes are
       associated. */
    var get_id = function(node) {
        return $(node).find("title")[0].textContent;
    };

    var setup = function() {
        $("g.node").each(function(index) {
            node_map[get_id(this)] = this; //TODO: make this work
        });

        $("g.edge").each(function(index) {
            var edge_id = get_id(this);
            edge_map[edge_id] = this;

            var endpoints = edge_id.split("->");
            if (typeof backtrack_map[endpoints[1]] === "undefined") {
                backtrack_map[endpoints[1]] = []
            }
            backtrack_map[endpoints[1]].push(endpoints[0]);
        });

        $("g.node").on("mouseover", function(e) {bold_incoming.call(this, true, e );});
        $("g.node").on("mouseout", function(e) {bold_incoming.call(this, false, e);});
        $("g.edge").on("mouseover", function(e) {bold_edge.call(this, true);});
        $("g.edge").on("mouseout", function(e) {bold_edge.call(this, false);});
    };

    var bold_incoming = function(bold, event) {
        // this function is essentially a reverse-DFS
        var visited = {};
        var stack = [get_id(this)];
        
        while (stack.length !== 0) {
            var current = stack.pop();
            if (!(current in visited)) {
                visited[current] = 1;

                // change stroke for nodes
                $(node_map[current]).find("ellipse")
                    .css("stroke-width", bold ? "4" : "");

                // loop over incoming edges, follow them in reverse
                if (backtrack_map[current]) {
                    for (var i = 0; i < backtrack_map[current].length; i++) {

                        // change the edge stroke
                        var edge = edge_map[backtrack_map[current][i] + "->" + current];
                        $(edge).css("stroke-width", bold ? "3" : "");
                        bold_edge.call(edge, bold);

                        // follow it (backwards)!
                        stack.push(backtrack_map[current][i]);
                    }
                }
            }
        }
    }

    var bold_edge = function(bold) {

        var path = $(this).find("path");
        if (path.css("stroke-dasharray") !== "none") {
            if (bold)
                path.css("stroke-dasharray", 5);
            else
                path.css("stroke-dasharray", "");
        }
    };

    $(document).ready(setup);
})();
