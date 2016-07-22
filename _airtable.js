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

var fileQuotes = '_data/quotes.json';
var quotes = new Airtable({ apiKey: config.apikey }).base(config.web);
var quotesJson = [];
var quotesJsonTest = [];

var fileEvents = '_data/events.json';
var event = new Airtable({ apiKey: config.apikey }).base(config.web);
var eventsJson = [];
var eventsJsonTest = [];

var filePhotos = '_data/photos.json';
var photos = new Airtable({ apiKey: config.apikey }).base(config.web);
var photosJson = [];
var photosJsonTest = [];




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

// quotes 

    quotes('quotes').select({
        maxRecords: 100
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          quotesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileQuotes, quotesJson, function (err) {
        console.error(err)
      });
      console.log('quotes worked');
    });

    
// photos 

    photos('photos').select({
        maxRecords: 100,
      //sort
        sort: [{field: "date", direction: "desc"}]

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          photosJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filePhotos, photosJson, function (err) {
        console.error(err)
      });
      console.log('photos worked');
    });

// newRoadBikes 

var filenewRoadBikes = '_data/newRoadBikes.json';
var newRoadBikes = new Airtable({ apiKey: config.apikey }).base(config.bikes);
var newRoadBikesJson = [];
var newRoadBikesJsonTest = [];

    newRoadBikes('Inventory').select({
        maxRecords: 100,
      //sort
        sort: [{field: "Date_Added", direction: "desc"}],
        filterByFormula: 'AND(Item_Type = "Road Bike", Item_Condition = "New", In_Stock)',

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          newRoadBikesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filenewRoadBikes, newRoadBikesJson, function (err) {
        console.error(err)
      });
      console.log('newRoadBikes worked');
    });

// New Tri Bikes

var filenewTriBikes = '_data/newTriBikes.json';
var newTriBikes = new Airtable({ apiKey: config.apikey }).base(config.bikes);
var newTriBikesJson = [];
var newTriBikesJsonTest = [];

    newTriBikes('Inventory').select({
        maxRecords: 100,
      //sort
        sort: [{field: "Date_Added", direction: "desc"}],
        filterByFormula: 'AND(Item_Type = "Tri Bike", Item_Condition = "New", In_Stock)',

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          newTriBikesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filenewTriBikes, newTriBikesJson, function (err) {
        console.error(err)
      });
      console.log('newTriBikes worked');
    });

// New Mountain Bikes

var filenewMtnBikes = '_data/newMtnBikes.json';
var newMtnBikes = new Airtable({ apiKey: config.apikey }).base(config.bikes);
var newMtnBikesJson = [];
var newMtnBikesJsonTest = [];

    newMtnBikes('Inventory').select({
        maxRecords: 100,
      //sort
        sort: [{field: "Date_Added", direction: "desc"}],
        filterByFormula: 'AND(Item_Type = "Mountain Bike", Item_Condition = "New", In_Stock)',

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          newMtnBikesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filenewMtnBikes, newMtnBikesJson, function (err) {
        console.error(err)
      });
      console.log('newMtnBikes worked');
    });

// New Lifestyle Bikes

var filenewLsBikes = '_data/newLsBikes.json';
var newLsBikes = new Airtable({ apiKey: config.apikey }).base(config.bikes);
var newLsBikesJson = [];
var newLsBikesJsonTest = [];

    newLsBikes('Inventory').select({
        maxRecords: 100,
      //sort
        sort: [{field: "Date_Added", direction: "desc"}],
        filterByFormula: 'AND(Item_Type = "Lifestyle Bike", Item_Condition = "New", In_Stock)',

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          newLsBikesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filenewLsBikes, newLsBikesJson, function (err) {
        console.error(err)
      });
      console.log('newLsBikes worked');
    });

// Used Road Bikes

var fileusedRoadBikes = '_data/usedRoadBikes.json';
var usedRoadBikes = new Airtable({ apiKey: config.apikey }).base(config.bikes);
var usedRoadBikesJson = [];
var usedRoadBikesJsonTest = [];

    usedRoadBikes('Inventory').select({
        maxRecords: 100,
      //sort
        sort: [{field: "Date_Added", direction: "desc"}],
        filterByFormula: 'AND(Item_Type = "Road Bike", Item_Condition = "Used", In_Stock)',

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          usedRoadBikesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileusedRoadBikes, usedRoadBikesJson, function (err) {
        console.error(err)
      });
      console.log('usedRoadBikes worked');
    });

// Used Tri Bikes

var fileusedTriBikes = '_data/usedTriBikes.json';
var usedTriBikes = new Airtable({ apiKey: config.apikey }).base(config.bikes);
var usedTriBikesJson = [];
var usedTriBikesJsonTest = [];

    usedTriBikes('Inventory').select({
        maxRecords: 100,
      //sort
        sort: [{field: "Date_Added", direction: "desc"}],
        filterByFormula: 'AND(Item_Type = "Tri Bike", Item_Condition = "Used", In_Stock)',

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          usedTriBikesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileusedTriBikes, usedTriBikesJson, function (err) {
        console.error(err)
      });
      console.log('usedTriBikes worked');
    });

// Used Mountain Bikes

var fileusedMntBikes = '_data/usedMntBikes.json';
var usedMntBikes = new Airtable({ apiKey: config.apikey }).base(config.bikes);
var usedMntBikesJson = [];
var usedMntBikesJsonTest = [];

    usedMntBikes('Inventory').select({
        maxRecords: 100,
      //sort
        sort: [{field: "Date_Added", direction: "desc"}],
        filterByFormula: 'AND(Item_Type = "Mountain Bike", Item_Condition = "Used", In_Stock)',

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          usedMntBikesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileusedMntBikes, usedMntBikesJson, function (err) {
        console.error(err)
      });
      console.log('usedMntBikes worked');
    });

// Used Lifestyle Bikes

var fileusedLsBikes = '_data/usedLsBikes.json';
var usedLsBikes = new Airtable({ apiKey: config.apikey }).base(config.bikes);
var usedLsBikesJson = [];
var usedLsBikesJsonTest = [];

    usedLsBikes('Inventory').select({
        maxRecords: 100,
      //sort
        sort: [{field: "Date_Added", direction: "desc"}],
        filterByFormula: 'AND(Item_Type = "Lifestyle Bike", Item_Condition = "Used", In_Stock)',

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          usedLsBikesJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileusedLsBikes, usedLsBikesJson, function (err) {
        console.error(err)
      });
      console.log('usedLsBikes worked');
    });