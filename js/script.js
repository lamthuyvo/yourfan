$( document ).ready(function() {

	var windowWidth,
		windowHeight;

	var siteParams ={
		setWindowHeight: function(){
			windowHeight = $(window).innerHeight();
			return windowHeight;
		}, 
		setWindowWidth: function(){
			var windowWidth = $(window).innerWidth();
			return windowWidth;
		}
	};

	var windowWidth = siteParams.setWindowWidth();
	var windowHeight = siteParams.setWindowHeight();

	$('.panel').height(windowHeight);
	var introheight = $('#intro').height();
	$('#intro').css("margin-top", (windowHeight-introheight)/2)

	var numberFormat = {
		d3TimeFormat: function(data){
			var parseYear = d3.time.format("%Y").parse;
			return parseYear(data)
		},
	    rounded: function(value, decimals) {
        	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    	},
	    thousands: function(x) {
    		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
	    percent: function(val) {
	        return numberFormat.rounded(val * 100, 0).toFixed(0) + "%";
	    },
	    wordlegend: function(val) {

	        var str;
	        if (val >= 1000000000) {
	            string = numberFormat.rounded(val / 1000000000, 2).toFixed(2) + " billion";
	        } else if (val >= 1000000 && val < 1000000000) {
	            string = numberFormat.rounded(val / 1000000, 2).toFixed(2) + " million";
	        } else {
	            string = numberFormat.commas(val);
	        }

	        return string;
	    }
	};


	// SUPERNATURAL VS EVERYONE ELSE - BAR CHART

	// for responsive annotation
    var xValueAnnotation;
    if (windowWidth > 1000){
        xValueAnnotation = 55;
    } else if(windowWidth<1000 && windowWidth > 480){
    	xValueAnnotation = 40;
    } else if (windowWidth < 480) {
        xValueAnnotation = 28;
    }

	// make chart

    $('#chart-container').highcharts({
        chart: {
            type: 'bar'
        },
        credits: {
            enabled: false
        },
        exporting: { enabled: false } ,
        title: {
            text: '',
            style:{
                color: '#5e5e5e',
                align: 'center',
                font:"normal 14px 'Vollkorn',Georgia, serif"
            }
        },
        legend:{
          itemStyle: {
            color: '#5e5e5e',
            align: 'center',
            font:"normal 13px 'Vollkorn',Georgia, serif"
          }
        
        },
        xAxis: {
              categories: ['Supernatural','Harry Potter','Sherlock','Teen Wolf','Avengers','One Direction','Homestuck','Doctor Who','Star Trek','Dragon Age','Capt. America','Glee','Attack on Titan ','Merlin','OUAT','BtVS','The Hobbit','LOTR','Hetalia','Transformers','ASOIAF','Naruto','S.H.I.E.L.D.','Batman','Haikyuu!!','Kuroko no Basuke','SPN RPF','Free!','RT/AH RPF ','MCR','Hockey RPF','Hannibal','The 100','Arrow','Hawaii 5-0','Criminal Minds','Mass Effect','Percy Jackson','Football RPF','Walking Dead','NCIS','Bleach','5SOS','Shameless','Vampire Diaries','Fall Out Boy','Legend of Korra','BTS ','EXO','Gravity Falls ','Person of Interest','Carmilla','Phandom','Tokyo Ghoul ','The Flash','Kingsman','Undertale','Fairy Tail','Daredevil','The Musketeers (2014)','Steven Universe','Agent Carter','Mad Max (Movies)','Man from U.N.C.L.E.'],
            labels: {
                    style: {
                        color: '#5e5e5e',
                        align: 'center',
                        font: "normal 13px 'Vollkorn',Georgia, serif"
                    }
                }
        },
        yAxis: {
            min: 0,
            max: 125000, 
            title:'',
            labels: {
                    style: {
                        color: '#5e5e5e',
                        align: 'center',
                        font: "normal 13px 'Vollkorn',Georgia, serif"
                    }
                }
        },
        // ANNOTATIONS

        annotationsOptions: {
            enabledButtons: false   
        },
        annotations: [{
            title: {
                text: '<span style="font-family:"Vollkorn",Georgia, serif;">Yowsers!?!</span>',
                style: {
                    font: "normal 13px 'Vollkorn',Georgia, serif",
                    align: "center",
                    color: '#3f4245'
                    }
                },
            anchorX: "left",
            anchorY: "top",
            allowDragY: false,
            allowDragX: false,
            xValue: xValueAnnotation,
            y: 60,
            shape: {
                type: 'path',
                params: {
                    d: ['M',25, -35, 'L',25, 0],
                    stroke: '#ccc',
                    strokeWidth: 0.5
                }
            }
        }],
         
        tooltip: {
            pointFormat: '<span style="font:normal  12px \'Vollkorn\',Georgia, serif; color:#5e5e5e;"> {point.y:f} works</span>'
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },

        series: [{
            name: 'Number of fan fiction works produced',
            color:'#f563f1',
            data:[
              123335,88612,80562,70061,63636,45006,37293,34927,32529,31688,28459,27821,26580,24209,23885,22039,19700,16885,16801,15688,14779,14654,14399,13756,13555,12282,11858,11656,10718,10483,10258,10167,10143,9811,9337,8965,8838,8759,8391,8090,7624,7466,7039,6973,6376,5737,5702,5266,5202,4733,4678,4611,4492,3959,3845,3841,3193,3104,3095,2951,2744,2567,1548,1122
            
            ]
        
        }]
    });
	


	// PERCENTAGE CHART 

	// d3 params
	var width = $('#percentage-container').width(),
    	height = 350;


	var nodes = d3.range(301).map(function() { return {radius: 5}; }),
	    root = nodes[0];

	root.radius = 0;
	root.fixed = true;

	var force = d3.layout.force()
	    .gravity(0.09)
	    .charge(function(d, i) { return i ? 0 : -2000; })
	    .nodes(nodes)
	    .size([width, height]);


	// init chart

	force.start();

	var svg = d3.select("#percentage-container").append("svg")
	    .attr("width", width)
	    .attr("height", height);

	svg.selectAll("circle")
	    .data(nodes.slice(1))
	  .enter().append("circle")
	    .attr("r", function(d) { return d.radius; })
	    .attr("class", function(d, i) { 
	    		if (i < 234){
	    			return 'female'; 
	    		} else{
	    			return 'male'; 
	    		}			
	});

	// event handlers for movements, etc. 

	force.on("tick", function(e) {
	  var q = d3.geom.quadtree(nodes),
	      i = 0,
	      n = nodes.length;

	  while (++i < n) q.visit(collide(nodes[i]));

	  svg.selectAll("circle")
	      .attr("cx", function(d) { return d.x; })
	      .attr("cy", function(d) { return d.y; });
	});

	svg.on("mousemove", function() {
	  var p1 = d3.mouse(this);
	  root.px = p1[0];
	  root.py = p1[1];
	  force.resume();
	});

	function collide(node) {
	  var r = node.radius + 16,
	      nx1 = node.x - r,
	      nx2 = node.x + r,
	      ny1 = node.y - r,
	      ny2 = node.y + r;
	  return function(quad, x1, y1, x2, y2) {
	    if (quad.point && (quad.point !== node)) {
	      var x = node.x - quad.point.x,
	          y = node.y - quad.point.y,
	          l = Math.sqrt(x * x + y * y),
	          r = node.radius + quad.point.radius;
	      if (l < r) {
	        l = (l - r) / l * .5;
	        node.x -= x *= l;
	        node.y -= y *= l;
	        quad.point.x += x;
	        quad.point.y += y;
	      }
	    }
	    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
	  };
	}


	


	// BUBBLE CHART

	//set global-ish variables
	var marginBubblegrid = {
		top:30,
		right:30,
		bottom:30,
		left:30
	},
	widthBubblegrid = $('#entrychart').width(),
	heightBubblegrid = windowHeight - $('#chartinfo').height() - 25,
	visContainer = $('#entrychart').width(),
	svgbubbles;


	// grid layout variables
	var numInRow, 
		rows, 
		gap;

	

	// make bubble grid object

	var bubbleGrid ={
		params: function(){

			numInRow = 26;
			rows = 26;
			gap= 3;
			
		},
		init: function(){
			bubbleGrid.params();

			svgbubbles = d3.select('#entrychart')
							.append('svg')
								.attr('width',widthBubblegrid)
								.attr('height',heightBubblegrid)
								.attr('class', "svg");
							

			bubbleGrid.update();
		}, 
		update: function (){
		// make circles
		svgbubbles.selectAll("circle")
		   .data(entriesData)
		   .enter()
			   .append("circle")
			   .on("mouseover", function(d) {
					var tooltip = d3.select("body")
						.append("div")
						.attr("class", "tooltip");
		      		tooltip.html('<div class="footnote"> '+ d.commentCount + " comments were exchanged on Hans Bekhart's live journal post from " +d.dateOnly +
		      			'.</div>')
		            tooltip.style("opacity", 1)
		                .style("position", "absolute");
		            if (d3.event.pageX > (width/2)){
		        		tooltip.style("left", (d3.event.pageX) -150 + "px")		
	        			.style("top", (d3.event.pageY) + "px")
	        			.append("rect");
		            }else{
	   	
		            	tooltip.style("left", (d3.event.pageX)+ "px")		
	        			.style("top", (d3.event.pageY) + "px")
	        			
		            }  	
			   
				})				
				.on("mouseout", function(d) {

					d3.selectAll('.tooltip').remove();
					 
				})
			   .attr("cx", function(d, i) {
			   		
			   			return ((widthBubblegrid/27) * (d.forxposition -1)) + ((widthBubblegrid/27));
	
	
			   })
			   .attr("cy", function(d, i) {
			   		return ((heightBubblegrid/27) * (d.foryposition-1)) + 10 ;


			   		
			   })
			   .attr("class", function(d){ return "entrybubble"})
			    .attr("r", 0)
				   	.transition()
				   	.duration(1000)
				.attr("opacity",  function(d){
		 	   		return 0.75
				});
		}

	}

	bubbleGrid.init();


	// waypoint to expand grid

	$('#bubbleGridIntro').waypoint(function(direction) {

		  	if (direction === 'down') {
		  		
		  		d3.selectAll('.entrybubble')
		  			.transition()
		  			.duration(1000)
		  			.delay(function(d, i) { return i * 2; })
		  			.attr("r", function(d){return Math.sqrt(d.commentCount / Math.PI) *3;
					});
	
		  	} else if (direction === 'up'){
		  		
		  	}
		}, {
		  	offset: '0px'
	});

	 
	// BAR OVER TIME OF COMMENTS (highchart 2)
	$('#commentschart').height(500);

	$('#commentschart').highcharts({
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false
        },
        exporting: { enabled: false } ,
        title: {
            text: '',
            style:{
                color: '#5e5e5e',
                align: 'center',
                font:"normal 14px 'Vollkorn',Georgia, serif"
            }
        },
        legend:{
          itemStyle: {
            color: '#5e5e5e',
            align: 'center',
            font:"normal 13px 'Vollkorn',Georgia, serif"
          }
        
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { 
                year: '20%y'
            },
            labels: {
                    style: {
                        color: '#5e5e5e',
                        align: 'center',
                        font: "normal 13px 'Vollkorn',Georgia, serif"
                    }
                }
        },
        yAxis: {
            min: 0,
            title:'',
            labels: {
                    style: {
                        color: '#5e5e5e',
                        align: 'center',
                        font: "normal 13px 'Vollkorn',Georgia, serif"
                    }
                }
        },
         
        tooltip: {
            headerFormat: '<span style="font: bold 12px \'Vollkorn\',Georgia, serif; color:#5e5e5e;">Number of comments</span><br>',
            pointFormat: '<span style="font:normal  12px \'Vollkorn\',Georgia, serif; color:#5e5e5e;">{point.x:%b %e,  20%y}: {point.y:f} comments</span>'

            // {series.name}
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
        // ANNOTATIONS

        annotationsOptions: {
            enabledButtons: false   
        },
        annotations: [{
            title: {
                text: '<span style="font-family:"Vollkorn",Georgia, serif;">When she stopped </span>',
                style: {
                    font: "normal 13px 'Vollkorn',Georgia, serif",
                    align: "center",
                    color: '#3f4245'
                    }
                },
            anchorX: "left",
            anchorY: "top",
            allowDragY: true,
            allowDragX: true,
            xValue: 0,
            y: 100,
            shape: {
                type: 'path',
                params: {
                    d: ['M',25, -35, 'L',25, 0],
                    stroke: '#ccc',
                    strokeWidth: 0.5
                }
            }
        }],

        series: [{
            name: 'Number of comments exchanged between Hans Bekhart and her community',
            color:'#b84ab4',
            data:[
                [Date.UTC(2005, 7,16),	6	]	,
				[Date.UTC(2005, 7,18),	5	]	,
				[Date.UTC(2005, 7,24),	5	]	,
				[Date.UTC(2005, 7,28),	7	]	,
				[Date.UTC(2005, 7,29),	3	]	,
				[Date.UTC(2005, 7,30),	12	]	,
				[Date.UTC(2005, 8,1),	8	]	,
				[Date.UTC(2005, 8,2),	15	]	,
				[Date.UTC(2005, 8,4),	6	]	,
				[Date.UTC(2005, 8,5),	5	]	,
				[Date.UTC(2005, 8,6),	2	]	,
				[Date.UTC(2005, 8,8),	27	]	,
				[Date.UTC(2005, 8,9),	15	]	,
				[Date.UTC(2005, 8,10),	4	]	,
				[Date.UTC(2005, 8,11),	4	]	,
				[Date.UTC(2005, 8,16),	14	]	,
				[Date.UTC(2005, 8,17),	14	]	,
				[Date.UTC(2005, 8,18),	22	]	,
				[Date.UTC(2005, 8,19),	12	]	,
				[Date.UTC(2005, 8,24),	4	]	,
				[Date.UTC(2005, 8,26),	2	]	,
				[Date.UTC(2005, 8,29),	19	]	,
				[Date.UTC(2005, 8,31),	4	]	,
				[Date.UTC(2005, 9,5),	7	]	,
				[Date.UTC(2005, 9,6),	8	]	,
				[Date.UTC(2005, 9,9),	6	]	,
				[Date.UTC(2005, 9,12),	0	]	,
				[Date.UTC(2005, 9,14),	15	]	,
				[Date.UTC(2005, 9,19),	18	]	,
				[Date.UTC(2005, 9,20),	9	]	,
				[Date.UTC(2005, 9,21),	0	]	,
				[Date.UTC(2005, 9,23),	8	]	,
				[Date.UTC(2005, 9,29),	0	]	,
				[Date.UTC(2005, 10,11),	4	]	,
				[Date.UTC(2005, 10,14),	11	]	,
				[Date.UTC(2005, 10,16),	8	]	,
				[Date.UTC(2005, 10,18),	15	]	,
				[Date.UTC(2005, 10,19),	27	]	,
				[Date.UTC(2005, 10,23),	17	]	,
				[Date.UTC(2005, 10,24),	4	]	,
				[Date.UTC(2005, 10,25),	11	]	,
				[Date.UTC(2005, 10,26),	14	]	,
				[Date.UTC(2005, 10,27),	4	]	,
				[Date.UTC(2005, 10,31),	19	]	,
				[Date.UTC(2005, 11,1),	11	]	,
				[Date.UTC(2005, 11,3),	7	]	,
				[Date.UTC(2005, 11,4),	2	]	,
				[Date.UTC(2005, 11,8),	19	]	,
				[Date.UTC(2005, 11,9),	7	]	,
				[Date.UTC(2005, 11,10),	9	]	,
				[Date.UTC(2005, 11,11),	3	]	,
				[Date.UTC(2005, 11,12),	12	]	,
				[Date.UTC(2005, 11,13),	6	]	,
				[Date.UTC(2005, 11,15),	2	]	,
				[Date.UTC(2005, 11,16),	5	]	,
				[Date.UTC(2005, 11,17),	5	]	,
				[Date.UTC(2005, 11,18),	10	]	,
				[Date.UTC(2005, 11,22),	46	]	,
				[Date.UTC(2005, 11,25),	3	]	,
				[Date.UTC(2005, 11,27),	8	]	,
				[Date.UTC(2005, 11,28),	9	]	,
				[Date.UTC(2005, 11,29),	42	]	,
				[Date.UTC(2005, 12,1),	30	]	,
				[Date.UTC(2005, 12,2),	15	]	,
				[Date.UTC(2005, 12,3),	2	]	,
				[Date.UTC(2005, 12,5),	2	]	,
				[Date.UTC(2005, 12,6),	12	]	,
				[Date.UTC(2005, 12,7),	27	]	,
				[Date.UTC(2005, 12,9),	70	]	,
				[Date.UTC(2005, 12,12),	4	]	,
				[Date.UTC(2005, 12,13),	8	]	,
				[Date.UTC(2005, 12,16),	25	]	,
				[Date.UTC(2005, 12,20),	9	]	,
				[Date.UTC(2005, 12,23),	3	]	,
				[Date.UTC(2005, 12,26),	0	]	,
				[Date.UTC(2005, 12,27),	6	]	,
				[Date.UTC(2005, 12,28),	5	]	,
				[Date.UTC(2005, 12,29),	2	]	,
				[Date.UTC(2005, 12,30),	16	]	,
				[Date.UTC(2006, 1,3),	10	]	,
				[Date.UTC(2006, 1,4),	2	]	,
				[Date.UTC(2006, 1,5),	20	]	,
				[Date.UTC(2006, 1,9),	14	]	,
				[Date.UTC(2006, 1,11),	10	]	,
				[Date.UTC(2006, 1,12),	16	]	,
				[Date.UTC(2006, 1,14),	8	]	,
				[Date.UTC(2006, 1,15),	9	]	,
				[Date.UTC(2006, 1,16),	33	]	,
				[Date.UTC(2006, 1,18),	0	]	,
				[Date.UTC(2006, 1,19),	2	]	,
				[Date.UTC(2006, 1,20),	11	]	,
				[Date.UTC(2006, 1,21),	6	]	,
				[Date.UTC(2006, 1,22),	20	]	,
				[Date.UTC(2006, 1,23),	0	]	,
				[Date.UTC(2006, 1,26),	14	]	,
				[Date.UTC(2006, 1,27),	7	]	,
				[Date.UTC(2006, 1,29),	12	]	,
				[Date.UTC(2006, 1,30),	37	]	,
				[Date.UTC(2006, 1,31),	11	]	,
				[Date.UTC(2006, 2,1),	10	]	,
				[Date.UTC(2006, 2,2),	13	]	,
				[Date.UTC(2006, 2,3),	28	]	,
				[Date.UTC(2006, 2,7),	8	]	,
				[Date.UTC(2006, 2,9),	10	]	,
				[Date.UTC(2006, 2,13),	31	]	,
				[Date.UTC(2006, 2,14),	13	]	,
				[Date.UTC(2006, 2,17),	23	]	,
				[Date.UTC(2006, 2,18),	19	]	,
				[Date.UTC(2006, 2,19),	5	]	,
				[Date.UTC(2006, 2,20),	2	]	,
				[Date.UTC(2006, 2,21),	7	]	,
				[Date.UTC(2006, 2,27),	23	]	,
				[Date.UTC(2006, 2,28),	10	]	,
				[Date.UTC(2006, 3,1),	10	]	,
				[Date.UTC(2006, 3,2),	16	]	,
				[Date.UTC(2006, 3,3),	6	]	,
				[Date.UTC(2006, 3,5),	8	]	,
				[Date.UTC(2006, 3,6),	17	]	,
				[Date.UTC(2006, 3,8),	21	]	,
				[Date.UTC(2006, 3,10),	8	]	,
				[Date.UTC(2006, 3,11),	15	]	,
				[Date.UTC(2006, 3,12),	4	]	,
				[Date.UTC(2006, 3,13),	22	]	,
				[Date.UTC(2006, 3,15),	4	]	,
				[Date.UTC(2006, 3,21),	24	]	,
				[Date.UTC(2006, 3,24),	4	]	,
				[Date.UTC(2006, 3,25),	33	]	,
				[Date.UTC(2006, 3,30),	6	]	,
				[Date.UTC(2006, 4,4),	13	]	,
				[Date.UTC(2006, 4,7),	8	]	,
				[Date.UTC(2006, 4,8),	19	]	,
				[Date.UTC(2006, 4,9),	10	]	,
				[Date.UTC(2006, 4,10),	14	]	,
				[Date.UTC(2006, 4,13),	8	]	,
				[Date.UTC(2006, 4,15),	4	]	,
				[Date.UTC(2006, 4,17),	2	]	,
				[Date.UTC(2006, 4,23),	5	]	,
				[Date.UTC(2006, 4,26),	45	]	,
				[Date.UTC(2006, 4,27),	12	]	,
				[Date.UTC(2006, 4,30),	20	]	,
				[Date.UTC(2006, 5,1),	14	]	,
				[Date.UTC(2006, 5,5),	11	]	,
				[Date.UTC(2006, 5,6),	4	]	,
				[Date.UTC(2006, 5,8),	7	]	,
				[Date.UTC(2006, 5,11),	8	]	,
				[Date.UTC(2006, 5,15),	10	]	,
				[Date.UTC(2006, 5,19),	14	]	,
				[Date.UTC(2006, 5,24),	6	]	,
				[Date.UTC(2006, 5,27),	10	]	,
				[Date.UTC(2006, 5,30),	12	]	,
				[Date.UTC(2006, 6,2),	3	]	,
				[Date.UTC(2006, 6,3),	70	]	,
				[Date.UTC(2006, 6,5),	32	]	,
				[Date.UTC(2006, 6,7),	77	]	,
				[Date.UTC(2006, 6,8),	8	]	,
				[Date.UTC(2006, 6,9),	2	]	,
				[Date.UTC(2006, 6,11),	5	]	,
				[Date.UTC(2006, 6,14),	19	]	,
				[Date.UTC(2006, 6,16),	16	]	,
				[Date.UTC(2006, 6,20),	7	]	,
				[Date.UTC(2006, 6,21),	32	]	,
				[Date.UTC(2006, 6,23),	22	]	,
				[Date.UTC(2006, 6,25),	7	]	,
				[Date.UTC(2006, 6,27),	4	]	,
				[Date.UTC(2006, 6,28),	16	]	,
				[Date.UTC(2006, 7,8),	20	]	,
				[Date.UTC(2006, 7,12),	14	]	,
				[Date.UTC(2006, 7,14),	10	]	,
				[Date.UTC(2006, 7,16),	6	]	,
				[Date.UTC(2006, 7,23),	14	]	,
				[Date.UTC(2006, 7,24),	16	]	,
				[Date.UTC(2006, 7,25),	4	]	,
				[Date.UTC(2006, 7,31),	5	]	,
				[Date.UTC(2006, 8,1),	7	]	,
				[Date.UTC(2006, 8,4),	15	]	,
				[Date.UTC(2006, 8,5),	9	]	,
				[Date.UTC(2006, 8,9),	7	]	,
				[Date.UTC(2006, 8,10),	8	]	,
				[Date.UTC(2006, 8,11),	10	]	,
				[Date.UTC(2006, 8,22),	3	]	,
				[Date.UTC(2006, 8,23),	13	]	,
				[Date.UTC(2006, 8,24),	9	]	,
				[Date.UTC(2006, 8,27),	17	]	,
				[Date.UTC(2006, 8,30),	8	]	,
				[Date.UTC(2006, 9,4),	19	]	,
				[Date.UTC(2006, 9,7),	8	]	,
				[Date.UTC(2006, 9,8),	147	]	,
				[Date.UTC(2006, 9,11),	51	]	,
				[Date.UTC(2006, 9,14),	4	]	,
				[Date.UTC(2006, 9,15),	7	]	,
				[Date.UTC(2006, 9,20),	35	]	,
				[Date.UTC(2006, 9,21),	168	]	,
				[Date.UTC(2006, 9,22),	176	]	,
				[Date.UTC(2006, 9,24),	9	]	,
				[Date.UTC(2006, 9,26),	6	]	,
				[Date.UTC(2006, 9,27),	18	]	,
				[Date.UTC(2006, 9,29),	14	]	,
				[Date.UTC(2006, 10,3),	42	]	,
				[Date.UTC(2006, 10,6),	2	]	,
				[Date.UTC(2006, 10,9),	62	]	,
				[Date.UTC(2006, 10,10),	18	]	,
				[Date.UTC(2006, 10,13),	2	]	,
				[Date.UTC(2006, 10,18),	2	]	,
				[Date.UTC(2006, 10,23),	18	]	,
				[Date.UTC(2006, 10,24),	35	]	,
				[Date.UTC(2006, 10,27),	71	]	,
				[Date.UTC(2006, 10,29),	22	]	,
				[Date.UTC(2006, 11,2),	3	]	,
				[Date.UTC(2006, 11,5),	7	]	,
				[Date.UTC(2006, 11,6),	12	]	,
				[Date.UTC(2006, 11,7),	13	]	,
				[Date.UTC(2006, 11,9),	86	]	,
				[Date.UTC(2006, 11,10),	8	]	,
				[Date.UTC(2006, 11,12),	39	]	,
				[Date.UTC(2006, 11,13),	48	]	,
				[Date.UTC(2006, 11,14),	9	]	,
				[Date.UTC(2006, 11,15),	14	]	,
				[Date.UTC(2006, 11,16),	23	]	,
				[Date.UTC(2006, 11,17),	9	]	,
				[Date.UTC(2006, 11,19),	28	]	,
				[Date.UTC(2006, 11,20),	12	]	,
				[Date.UTC(2006, 11,29),	10	]	,
				[Date.UTC(2006, 12,15),	197	]	,
				[Date.UTC(2006, 12,16),	6	]	,
				[Date.UTC(2006, 12,20),	2	]	,
				[Date.UTC(2006, 12,23),	4	]	,
				[Date.UTC(2006, 12,31),	8	]	,
				[Date.UTC(2007, 1,3),	20	]	,
				[Date.UTC(2007, 1,5),	12	]	,
				[Date.UTC(2007, 1,7),	11	]	,
				[Date.UTC(2007, 1,9),	5	]	,
				[Date.UTC(2007, 1,10),	32	]	,
				[Date.UTC(2007, 1,11),	14	]	,
				[Date.UTC(2007, 1,15),	2	]	,
				[Date.UTC(2007, 1,16),	130	]	,
				[Date.UTC(2007, 1,17),	26	]	,
				[Date.UTC(2007, 1,21),	8	]	,
				[Date.UTC(2007, 1,22),	18	]	,
				[Date.UTC(2007, 1,23),	11	]	,
				[Date.UTC(2007, 1,25),	47	]	,
				[Date.UTC(2007, 1,26),	12	]	,
				[Date.UTC(2007, 1,27),	6	]	,
				[Date.UTC(2007, 1,28),	24	]	,
				[Date.UTC(2007, 1,29),	204	]	,
				[Date.UTC(2007, 1,31),	4	]	,
				[Date.UTC(2007, 2,1),	33	]	,
				[Date.UTC(2007, 2,2),	38	]	,
				[Date.UTC(2007, 2,4),	28	]	,
				[Date.UTC(2007, 2,5),	14	]	,
				[Date.UTC(2007, 2,6),	4	]	,
				[Date.UTC(2007, 2,7),	25	]	,
				[Date.UTC(2007, 2,8),	80	]	,
				[Date.UTC(2007, 2,11),	30	]	,
				[Date.UTC(2007, 2,12),	29	]	,
				[Date.UTC(2007, 2,13),	13	]	,
				[Date.UTC(2007, 2,14),	11	]	,
				[Date.UTC(2007, 2,15),	33	]	,
				[Date.UTC(2007, 2,16),	38	]	,
				[Date.UTC(2007, 2,19),	14	]	,
				[Date.UTC(2007, 2,20),	63	]	,
				[Date.UTC(2007, 2,21),	20	]	,
				[Date.UTC(2007, 2,22),	15	]	,
				[Date.UTC(2007, 2,23),	25	]	,
				[Date.UTC(2007, 2,25),	36	]	,
				[Date.UTC(2007, 2,26),	18	]	,
				[Date.UTC(2007, 2,27),	14	]	,
				[Date.UTC(2007, 2,28),	0	]	,
				[Date.UTC(2007, 3,1),	34	]	,
				[Date.UTC(2007, 3,2),	28	]	,
				[Date.UTC(2007, 3,3),	31	]	,
				[Date.UTC(2007, 3,5),	25	]	,
				[Date.UTC(2007, 3,6),	23	]	,
				[Date.UTC(2007, 3,7),	33	]	,
				[Date.UTC(2007, 3,8),	22	]	,
				[Date.UTC(2007, 3,9),	63	]	,
				[Date.UTC(2007, 3,12),	7	]	,
				[Date.UTC(2007, 3,13),	19	]	,
				[Date.UTC(2007, 3,14),	25	]	,
				[Date.UTC(2007, 3,15),	2	]	,
				[Date.UTC(2007, 3,19),	15	]	,
				[Date.UTC(2007, 3,20),	61	]	,
				[Date.UTC(2007, 3,21),	7	]	,
				[Date.UTC(2007, 3,23),	45	]	,
				[Date.UTC(2007, 3,25),	19	]	,
				[Date.UTC(2007, 3,26),	29	]	,
				[Date.UTC(2007, 3,27),	20	]	,
				[Date.UTC(2007, 3,28),	14	]	,
				[Date.UTC(2007, 3,29),	34	]	,
				[Date.UTC(2007, 3,30),	28	]	,
				[Date.UTC(2007, 4,1),	9	]	,
				[Date.UTC(2007, 4,2),	16	]	,
				[Date.UTC(2007, 4,3),	9	]	,
				[Date.UTC(2007, 4,5),	16	]	,
				[Date.UTC(2007, 4,6),	47	]	,
				[Date.UTC(2007, 4,9),	9	]	,
				[Date.UTC(2007, 4,10),	9	]	,
				[Date.UTC(2007, 4,11),	11	]	,
				[Date.UTC(2007, 4,12),	11	]	,
				[Date.UTC(2007, 4,13),	10	]	,
				[Date.UTC(2007, 4,14),	12	]	,
				[Date.UTC(2007, 4,15),	21	]	,
				[Date.UTC(2007, 4,17),	32	]	,
				[Date.UTC(2007, 4,18),	14	]	,
				[Date.UTC(2007, 4,20),	14	]	,
				[Date.UTC(2007, 4,22),	26	]	,
				[Date.UTC(2007, 4,23),	43	]	,
				[Date.UTC(2007, 4,25),	38	]	,
				[Date.UTC(2007, 4,26),	16	]	,
				[Date.UTC(2007, 4,29),	6	]	,
				[Date.UTC(2007, 4,30),	2	]	,
				[Date.UTC(2007, 5,1),	19	]	,
				[Date.UTC(2007, 5,2),	41	]	,
				[Date.UTC(2007, 5,4),	55	]	,
				[Date.UTC(2007, 5,5),	325	]	,
				[Date.UTC(2007, 5,6),	12	]	,
				[Date.UTC(2007, 5,7),	18	]	,
				[Date.UTC(2007, 5,9),	13	]	,
				[Date.UTC(2007, 5,10),	11	]	,
				[Date.UTC(2007, 5,12),	14	]	,
				[Date.UTC(2007, 5,14),	36	]	,
				[Date.UTC(2007, 5,15),	8	]	,
				[Date.UTC(2007, 5,17),	33	]	,
				[Date.UTC(2007, 5,18),	29	]	,
				[Date.UTC(2007, 5,19),	6	]	,
				[Date.UTC(2007, 5,21),	15	]	,
				[Date.UTC(2007, 5,22),	13	]	,
				[Date.UTC(2007, 5,23),	4	]	,
				[Date.UTC(2007, 5,24),	19	]	,
				[Date.UTC(2007, 6,3),	37	]	,
				[Date.UTC(2007, 6,26),	17	]	,
				[Date.UTC(2007, 7,3),	89	]	,
				[Date.UTC(2007, 7,4),	13	]	,
				[Date.UTC(2007, 7,6),	7	]	,
				[Date.UTC(2007, 7,8),	141	]	,
				[Date.UTC(2007, 7,12),	47	]	,
				[Date.UTC(2007, 7,18),	2	]	,
				[Date.UTC(2007, 7,20),	23	]	,
				[Date.UTC(2007, 7,22),	25	]	,
				[Date.UTC(2007, 7,24),	7	]	,
				[Date.UTC(2007, 7,26),	67	]	,
				[Date.UTC(2007, 7,27),	24	]	,
				[Date.UTC(2007, 7,30),	6	]	,
				[Date.UTC(2007, 8,1),	17	]	,
				[Date.UTC(2007, 8,2),	19	]	,
				[Date.UTC(2007, 8,3),	25	]	,
				[Date.UTC(2007, 8,5),	19	]	,
				[Date.UTC(2007, 8,6),	34	]	,
				[Date.UTC(2007, 8,7),	0	]	,
				[Date.UTC(2007, 8,9),	6	]	,
				[Date.UTC(2007, 8,14),	7	]	,
				[Date.UTC(2007, 8,18),	10	]	,
				[Date.UTC(2007, 8,19),	24	]	,
				[Date.UTC(2007, 8,20),	22	]	,
				[Date.UTC(2007, 8,22),	9	]	,
				[Date.UTC(2007, 8,23),	9	]	,
				[Date.UTC(2007, 8,26),	22	]	,
				[Date.UTC(2007, 8,27),	13	]	,
				[Date.UTC(2007, 8,31),	20	]	,
				[Date.UTC(2007, 9,3),	10	]	,
				[Date.UTC(2007, 9,5),	4	]	,
				[Date.UTC(2007, 9,6),	15	]	,
				[Date.UTC(2007, 9,9),	2	]	,
				[Date.UTC(2007, 9,10),	20	]	,
				[Date.UTC(2007, 9,14),	11	]	,
				[Date.UTC(2007, 9,15),	23	]	,
				[Date.UTC(2007, 9,18),	173	]	,
				[Date.UTC(2007, 9,19),	14	]	,
				[Date.UTC(2007, 9,21),	48	]	,
				[Date.UTC(2007, 9,22),	0	]	,
				[Date.UTC(2007, 9,24),	14	]	,
				[Date.UTC(2007, 9,26),	186	]	,
				[Date.UTC(2007, 9,29),	8	]	,
				[Date.UTC(2007, 10,3),	4	]	,
				[Date.UTC(2007, 10,5),	12	]	,
				[Date.UTC(2007, 10,7),	0	]	,
				[Date.UTC(2007, 10,11),	4	]	,
				[Date.UTC(2007, 10,15),	16	]	,
				[Date.UTC(2007, 10,17),	30	]	,
				[Date.UTC(2007, 10,18),	26	]	,
				[Date.UTC(2007, 10,19),	16	]	,
				[Date.UTC(2007, 10,20),	61	]	,
				[Date.UTC(2007, 10,21),	23	]	,
				[Date.UTC(2007, 10,28),	9	]	,
				[Date.UTC(2007, 11,4),	9	]	,
				[Date.UTC(2007, 11,14),	40	]	,
				[Date.UTC(2007, 11,22),	8	]	,
				[Date.UTC(2007, 11,26),	26	]	,
				[Date.UTC(2007, 11,29),	118	]	,
				[Date.UTC(2007, 12,1),	36	]	,
				[Date.UTC(2007, 12,4),	17	]	,
				[Date.UTC(2007, 12,6),	16	]	,
				[Date.UTC(2007, 12,10),	4	]	,
				[Date.UTC(2007, 12,14),	0	]	,
				[Date.UTC(2007, 12,15),	34	]	,
				[Date.UTC(2007, 12,19),	43	]	,
				[Date.UTC(2007, 12,21),	35	]	,
				[Date.UTC(2008, 1,3),	56	]	,
				[Date.UTC(2008, 2,16),	95	]	,
				[Date.UTC(2008, 2,19),	56	]	,
				[Date.UTC(2008, 2,21),	22	]	,
				[Date.UTC(2008, 2,22),	53	]	,
				[Date.UTC(2008, 2,28),	51	]	,
				[Date.UTC(2008, 3,3),	26	]	,
				[Date.UTC(2008, 3,12),	33	]	,
				[Date.UTC(2008, 3,17),	20	]	,
				[Date.UTC(2008, 3,21),	15	]	,
				[Date.UTC(2008, 3,22),	4	]	,
				[Date.UTC(2008, 3,27),	14	]	,
				[Date.UTC(2008, 3,29),	43	]	,
				[Date.UTC(2008, 3,31),	25	]	,
				[Date.UTC(2008, 4,1),	22	]	,
				[Date.UTC(2008, 4,3),	26	]	,
				[Date.UTC(2008, 4,4),	58	]	,
				[Date.UTC(2008, 4,5),	27	]	,
				[Date.UTC(2008, 4,6),	46	]	,
				[Date.UTC(2008, 4,9),	17	]	,
				[Date.UTC(2008, 4,10),	23	]	,
				[Date.UTC(2008, 4,13),	4	]	,
				[Date.UTC(2008, 4,17),	38	]	,
				[Date.UTC(2008, 4,19),	15	]	,
				[Date.UTC(2008, 4,23),	12	]	,
				[Date.UTC(2008, 4,28),	18	]	,
				[Date.UTC(2008, 4,29),	10	]	,
				[Date.UTC(2008, 4,30),	23	]	,
				[Date.UTC(2008, 5,2),	10	]	,
				[Date.UTC(2008, 5,5),	37	]	,
				[Date.UTC(2008, 5,6),	12	]	,
				[Date.UTC(2008, 5,7),	17	]	,
				[Date.UTC(2008, 5,9),	7	]	,
				[Date.UTC(2008, 5,10),	34	]	,
				[Date.UTC(2008, 5,14),	17	]	,
				[Date.UTC(2008, 5,15),	13	]	,
				[Date.UTC(2008, 5,16),	15	]	,
				[Date.UTC(2008, 5,19),	26	]	,
				[Date.UTC(2008, 5,20),	15	]	,
				[Date.UTC(2008, 5,22),	27	]	,
				[Date.UTC(2008, 5,25),	32	]	,
				[Date.UTC(2008, 5,27),	53	]	,
				[Date.UTC(2008, 5,28),	9	]	,
				[Date.UTC(2008, 5,30),	0	]	,
				[Date.UTC(2008, 6,1),	69	]	,
				[Date.UTC(2008, 6,3),	9	]	,
				[Date.UTC(2008, 6,12),	23	]	,
				[Date.UTC(2008, 6,19),	73	]	,
				[Date.UTC(2008, 6,25),	78	]	,
				[Date.UTC(2008, 7,1),	26	]	,
				[Date.UTC(2008, 7,4),	6	]	,
				[Date.UTC(2008, 7,10),	42	]	,
				[Date.UTC(2008, 7,12),	5	]	,
				[Date.UTC(2008, 7,14),	90	]	,
				[Date.UTC(2008, 7,15),	39	]	

            
            ]
        
        }]
    });

// Google Forms:
$('#ss-form').submit( function(){
   $(this).hide();
   $('#qs-submit-page').show();
});
	

});