var margin = {top: 200, right: 20, bottom: 200, left: 20},
    width = 415 - margin.right,
    height = 50 - margin.bottom - margin.top;

var x = d3.scale.linear()
    .domain([0, 100])
    .range([0, width])
    .clamp(true);


var brush = d3.svg.brush()
    .x(x)
    .extent([0, 0])
    .on("brush", brushed);

var svg = d3.select("#slider-tree1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height / 2 + ")")
    .call(d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(function(d) { return d + ""; })
      .tickSize(0)
      .tickPadding(12))
  .select(".domain")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "halo");

var slider = svg.append("g")
    .attr("class", "slider")
    .call(brush);

slider.selectAll(".extent,.resize")
    .remove();

slider.select(".background")
    .attr("height", height);

var handle = slider.append("circle")
    .attr("class", "handle")
    .attr("transform", "translate(0," + height / 2 + ")")
    .attr("r", 9);

slider
    .call(brush.event)
  .transition() // gratuitous intro!
    .duration(750)
    .call(brush.extent([0, 0]))
    .call(brush.event);


var fntimeout = null;

function brushed() {
  var value = brush.extent()[0];
    
  if (d3.event.sourceEvent) { // not a programmatic event
    value = x.invert(d3.mouse(this)[0]);
    brush.extent([value, value]);
  }

   
    if(value >= 45){
            
            $('#s3').hide();
            $('#sp2').show();
			$('#sp1').hide();
			$('#s1').hide();
			$('#s2').show();
            $('.progress-bar-latency').css('width', '85%').attr('aria-valuenow', 85);
	       $('.progress-bar-latency').css('background-color', '#E25757');
             fntimeout =  setTimeout(function(){
                
            $('#sp1').show();
            $('#sp2').hide();
            $('#s2').hide();
            $('#s1').hide();
            $('#s3').show();
             $('.progress-bar-latency').css('width', '25%').attr('aria-valuenow', 25);
            $('.progress-bar-latency').css('background-color', '#1B8829');
            },3000);
        
    }
    else if(value < 45){
            
            while (fntimeout > 0) {
                window.clearTimeout(fntimeout); // will do nothing if no timeout with id is present
                fntimeout--;
            }
            
            $('#s3').hide();
            $('#sp1').show();
			$('#sp2').hide();
			$('#s2').hide();
			$('#s1').show();
			if(value>=0 && value<10)
			{
				 $('.progress-bar-latency').css('width', '10%').attr('aria-valuenow', 10);
			}
			else if(value>=10 && value<20)
			{
				 $('.progress-bar-latency').css('width', '25%').attr('aria-valuenow', 25);
			}
			else if(value>=20 && value<30)
			{
				 $('.progress-bar-latency').css('width', '40%').attr('aria-valuenow', 40);
			}
			else if(value>=30 && value<45)
			{
				 $('.progress-bar-latency').css('width', '50%').attr('aria-valuenow', 50);
			}
	       $('.progress-bar-latency').css('background-color', '#1B8829');
	
        
    }
    
    $('.progress-bar-request').css('width', value+'%').attr('aria-valuenow', value);
    
    if(value >= 75){
        $('.axis .domain').addClass('danger');
    }
    else{
        $('.axis .domain').removeClass('danger');   
    }
    
  handle.attr("cx", x(value));
  d3.select("#slider-tree1");//.style("background-color", d3.hsl(value, .8, .8));
}