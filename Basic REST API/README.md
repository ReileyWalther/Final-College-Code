//////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////

Documentation for the REST API
Once the 'node index.js' command is running in your command line, then
'localhost:3000' along with the following additional URIs should be entered to
navigate through the REST API.


GET PROTOCOLS
To use the get protocols in this REST API, the following URIs are used for their 
specified tables and a description comes with them.

	DRINKS
		'/api/drinks'
			-> This additional URI will display the entire set of data present 
			in the drinks table in json format.

		'/api/drinks/:item'
			-> This additional URI will display the record from the table drinks 
			will the specified ID number as an integer taken from item in the 
			parameters of the URI (:item) .


	FOOD
		'/api/food'
			-> This additional URI will display the entire set of data present
            in the food table in json format.


		'/api/food/:item'
			-> This additional URI will display the record from the table drinks
            will the specified ID number as an integer taken from item in the 
			parameters of the URI (:item).


POST PROTOCOLS
To use the post protocols in this REST API, the following URIs are used for their
specified tables and a description comes with them.

	DRINKS
		'/api/drinks'
			-> This additional URI will take the body of a request and use the 
			necessary items of name as a string, price as a real value and size 
			as an integer to create a new record and enter it into the drinks
			table.

	FOOD
		'/api/food'
			-> This additional URI will take the body of a request and use the
            necessary items of name as a string, cost as a real value, sauce as
			a string and calories as an integer to create a new record and enter 
			it into the food table.


PUT PROTOCOLS
	DRINKS
		'/api/drinks/:item'
			-> This additional URI will take any related items from the body of 
			the request, link the request to a record in the drinks table using 
			the id field as an integer(from :item) and update the record with the 
			new information.

	FOOD
		'/api/food/:item'
			-> This additional URI will take any related items from the body of
            the request, link the request to a record in the food table using
            the id field as an integer(from :item) and update the record with the 
			new information.



DELETE PROTOCOLS
	DRINKS
        '/api/drinks/:item'
			-> This additional URI will find a specified record (using the :item 
			as an integer from the URI) in the drinks table and, if it exists, will 
			remove the record from the table.

	FOOD
        '/api/food/:item'
			-> This additional URI will find a specified record (using the :item
            as an integer from the URI) in the drinks table and, if it exists, will 
			remove the record from the table.


