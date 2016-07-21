var Airtable = require('airtable');
var fs          = require('fs');
var yaml        = require('js-yaml');

function loadConfig() {
  var ymlFile = fs.readFileSync('_config.yml', 'utf8');
  return yaml.load(ymlFile);
}

var config = loadConfig().airtable;
var jsonfile = require('jsonfile');
var fileAbout = '_data/abouts.json';
var abouts = new Airtable({ apiKey: config.apikey }).base(config.abouts);
var aboutJson = [];
var aboutJsonTest = [];

var fileBikes = '_data/bikes.json';
var bikes = new Airtable({ apiKey: config.apikey }).base(config.bikes);
var bikesJson = [];
var bikesJsonTest = [];

var filePages = '_data/pages.json';
var pages = new Airtable({ apiKey: config.apikey }).base(config.web);
var pagesJson = [];
var pagesJsonTest = [];

var fileEvents = '_data/events.json';
var event = new Airtable({ apiKey: config.apikey }).base(config.web);
var eventsJson = [];
var eventsJsonTest = [];


var updated = false;

// bikes 

    bikes('Inventory').select({
        maxRecords: 100,
      //sort
        sort: [{field: "Date_Added", direction: "desc"}],
        filterByFormula: 'OR(Item_Type = "Road Bike", Item_Type = "Mountain Bike", Item_Type = "Tri Bike", Item_Type = "Road Bike", Item_Type = "Lifestyle Bike", Item_Type = "Kids Bike")',
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          bikesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileBikes, bikesJson, function (err) {
        console.error(err)
      });
      console.log('bikes worked');
    });

// pages 

    pages('pages').select({
        maxRecords: 100
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          pagesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filePages, pagesJson, function (err) {
        console.error(err)
      });
      console.log('pages worked');
    });

// events 

    event('events').select({
        maxRecords: 100,
        sort: [{field: "datetime", direction: "desc"}]
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          eventsJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileEvents, eventsJson, function (err) {
        console.error(err)
      });
      console.log('events worked');
    });

    
