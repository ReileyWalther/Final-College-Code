/*
NAME:           REILEY WALTHER
Date:           March 20th, 2022
Due Date:       April 1st, 2022
Course:         CSC 342, Spring 2022
Assignment:     6 - Midterm REST API
Purpose:        This program uses NodeJS, express and a sqlite database
                to create a basic REST API. It is designed to be a menu
                of what a snakc stand has available. It uses HTTP protocols
                to manipulate the data.

reference codes come from:
https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
*/

//Declaration of constants to use with ExpressJS
const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const dbused = "./menu.db";
app.use(express.json({strict: false}));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connecting to the database
// Declaring 'db' as the database and then ensuring that no errors are 
// encountered when attempting to connect
let db = new sqlite3.Database(dbused, (err) => {
    if (err) {
        console.log('ERROR: ' + err.message);
        exit(1);
    }//end if
    else {
        console.log('connected to the database');
    }

    db.serialize(() => {
        db.each(`SELECT * FROM drinks`, (err, row) => {
          if (err) {
            console.log("ERROR: " + err.message);
          }
        });
      });

      db.serialize(() => {
        db.each(`SELECT * FROM food`, (err, row) => {
          if (err) {
            console.log("ERROR: " + err.message);
          }
        });
      });
});

// An app.get protocol on the '/api' path 
// Creates a message and displays this on the /'api' for the user to read and
// understand what they can do and what information they can deal with
// Messages to the browser and the console are created and displayed 
app.get('/api', (req,res) => {
    let string = `<h1>Welcome to Reiley's Assignment 6 Midterm!</h1>` + 
                 `<p>Here, we are dealing with a snack stand and what's on the menu.</p>` + 
                 `<p>Please use '/api' as your root URI for all calls. </p>` +
                 `<p>You can look in the drinks or food tables. <br>You will find name, 
                  price and size in the drinks table. <br> You will find name, cost, calories, 
                  and sauce in the food table.</p>`;
    res.send(string);
    console.log('Display of Introduction message on root page /api/ ');
})

// NAME:        An app.get protocol on the '/api/drinks' path
// Description: Simple protocol retrieves the entire set of data in the drinks table
//              and displays the rcords in application/json format, otherwise a  
//              related error message is displayed
app.get('/api/drinks', (req,res) => {
    let sql = "SELECT * FROM drinks";

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"ERROR": err.message});
            exit(1);
        };//end if
        if (rows == ''){
            res.status(404).json({"ERROR" : "Table 'drinks' does not exist"});
        }//end if
        else {
            console.log('Display of the list of items in the /api/drinks table');
            res.status(200).json(rows);
        }
    });
});

// NAME: An app.get protocol on the '/api/food' path
// DESCRIPTION: Simple protocol retrieves the entire set of data in the food table
//              and displays the rcords in application/json format, otherwise a  
//              related error message is displayed
app.get('/api/food', (req,res) => {
    let sql = "SELECT * FROM food";

    db.all(sql, [], (err, rows) => {
        if (err) {
          res.status(400).json({"ERROR": err.message});
        };//end if
        if (rows == ''){
            res.status(404).json({"ERROR" : "Table 'food' does not exist"});
        };//end if

        console.log('Display of the list of items in the /api/food table');
        res.status(200).json(rows);
      });
});

// NAME: An app.get protocol on the '/api/drinks/:item' path
// DESCRIPTION: Simple protocol retrieves the specified data item in the drinks 
//              table and displays the rcords in application/json format,   
//              otherwise a related error message is displayed
app.get('/api/drinks/:item', (req,res) => {
    let sql = "SELECT * FROM drinks WHERE id = ?";
    let params = [req.params.item];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"ERROR": err.message});
        };//end if
        if (rows =='') {
            res.status(404).json({"ERROR" : `Item '${req.params.item}' does not exist`});
        }//end if
        else {
            console.log(`Displaying the record of item ${req.params.item} in the drinks table`);
            res.status(200).json(rows);
        }//end else
    });
});

// NAME: An app.get protocol on the '/api/food/:item' path
// DESCRIPTION: Simple protocol retrieves the specified data item in the food 
//              table and displays the rcords in application/json format,   
//              otherwise a related error message is displayed
app.get('/api/food/:item', (req,res) => {
    let sql = "SELECT * FROM food WHERE id = ?";
    let params = [req.params.item];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"ERROR": err.message});
        };//end if
        if (rows == '') {
            res.status(404).json({"ERROR" : `Item '${req.params.item}' does not exist`});
        }//end if
        else {
            console.log(`Displaying the record of item ${req.params.item} in the food table`);
            res.status(200).json(rows);
        };//end else
    });
});


// NAME: An app.post protocol on the '/api/drinks' path
// DESCRIPTION: The protocol creates a new record with new data for each 
//              attribute in the table and inserts it into the drinks table. If
//              the error is set, a message in json format is also displayed.
app.post('/api/drinks/', (req,res) => {
    let problem = false;

    if (!req.body.name) {
        problem = true;
    };//end if 
    if (!req.body.price) {
        problem = true;
    };//end if 
    if (!req.body.size) {
        problem = true;
    };//end if 

    if (problem) {
        res.status(400).json({"ERROR" : "Missing input information"});
        return;
    };//end if 

    let data = req.body;

    let sql ='INSERT INTO drinks (name, price, size) VALUES (?,?,?)';
    let params = [data.name, data.price, data.size];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }//end if
        else {
            console.log("Posting a new record to drinks table with information: " + this.lastID + ',' + params);
            res.status(201);
            res.set('location', '/api/drinks/' + this.lastID);
            res.end();
        };//end else
    });
});

// NAME: An app.post protocol on the '/api/food' path
// DESCRIPTION: The protocol creates a new record with new data for each 
//              attribute in the table and inserts it into the food table. If
//              the error is set, a message in json format is also displayed.
app.post('/api/food/', (req,res) => {
    let problem = false;

    if (!req.body.name) {
        problem = true;
    };//end if 
    if (!req.body.cost) {
        problem = true;
    };//end if 
    if (!req.body.sauce) {
        problem = true;
    };//end if 
    if (!req.body.calories) {
        problem = true;
    };//end if 

    if (problem) {
        res.status(400).json({"ERROR" : "Missing input information"});
        return;
    }//end if 

    let data = req.body;

    let sql ='INSERT INTO food (name, cost, sauce, calories) VALUES (?,?,?,?)';
    let params = [data.name, data.cost, data.sauce, data.calories];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }//end if
        else {
            console.log("Posting a new record to food table with information: " + this.lastID + ',' + params);
            res.status(201);
            res.set('location', '/api/food/' + this.lastID);
            res.end();
        };//end else
    });
});


// NAME:        An app.put protocol on the '/api/drinks/:id' path
// DESCRIPTION: This protocol takes information from the body and uses any 
//              number of the fields to update the specified id number in 
//              the drinks table. If the id specified does not exist, a 404
//              message is displayed, otherwise, a 200 message is displayed.
app.put('/api/drinks/:id', (req,res) => {
    let select = "SELECT * FROM drinks WHERE id = ?";
    let ident = [req.params.id];

    db.all(select, ident, (err, rows) => {
        if (err) {
            res.status(400).json({"ERROR": err.message});
        };//end if
        if (rows =='') {
            res.status(404).json({"ERROR" : `Item '${req.params.id}' does not exist`});
            return;
        }//end if
        else {
            let problem = false;

            if (!req.body.name) {
                problem = true;
            };//end if 
            if (!req.body.price) {
                problem = true;
            };//end if 
            if (!req.body.size) {
                problem = true;
            };//end if 

            if (problem) {
                res.status(400).json({"ERROR" : "No information specified to change"});
                return;
            };//end if 

            let data = req.body;

            let sql =`UPDATE drinks SET 
                        name = ?,
                        price = ?,
                        size = ? WHERE id = ?`;
            let params = [data.name, data.price, data.size, req.params.id];

            db.run(sql, params, function (err) {
                if (err) {
                    res.status(400).json({"error": err.message})
                    return;
                }//end if
                else {
                    console.log(`Put protocol to update record ${req.params.id} to drinks table with new information: ` + params);
                    res.status(200);
                    res.set('location', '/api/drinks/' + this.lastID);
                    res.end();
                };//end else
            });
        }//end else
    });
    
});

// NAME:        An app.put protocol on the '/api/food/:id' path
// DESCRIPTION: This protocol takes information from the body and uses any 
//              number of the fields to update the specified id number in 
//              the food table. If the id specified does not exist, a 404
//              message is displayed, otherwise, a 200 message is displayed.
app.put('/api/food/:id', (req,res) => {
    let select = "SELECT * FROM food WHERE id = ?";
    let ident = [req.params.id];

    db.all(select, ident, (err, rows) => {
        if (err) {
            res.status(400).json({"ERROR": err.message});
        };//end if
        if (rows =='') {
            res.status(404).json({"ERROR" : `Item '${req.params.id}' does not exist`});
            return;
        }//end if
        else {
            let problem = false;

            if (!req.body.name) {
                problem = true;
            };//end if 
            if (!req.body.cost) {
                problem = true;
            };//end if 
            if (!req.body.sauce) {
                problem = true;
            };//end if 
            if (!req.body.calories) {
                problem = true;
            };//end if 

            if (problem) {
                res.status(400).json({"ERROR" : "Missing input information"});
                return;
            };//end if 

            let data = req.body;

            let sql =`UPDATE food SET 
                        name = ?,
                        cost = ?,
                        sauce = ?,
                        calories = ? WHERE id = ?`;
            let params = [data.name, data.cost, data.sauce, data.calories, req.params.id];

            db.run(sql, params, function (err) {
                if (err) {
                    res.status(400).json({"error": err.message})
                    return;
                }//end if
                else {
                    console.log(`Put protocol to update record ${req.params.id} to food table with new information: ` + params);
                    res.status(200);
                    res.set('location', '/api/food/' + this.lastID);
                    res.end();
                };//end else
            });
        }//end else
    });
    
});


// NAME:        An app.delete protocol on the '/api/drinks/:id' path
// DESCRIPTION: This protocol specifies an id in the drinks table and
//              attempts to remove it from the table. If successful, 
//              a 204 code is sent, otherwise a 400 is sent. If the 
//              record is not in the table, a 404 is sent.
app.delete('/api/drinks/:id', (req,res) => {
    let select = "SELECT * FROM drinks WHERE id = ?";
    let ident = [req.params.id];

    db.all(select, ident, (err, rows) => {
        if (err) {
            res.status(400).json({"ERROR": err.message});
        };//end if
        if (rows =='') {
            res.status(404).json({"ERROR" : `Item '${req.params.id}' does not exist`});
            return;
        }//end if
        else {
            db.run('DELETE FROM drinks WHERE id = ?',
            req.params.id,
            (err) => {
                if (err) {
                    res.status(400).json({"ERROR" : err.message});
                    return;
                }//end if
                console.log(`Deleting record number '${req.params.id}' from drinks table`);
                res.status(204).json({"Message" : "No Content"});
            });
        };//end else
    });
});

// NAME:        An app.delete protocol on the '/api/food/:id' path
// DESCRIPTION: This protocol specifies an id in the food table and
//              attempts to remove it from the table. If successful, 
//              a 204 code is sent, otherwise a 400 is sent. If the 
//              record is not in the table, a 404 is sent.
app.delete('/api/food/:id', (req,res) => {
    let select = "SELECT * FROM food WHERE id = ?";
    let ident = [req.params.id];

    db.all(select, ident, (err, rows) => {
        if (err) {
            res.status(400).json({"ERROR": err.message});
        };//end if
        if (rows =='') {
            res.status(404).json({"ERROR" : `Item '${req.params.id}' does not exist`});
            return;
        }//end if
        else {
            db.run('DELETE FROM food WHERE id = ?',
            req.params.id,
            (err) => {
                if (err) {
                    res.status(400).json({"ERROR" : err.message});
                    return;
                }//end if
                console.log(`Deleting record number '${req.params.id}' from food table`);
                res.status(204).json({"Message" : "No Content"});
            });
        };//end else
    });
});

//db.close();

app.listen(port, () => {
    console.log(`Assignment 6 listening on ${port}`);
})