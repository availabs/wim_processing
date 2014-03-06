/**
 * StationsController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom stationss (`config/stationss.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  	
	stationsGeo:function(req,res){

		var stationsCollection = {};
		stationsCollection.type = "FeatureCollection";
		stationsCollection.features = [];

		var sql = 'SELECT  station_id,state_code,ST_AsGeoJSON(the_geom) station_location FROM tmas where num_lane_1 > 0 group by station_id,state_code,ST_AsGeoJSON(the_geom);'
		Stations.query(sql,{},function(err,data){
			if (err) {res.send('{status:"error",message:"'+err+'"}',500);return console.log(err);}
				data.rows.forEach(function(stations){
					var stationsFeature = {};
					stationsFeature.type="Feature";
					stationsFeature.geometry = JSON.parse(stations.station_location);
					stationsFeature.properties = {};
					stationsFeature.properties.station_id = stations.station_id;
					stationsFeature.properties.state_code = stations.state_code;
					stationsCollection.features.push(stationsFeature);

					});

			res.send(stationsCollection);
		});
 	},
 	uptimeCalc:function(req,res){
 		console.log("Uptime for"+req.param('station_id'));
 		var sql = "select count( distinct month,day,hour) as counts,count(distinct month,day,hour) / (366*24)*100 as percent from stations_"+req.param('station_id');
 		console.log(sql)
 		Wimdata.query(sql,{},function(err,data){
			if (err) {res.send('{status:"error",message:"'+err+'"}',500);return console.log(err);}
			console.log(data);
			res.send(data);

		});
 	},
 	hasData:function(req,res){
 		//console.log("Uptime for"+req.param('station_id'));
 		var sql = "select distinct station_id from AllTheWIM";
 		console.log(sql)
 		Wimdata.query(sql,{},function(err,data){
			if (err) {res.send('{status:"error",message:"'+err+'"}',500);return console.log(err);}
			console.log(data);
			
			var output = [];
			data.forEach(function(station){
				output.push(station.station_id);
			})
			res.send(output);
		});
 	},
 	vehicleClass:function(req,res){
 		//console.log("Uptime for"+req.param('station_id'));
 		var sql = "select vehicle_class,count(vehicle_class) from stations_"+req.param('station_id')+" group by vehicle_class;";
 		console.log(sql);
 		Wimdata.query(sql,{},function(err,data){
			if (err) {res.send('{status:"error",message:"'+err+'"}',500);return console.log(err);}
			console.log(data);
			

			res.send(data);
		});
 	},



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to StationsController)
   */
  _config: {}

  
};
