function isEmpty(object) { for(var i in object) { return false; } return true; };

function DAG() {

  this.nodes = {};
  this.edge_list = [];
  this.coreq_list = [];
  
  this.addNode = function(node) {

    var new_node = {name: node.name, children: {}, parents: {}, coreqs: {}, object: node};
    this.nodes[node.name] = new_node;
    return node.name;
  };
  
  this.addPrereq = function(node1, node2) {
    if (!this.nodes[node1].children[node2])
      this.edge_list.push([node1, node2]);
    this.nodes[node1].children[node2] = 1;
    this.nodes[node2].parents[node1] = 1;
  };
  
  this.addCoreq = function(node1, node2) {
    if (!this.nodes[node2].coreqs[node1])
      this.coreq_list.push([node1, node2]);
    this.nodes[node2].coreqs[node1] = 1;
  };

  this.is_root = function (node){
    var no_prereqs = isEmpty(this.nodes[node].parents);
    
    if (!no_prereqs)
      return false;
    
    var coreqs_are_roots = true;
    for (var c in this.nodes[node].coreqs)
    {
      coreqs_are_roots = coreqs_are_roots && this.is_root(c);
    }
    
    return coreqs_are_roots;
  };

  this.find_roots = function()
  {
    var roots = [];

    for (var node in this.nodes) {
      if (this.is_root(node))
        roots.push(node);
    }
    
    return roots;
  };
  
  var color_map = {
    "ECE tech elective": "blue",
    "ECE tech elective / lab": "blue",
    "CS tech elective": "cyan",
    "required": "red"
  };
  
  this.make_dot = function(html, include_root, options)
  {
    nodes_from_name = {};

    var str = "digraph ";
    if (!html)
      str += "\"\""; // empty string makes sure the graph has no title; otherwise _anonymous_0 will show up as a tooltip for the graph

    str += " {\n";
    
    for (var k in options)
      str += k + "=" + options[k] + ";\n";
    
    var i = 0;
    for (var n in this.nodes) {
      var node = this.nodes[n];
      nodes_from_name[node.name] = "a" + i;
      str += "a" + i + " [ label=\"";
      
      if (html)
        str += "<div style='padding: 10px; width: 95px; text-align:center;'>";
      
      str += node.name;
      if (node.object.link) //hide link icon if no link
      {
        if (html)
        {
          str += " <span onclick=\\\"event.stopPropagation();\\\"><a href=\\\"" +
              node.object.link +
              "\\\" target=\\\"_blank\\\"><img src=\\\"link-icon.png\\\" /></a></span>";
        }
        else
        {
          str += "\" href=\"" + node.object.link;
        }
      }
      if (html)
        str += "</div>";
      else if (node.object.title)
        str += "\" tooltip=\"" + node.object.title + "\" style=\"filled\" fillcolor=\"white";

      if (!html)
      {
        var color = undefined;
        // Color code by type
        if (node.object.type)
        {
          if (node.object.type in color_map)
          {
            color = color_map[node.object.type];
          }
        }
        else if (node.object.cetype === "required" || node.object.eetype === "required")
        {
          color = "orange";
        }
        else if (node.object.eetype === "3of5")
        {
          color = "green";
        }

        if (color)
          str += "\" penwidth=\"2.0\" color=\"" + color;
      }
      
      str += "\" ];\n";
      i++;
    }

    // put in all prereq edges
    for (var i = 0; i < this.edge_list.length; i++) {
      str += nodes_from_name[this.edge_list[i][0]] + " -> " + nodes_from_name[this.edge_list[i][1]];

      if (!html)
        str += " [tooltip=\"" + this.edge_list[i][0] + " -> " + this.edge_list[i][1] + "\"]";

      str += ";\n";
    }
    
    // put in all coreq edges
    for (var i = 0; i < this.coreq_list.length; i++) {
      str += nodes_from_name[this.coreq_list[i][0]] + " -> " + nodes_from_name[this.coreq_list[i][1]];
      
      if (html)
        str += " [label=\"is a coreq for\"];\n";
      else
        str += " [style=dotted, tooltip=\"" + this.coreq_list[i][0] + " -> " + this.coreq_list[i][1] + "\"];\n";
    }
    
    if (include_root)
    {
      var roots = this.find_roots();
      
      // put in root (later removed)
      for (var i = 0; i < roots.length; i++) {
        str += "root -> " + nodes_from_name[roots[i]] + ";\n";
      }
    }
    str += "}";
    
    return str;
  };
}

var makegraph = function(json) {
  
  var g = new DAG();
  var index = {};

  for (var i = 0; i < json.length; i++) {
    index[json[i].name] = json[i];
    json[i].node = g.addNode(json[i]);
  }

  for (var i = 0; i < json.length; i++)
  {
    // handle prereqs
    for (var j = 0; j < json[i].prereqs.length; j++)
    {
      var p = json[i].prereqs[j];
      for (var k = 0; k < p.length; k++)
      {
        // ignore prereqs not in our dataset
        if (p[k] in index)
            g.addPrereq(index[p[k]].node, json[i].node);
        else
            console.error("Warning: ignoring prereq " + p[k]);
      }
    }
    
    // handle coreqs
    for (var j = 0; j < json[i].coreqs.length; j++)
    {
      var c = json[i].coreqs[j];
      for (var k = 0; k < c.length; k++)
      {
        // ignore coreqs not in our dataset
        if (c[k] in index)
            g.addCoreq(index[c[k]].node, json[i].node);
        else
            console.error("Warning: ignoring coreq " + c[k]);
      }
    }
  }
 
  return g;
};

if (typeof exports !== "undefined")
  exports.makegraph = makegraph;
