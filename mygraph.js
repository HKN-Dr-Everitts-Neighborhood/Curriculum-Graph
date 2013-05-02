var common = (typeof(require) !== "undefined") ? require('./common.js') : window;

function isEmpty(object) { for(var i in object) { return false; } return true; };

function DAG() {

  // object mapping class names to objects representing those classes.
  this.nodes = {};
  this.edge_list = [];
  this.coreq_list = [];
  
  this.addNode = function(node) {

    var new_node = {name: node.name, children: {}, parents: {}, coreqs: {}, object: node};
    this.nodes[node.name] = new_node;
  };
  
  this.addPrereq = function(node1, node2) {
    
    var n1 = this.nodes[node1];
    var n2 = this.nodes[node2];
    
    if (!n1.children[node2])
      this.edge_list.push([n1, n2]);
    n1.children[node2] = 1;
    n2.parents[node1] = 1;
  };
  
  this.addCoreq = function(node1, node2) {
    
    var n1 = this.nodes[node1];
    var n2 = this.nodes[node2];
    
    if (!n2.coreqs[node1])
      this.coreq_list.push([n1, n2]);
    n2.coreqs[node1] = 1;
  };

  this.is_root = function (node) {
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

  this.find_roots = function() {
    var roots = [];

    for (var node in this.nodes) {
      if (this.is_root(node))
        roots.push(node);
    }
    
    return roots;
  };
  
  this.make_tooltip = function(class_obj) {
    var txt = class_obj.title;
    
    // "same as" text
    txt += common.same_as(class_obj);
    
    /*
    txt += "\nPrereqs:\n";
    for (var i=0; i < class_obj.prereqs.length; i++)
    {
      var len = class_obj.prereqs[i].length;
      for (var j=0; j < len-1; j++)
        txt += class_obj.prereqs[i][j] + " and ";
      txt += class_obj.prereqs[i][len-1] + " OR\n";
    }
    */
    return txt;
  };
  
  this.make_subfield_dot = function(html, include_root, options, color_func, subfield) {
    var classes_to_include = {};
    
    for (var n in this.nodes)
    {
      var node = this.nodes[n];

      if (node.object.subfield == subfield)
      {
        // DFS from here up the prereqs chain
        // classes_to_include = set of visited
        
        var searchlist = [node];
        while (searchlist.length !== 0)
        {
          var cur_node = searchlist.pop();
          
          if (!(cur_node.name in classes_to_include))
          {
            // mark for inclusion
            classes_to_include[cur_node.name] = 1;
            
            // add prereqs to search list
            for (var p in cur_node.parents) {
              searchlist.push(this.nodes[p]);
            }
            
            // add coreqs to search list
            for (var c in cur_node.coreqs) {
              searchlist.push(this.nodes[c]);
            }
          }
        }
      }
    }
    
    return this.make_dot_of_classes(html, include_root, options, color_func, classes_to_include);
  }
  
  this.make_dot = function(html, include_root, options, color_func)
  {
    // include all nodes
    var classes_to_include = {};
    for (var n in this.nodes) {
      classes_to_include[this.nodes[n].name] = 1;
    }
    
    return this.make_dot_of_classes(html, include_root, options, color_func, classes_to_include);
  }
  
  this.make_dot_of_classes = function(html, include_root, options, color_func, classes_to_include)
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
      
      if (node.name in classes_to_include)
      {
        nodes_from_name[node.name] = "a" + i;
        str += "a" + i + " [ ";
        
        if (html)
        {
          str += "label=\"";
          str += "<div style='padding: 10px; width: 95px; text-align:center;'>";
          str += node.name;
          if (node.object.link)
          {
            str += " <span onclick=\\\"event.stopPropagation();\\\">" + 
                   "<a href=\\\"" + node.object.link + "\\\" target=\\\"_blank\\\">" +
                   "<img src=\\\"link-icon.png\\\" /></a></span>";
          }
          str += "</div>\" ";
        }
        else
        {
          str += "label=\"" + node.name + "\" ";

          if (node.object.link) //hide link icon if no link
          {
            str += "href=\"" + node.object.link + "\" ";
          }

          //tooltip
          str += "tooltip=\"" + this.make_tooltip(node.object) + "\" ";
          
          // Make opaque background, so that mouseover background makes tooltip show up
          str += "style=\"filled\" fillcolor=\"white\" ";

          // color the node
          var color = color_func(node);
          if (color)
            str += "penwidth=\"2.0\" color=\"" + color + "\" ";
        }

        str += "];\n";
        i++;
      }
    }

    // put in all prereq edges
    for (var i = 0; i < this.edge_list.length; i++) {
      var start_name = this.edge_list[i][0].name;
      var end_name = this.edge_list[i][1].name;
      
      var start = nodes_from_name[start_name];
      var end = nodes_from_name[end_name];
      if (start && end)
      {
        str += start + " -> " + end;

        if (!html)
          str += " [tooltip=\"" + start_name + " -> " + end_name + "\"]";

        str += ";\n";
      }
    }
    
    // put in all coreq edges
    for (var i = 0; i < this.coreq_list.length; i++) {
      var start_name = this.coreq_list[i][0].name;
      var end_name = this.coreq_list[i][0].name;
      
      var start = nodes_from_name[start_name];
      var end = nodes_from_name[end_name];
      if (start && end)
      {
        str += start + " -> " + end;
        
        if (html)
          str += " [label=\"is a coreq for\"];\n";
        else
          str += " [style=dotted, tooltip=\"" + start+name + " -> " + end_name + "\"];\n";
      }
    }
    
    if (include_root)
    {
      var roots = this.find_roots();
      
      // put in root (later removed)
      for (var i = 0; i < roots.length; i++) {
        if (roots[i] in classes_to_include)
          str += "root -> " + nodes_from_name[roots[i]] + ";\n";
      }
    }
    str += "}";
    
    return str;
  };
}

var makegraph = function(json) {
  
  var g = new DAG();
  var index = {}; // keep a set of class names that we've seen in our json data.

  for (var i = 0; i < json.length; i++) {
    index[json[i].name] = 1;
    g.addNode(json[i]);
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
            g.addPrereq(p[k], json[i].name);
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
            g.addCoreq(c[k], json[i].name);
        else
            console.error("Warning: ignoring coreq " + c[k]);
      }
    }
  }
 
  return g;
};

if (typeof exports !== "undefined")
  exports.makegraph = makegraph;
