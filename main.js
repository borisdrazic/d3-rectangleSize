(function() {
	"use strict";

	var svg, // SVG element
        widthG, // area below rectangle to display width
        widthGposX, // x position of widthG
        widthGposY, // y position of widthG
        heightG, // area to the right of rectangle to display height
        heightGposX, // x position of heightG
        heightGposY, // y position of heigthG
        displayedSize = {}, // height and width currently displayed
        sizeDisplayLen1 = 30, // distance from rectangle to text with size
        sizeDisplayLen2 = 40, // distance from rectangle to end of line
        formatWidth = d3.format(".2r"), // formatter for displayed height/width
        x, y; // scale for x (width) and y (height)

    
    function updateWidthDisplay() {
        var leftVertical,
            horizontal,
            rightVertical,
            textRect,
            text,
            sliderG;

        leftVertical = widthG.selectAll("line.leftVertical")
            .data([displayedSize]);

        leftVertical.enter()
            .append("line")
                .classed("leftVertical", true)
                .attr("x1", widthGposX)
                .attr("x2", widthGposX)
                .merge(leftVertical)
                    .attr("y1", function(d) {
                        return d.height - widthGposY;
                    })
                    .attr("y2", function(d) {
                        return d.height + sizeDisplayLen2 - widthGposY;
                    });

        horizontal = widthG.selectAll("line.horizontal")
            .data([displayedSize]);

        horizontal.enter()
            .append("line")
                .classed("horizontal", true)
                .attr("x1", widthGposX)
                .merge(horizontal)
                    .attr("x2", function(d) {
                        return widthGposX + d.width;
                    })
                    .attr("y1", function(d) {
                        return d.height + sizeDisplayLen1 - widthGposY;
                    })
                    .attr("y2", function(d) {
                        return d.height + sizeDisplayLen1 - widthGposY;
                    });

        rightVertical = widthG.selectAll("line.rightVertical")
            .data([displayedSize]);

        rightVertical.enter()
            .append("line")
                .classed("rightVertical", true)
                .merge(rightVertical)
                    .attr("x1",function(d) {
                        return widthGposX + d.width;
                    })
                    .attr("x2", function(d) {
                        return widthGposX + d.width;
                    })
                    .attr("y1", function(d) {
                        return d.height - widthGposY;
                    })
                    .attr("y2", function(d) {
                        return d.height + sizeDisplayLen2 - widthGposY;
                    });

        
        textRect = widthG.selectAll("rect.textRect")
            .data([displayedSize]);

        textRect.enter()
            .append("rect")
            .classed("textRect", true)
            .attr("height", 20)
            .attr("width", 40)
            .merge(textRect)
                .attr("x", function(d) {
                    return  widthGposX + d.width / 2 - 20;
                })
                .attr("y", function(d) {
                    return sizeDisplayLen1 + d.height - widthGposY - 10;
                });

        text = widthG.selectAll("text.width")
            .data([displayedSize]);

        text.enter()
            .append("text")
            .classed("width", true)
            .merge(text)
                .attr("x", function(d) {
                    return  widthGposX + d.width / 2;
                })
                .attr("y", function(d) {
                    return sizeDisplayLen1 + d.height - widthGposY;
                })
                .text(function(d) { 
                    return formatWidth(x.invert(d.width)) + " px";
                });

        sliderG = widthG.selectAll("g.sliderG")
            .data([displayedSize]);

        sliderG
            .attr("transform", function(d) {
                return "translate(" + (widthGposX + d.width / 2) + ", " + (d.height - widthGposY) + ")";
            });

    }

    function updateHeightDisplay() {
        var topHorizontal,
            vertical,
            bottomHorizontal,
            textRect,
            text,
            sliderG;

        topHorizontal = heightG.selectAll("line.topHorizontal")
            .data([displayedSize]);

        topHorizontal.enter()
            .append("line")
                .classed("topHorizontal", true)
                .attr("y1", 0)
                .attr("y2", 0)
                .merge(topHorizontal)
                    .attr("x1", function(d) {
                        return d.width - heightGposX;
                    })
                    .attr("x2", function(d) {
                        return d.width + sizeDisplayLen2 - heightGposX;
                    });

        vertical = heightG.selectAll("line.vertical")
            .data([displayedSize]);

        vertical.enter()
            .append("line")
                .classed("vertical", true)
                .attr("y1", 0)
                .merge(vertical)
                    .attr("x1", function(d) {
                        return d.width + sizeDisplayLen1 - heightGposX;
                    })
                    .attr("x2", function(d) {
                        return d.width + sizeDisplayLen1 - heightGposX;
                    })
                    .attr("y2", function(d) {
                        return d.height;
                    });


        bottomHorizontal = heightG.selectAll("line.bottomHorizontal")
            .data([displayedSize]);

        bottomHorizontal.enter()
            .append("line")
                .classed("bottomHorizontal", true)
                .merge(bottomHorizontal)
                    .attr("x1", function(d) {
                        return d.width - heightGposX;
                    })
                    .attr("x2", function(d) {
                        return d.width + sizeDisplayLen2 - heightGposX;
                    })
                    .attr("y1", function(d) {
                        return d.height - heightGposY;
                    })
                    .attr("y2", function(d) {
                        return d.height- heightGposY;
                    });

        textRect = heightG.selectAll("rect.textRect")
            .data([displayedSize]);

        textRect.enter()
            .append("rect")
            .classed("textRect", true)
            .attr("height", 40)
            .attr("width", 20)
            .merge(textRect)
                .attr("x", function(d) {
                    return  d.width  + sizeDisplayLen1 - heightGposX - 20 / 2;
                })
                .attr("y", function(d) {
                    return d.height / 2 - 40 / 2;
                });

        text = heightG.selectAll("text.height")
            .data([displayedSize]);

        text.enter()
            .append("text")
            .classed("height", true)
            .merge(text)
                .attr("transform", function(d) {
                    return "rotate(90," + (d.width  + sizeDisplayLen1 - heightGposX - 15 / 2) + ", " + (d.height / 2 - 40 / 2)+ ")";
                })
                .attr("x", function(d) {
                    return  d.width  + sizeDisplayLen1 - heightGposX - 15 / 2 + 5;
                })
                .attr("y", function(d) {
                    return d.height / 2 - 40 / 2 - 4;
                })
                .text(function(d) {
                    return formatWidth(y.invert(d.height)) + " px";
                });

        sliderG = heightG.selectAll("g.sliderG")
            .data([displayedSize]);

        sliderG
            .attr("transform", function(d) {
                return "translate(" + (d.width - heightGposX) + ", " + (d.height / 2 - heightGposY) + ")";
            });
    }

    function appendWidthDisplay(slider, posX, posY) {
        var sliderG;

        widthG = slider.append("g")
            .classed("widthG", true)
            .attr("transform", "translate(" + posX + ", " + posY + ")");

        widthGposX = posX;
        widthGposY = posY;

        sliderG = widthG
            .append("g")
            .classed("sliderG", true)
            .style("pointer-events", "none");

        sliderG.append("polygon")
            .attr("points", "-5,1 5,1 0,6");

        sliderG.append("polygon")
            .attr("points", "-5,-1 5,-1 0,-6");
    }

    function appendHeightDisplay(slider, posX, posY) {
        var sliderG;

        heightG = slider.append("g")
            .classed("heightG", true)
            .attr("transform", "translate(" + posX + ", " + posY + ")");

        heightGposX = posX;
        heightGposY = posY;

        sliderG = heightG
            .append("g")
            .classed("sliderG", true)
            .style("pointer-events", "none");

        sliderG.append("polygon")
            .attr("points", "1,-5 1,5 6,0");

        sliderG.append("polygon")
            .attr("points", "-1,-5 -1,5 -6,0");
            
    }

    /**
     * Create this element in SVG given by selector at position given by posX and posY.
     * Width and height determine the total width and height of this element.
     * RangeX and rangeY determine the maximum of displayed range for width and height.
     */
    function create(selector, posX, posY, width, height, rangeX, rangeY) {
        var slider, // G for entire element
            rect, // rectangle
            handleX, // handle for width slider
            handleY; // handle for height slider

        svg = d3.select(selector);

        x = d3.scaleLinear()
            .domain([1, rangeX])
            .range([50, width - sizeDisplayLen2])
            .clamp(true);

        y = d3.scaleLinear()
            .domain([1, rangeY])
            .range([50, height - sizeDisplayLen2])
            .clamp(true);
        
        slider = svg.append("g")
            .attr("class", "slider")
            .attr("transform", "translate(" + posX + ", " + posY + ")");

        rect = slider.append("rect")
            .attr("class", "rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", x(1))
            .attr("height", y(1));
            
        handleX = slider.append("circle")
            .classed("handle", true)
            .attr("cx", x(1))
            .attr("cy", y(1) / 2)
            .attr("r", 9)
            .call(d3.drag()
                .on("start.interrupt", function() { slider.interrupt(); })
                .on("start drag", function() { 
                    var xPos = x(x.invert(d3.event.x));
                    handleX.attr("cx", xPos);
                    handleY.attr("cx", xPos / 2);
                    rect.attr("width", xPos);
                    displayedSize.width = xPos;
                    update();
                }));

        handleY = slider.append("circle")
            .classed("handle", true)
            .attr("cx", x(1) / 2)
            .attr("cy", y(1))
            .attr("r", 9)
            .call(d3.drag()
                .on("start.interrupt", function() { slider.interrupt(); })
                .on("start drag", function() { 
                    var yPos = y(y.invert(d3.event.y));
                    handleX.attr("cy", yPos / 2);
                    handleY.attr("cy", yPos);
                    rect.attr("height", yPos);
                    displayedSize.height = yPos;
                    update();             
                }));
        
        displayedSize.width = x(1);
        displayedSize.height = y(1);
        appendWidthDisplay(slider, 0, y(1));
        appendHeightDisplay(slider, x(1), 0);
        update();
    }
    
    function update() {
        updateWidthDisplay();
        updateHeightDisplay();
    }

    create("svg", 200, 200, 200, 200, 10, 100);

})();
