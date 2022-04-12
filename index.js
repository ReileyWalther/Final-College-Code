/*
NAME:           REILEY WALTHER
Date:           February 22nd, 2022
Due Date:       March 2nd, 2022
Course:         CSC 342, Spring 2022
Assignment:     4 - JSON Web Server
Purpose:        This program uses ExpressJS to launch a simple web server
                and dispkays the results from assignment 1 in an HTML
                table on the browser page.
*/

// Declaration of constants for ExpressJS to use
const express = require('express');
const app = express();
const port = 3000;

// An app.get on the 'root' path for the simple web server.
// Response message of the entire dataset is sent via jsonp.
// Console displays messages of a new instance and what it does. 
app.get('/', (req,res) => {
    res.jsonp(data);
    console.log("New instance for root page at: " + Date());
    console.log("Entire Dataset of Pokemon objects.");
})


// An app.get on the '/:id' path for the simple web server.
// Data is sorted in ascending order of ID then uses /:id to find 
// corresponding object and displays via jsonp.
// If outside of parameters, json object error is displayed. 
app.get('/:id', (req,res) => {
    let temp = data.sort( (a, b) => a.id - b.id);
    let id = parseInt(req.params.id) - 1;
    console.log("New instance for ID page at: " + Date());

    if((id < temp.length) && (id > -1)) {
        res.jsonp(temp[id]);
        console.log("Corresponding ID number \"" + (id + 1) + "\" displayed");
    }
    else {
        id = parseInt(req.params.id);
        res.status(404).jsonp({ERROR: "This ID number does not exist! Try a different ID."});
    }
})

// An app.get on the '/type/:type' path for the simple web server.
// Loops through the types of each object and adds objecta with 
// matching types to the collection list to be displayed via jsonp.
app.get('/type/:type', (req,res) => {
    let collection = [];
    let temp = req.params.type;
    let type = temp[0].toUpperCase() + temp.slice(1); //Capitalizing the type entered into the URL

    for(let i = 0; i < parseInt(data.length); i++) {
        let amount = data[i].type.length;
        for(let j = 0; j < amount; j++) {
            if( type === (data[i].type[j])) {
                collection.push(data[i]);
            }//end if
        }//end for loop
    }//end for loop
 
    if (collection.length == 0) {
        res.status(404).jsonp({Error: "This type is not present in any of the Pokemon listed or has been incorrectly spelt! Try Again."});
    }//end if
    else {
    res.jsonp(collection);
    }//end else
    console.log("New instance for \"type/:type\" page at: " + Date());
})

// 'Kickstarter' app.listen listens on the above predefined port number.
app.listen(port, () => {
    console.log(`Assignment 4 listening on ${port}`);
})

"use strict";

const data = require('./data').data;
