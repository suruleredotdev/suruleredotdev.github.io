<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>

<style>
  path {
    stroke-width: 1;
    fill: none;
  }
  .LIGHT path { stroke: var(--txt-color-light);  }
  .DARK path { stroke: var(--txt-color-dark);  }

  .axis path,
  .axis line {
    fill: none;
    stroke-width: 1;
    stroke: grey;
    shape-rendering: crispEdges;
  }

  .axis text { font-size: 10px; }
  .LIGHT .axis text { fill: grey; }
  .DARK .axis text { fill: white; }

</style>

<script>
  function renderChart(chartFileName, chartElementId) {
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%b %d %Y").parse;

    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    var priceline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.price); });

    var svg = d3.select("#" + chartElementId)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(chartFileName, function(error, data) {
        if(!!error) {
          console.log(error);
        }
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.price = d.price;
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.price; })]);

        var dataNest = d3.nest()
            .key(function(d) {return d.symbol;})
            .entries(data);

        dataNest.forEach(function(d) {
            svg.append("path")
                .attr("class", "line")
                .attr("d", priceline(d.values));
        });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    });
  }

  window.addEventListener('DOMContentLoaded', function (e) {
    let charts = document.querySelectorAll(".CHART");
    for (var i = 0; i < charts.length; i++) {
      let el = charts[i];
      renderChart(!!el.getAttribute("data-file") ? el.getAttribute("data-file") : (el.id + ".csv"), el.id);
    };
  });
</script>
