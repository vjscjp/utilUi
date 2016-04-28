
(function(){
// ************** Generate the tree diagram	 *****************
var margin = {top: 30, right: 0, bottom: 0, left: 0},
	width = 600 - margin.right - margin.left,
	height = 440 - margin.top - margin.bottom;

var colors = ["#FF1493", "#1874CD", "#FF8000", "blue"];
var currentColor = 0;
	
var i = 0,
	duration = 750;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
.projection(function(d) { return [d.x, d.y]; });
	//.projection(function(d) { return [d.y, d.x]; });

d3.select(self.frameElement).style("height", "500px");

var selector = ['#treeOne','#treeTwo','#treeThree'];
/*
initTreeSvg(treeData, selector); // initialize  call, go to data length

function initTreeSvg (treeData, selector){ // wrap code in function to avoid repeat of code
	var i = 0;
	
	for (data of treeData){
		
		//append svg object in selector
		var tree = d3.select(selector[i++]).append("svg")
			.attr("width", width + margin.right + margin.left)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		var root = data;
			root.x0 = height / 2;
			root.y0 = 0;

		update(root,root,tree); // dwar tree nodes
		break;
	}
}
*/
var svg = d3.select('#treeOne').append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var root = treeData[0];
	root.x0 = height / 2;
	root.y0 = 0;

update(root); // dwar tree nodes
		
function update(source) {



  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 120; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  //.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
	  .on("click", click);

	  
  
	  
  nodeEnter.append("circle")
	  .attr("r", 1e-6)
	  .style("fill", function(d) { 
		  if(d.icon){
				return "#fff";
		  }
		  
		  return d._children ? "lightsteelblue" : "#fff"; 
		})
	  .style("stroke", function(d) { 
	  
			if(d.logo || d.icon){
				return "#fff";
			}
	  
			if(typeof d.children == "undefined" ){
				if(currentColor == colors.length) currentColor = 0;
				return colors[currentColor++];
			}
			else{
				return "steelblue";
			}
			
  });
  
  nodeEnter.append("image")
      .attr("xlink:href", function(d) { return d.logo;  })
      .attr("x", "-60px")
      .attr("y", "-20px")
      .attr("width", "120px")
      .attr("height", "40px");
	  
	  
 nodeEnter.append("image")
      .attr("xlink:href", function(d) { return d.icon;  })
      .attr("x", "-13px")
      .attr("y", "-13px")
      .attr("width", "26px")
      .attr("height", "26px");

  nodeEnter.append("text")
	  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	  //.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", 10)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
	  .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0, y: source.y0};
		return diagonal({source: o, target: o});
	  });

  // Transition links to their new position.
  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
		var o = {x: source.x, y: source.y};
		return diagonal({source: o, target: o});
	  })
	  .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
	d.x0 = d.x;
	d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
	d._children = d.children;
	d.children = null;
  } else {
	d.children = d._children;
	d._children = null;
  }
  update(d);
}
})();