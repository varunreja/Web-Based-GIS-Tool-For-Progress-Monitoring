	var express = require('express');
var router = express.Router();

/* PostgreSQL and PostGIS module and connection setup */
const { Client, Query } = require('pg')

// Setup connection
var username = "postgres" // sandbox username
var password = "postgres_pwd" // read only privileges on our table
var host = "localhost:5432"
var database = "demo" // database name
var conString = "postgres://"+username+":"+password+"@"+host+"/"+database; // Your Database Connection

// Set up your database query to display GeoJSON
var data_query = "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((route_start,route_end,cable_drum_number,Status,date,latitude_1,longitude_1,latitude_2,longitude_2,intermediate_1,lat_1,long_1,intermediate_2,lat_2,long_2)) As properties FROM data_collected As lg) As f) As fc";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Progress' });
});

/* GET Postgres JSON data */
router.get('/data', function (req, res) {
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(data_query));
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        res.send(result.rows[0].row_to_json);
        res.end();
    });
});

/* GET the map page */
router.get('/map', function(req, res) {
    var client = new Client(conString); // Setup our Postgres Client
    client.connect(); // connect to the client
    var query = client.query(new Query(data_query)); // Run our Query
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    // Pass the result to the map page
    query.on("end", function (result) {
        var data = result.rows[0].row_to_json // Save the JSON as variable data
        res.render('map', {
            title: "Daily Progress", // Give a title to our page
            jsonData: data // Pass data to the View
        });
    });
});

/* GET the filtered page */
router.get('/filter1*', function (req, res) {
    var name = req.query.name;
    if (name.indexOf("--") > -1 || name.indexOf("'") > -1 || name.indexOf(";") > -1 || name.indexOf("/*") > -1 || name.indexOf("xp_") > -1){
        console.log("Bad request detected");
        res.redirect('/map');
        return;
    } else {
        console.log("Request passed")
        var filter_query = "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((route_start,route_end,cable_drum_number,Status,date,latitude_1,longitude_1,latitude_2,longitude_2,intermediate_1,lat_1,long_1,intermediate_2,lat_2,long_2)) As properties FROM data_collected As lg WHERE lg.Status = \'" + name + "\') As f) As fc"; 

        var client = new Client(conString);
        client.connect();
        var query = client.query(new Query(filter_query));
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            var data = result.rows[0].row_to_json
            res.render('map', {
                title: "Required Progress",
                jsonData: data
            });
        });
    };
});

router.get('/filter2*', function (req, res) {
    var name = req.query.name;
    if (name.indexOf("--") > -1 || name.indexOf("'") > -1 || name.indexOf(";") > -1 || name.indexOf("/*") > -1 || name.indexOf("xp_") > -1){
        console.log("Bad request detected");
        res.redirect('/map');
        return;
    } else {
        console.log("Request passed")
        var filter_query = "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((route_start,route_end,cable_drum_number,Status,date,latitude_1,longitude_1,latitude_2,longitude_2,intermediate_1,lat_1,long_1,intermediate_2,lat_2,long_2)) As properties FROM data_collected As lg WHERE lg.cable_drum_number = \'" + name + "\') As f) As fc"; 

        var client = new Client(conString);
        client.connect();
        var query = client.query(new Query(filter_query));
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            var data = result.rows[0].row_to_json
            res.render('map', {
                title: "Required Progress",
                jsonData: data
            });
        });
    };
});


module.exports = router;
