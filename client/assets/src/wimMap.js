wimMap = {
	map : {}, //Leaflet map
	container : {}, // leaflet map container id
	wim_stations_geo : {}, //topo or geojson data
	wim_stations_features : {}, // selectAll(circle.stations
	svg: {},
  	g:{},
  	bounds : []
  	init : function(container,data){
  		
		wimMap.map = new L.Map(container, {center: [38.7,-74.6,], zoom: 4});
    	wimMap.map.addLayer(new L.TileLayer("http://{s}.tiles.mapbox.com/v3/am3081.map-lkbhqenw/{z}/{x}/{y}.png"));

  		wimMap.wim_stations_geo = data;

  	},
  	draw_stations : function(){

  	},
  	project :function(x) {
      if(x.length != 2){ return [];}
      var point = wimMap.map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
      return [point.x, point.y];
  	},
	reset :function (bounds,feature) {
		var bottomLeft = wimMap.project(bounds[0]),
		topRight = wimMap.project(bounds[1]);

		wimMap.svg.attr("width", topRight[0] - bottomLeft[0])
			.attr("height", bottomLeft[1] - topRight[1])
			.style("margin-left", bottomLeft[0] + "px")
			.style("margin-top", topRight[1] + "px");

		wimMap.g.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");

		feature
			.attr("d", path);

	}

}