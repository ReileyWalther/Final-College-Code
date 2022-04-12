/* 
NAME:           REILEY WALTHER
Date:           February 15th, 2022
Due Date:       February 23rd, 2022
Course:         CSC 342, Spring 2022
Assignment:     3 - Simple Web Server
Purpose:        This program uses ExpressJS to launch a simple web server
                and dispkays the results from assignment 1 in an HTML 
                table on the browser page.
*/

// Declaring constants for ExpressJS to use
const express = require('express');
const app = express();
const port = 3000;


// An app.get on the 'grades' path for the simple web server.
// Calling the main function creates those results that we will be using.
// A string called message is created with HTML code and used as an argument
// in res.send() 
app.get('/grades', (req, res) => {
    let using = main();
    let message = "";
    message += "<table border = \"2\" style = \"padding: 1em;\"> " +
					"<caption style = \"font-size: x-large;\"><strong><u>Students and their Grades</u></strong></caption>" + 
					"<thead>" +
                    "<tr><th style = \"padding: .5em;\">Student </th>" +
                        "<th style = \"padding: .5em;\">Correct </th>" + 
                        "<th style = \"padding: .5em;\">Incorrect </th>" + 
                        "<th style = \"padding: .5em;\">Passed </th>" + 
                        "<th style = \"padding: .5em;\">Missed </th></tr>" +
                    "</thead><tbody>";

    let count = 1;
    for (let i of using){
        message += "<tr>";
        message += `<td> ${count} </td>`;
        message += `<td> ${i.Correct} </td>`;
        message += `<td> ${i.Incorrect} </td>`;
        message += `<td> ${i.Passed} </td>`;
        message += `<td> ${i.Missed} </td>`;
        message += "</tr>";
        count += 1;
    }//end for loop

    
    message += "</tbody></table>";

	res.send(message);
	console.log('New instance at: ' + Date());
})

// 'Kickstarter' app.listen listens on the above predefined port.
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})


// Solution 1 from Dr. D Schwesinger 02/10/2022
// Solution (functions) used to read and manipulate data into an object

//***********************************************************************************

"use strict";

const answers = require('./answers.js').answers;

/********************************************************************* 
FUNCTION NAME:  main
DESCRIPTION:    Main function that declares a key to use as the correct
                answers and then loops through provided file to compare
                right and wrong answers and puts them in a table for 
                output.
PARAMETERS:     none
RETURN VALUE:   table - An object used to store information on a 
                        students correct, incorrect, passed and 
                        missed numbers.
*********************************************************************/
function main() {
    const key = 'BDAACABACDBCDADCCBDA';

    let table = [];
    for (let student of answers) {
        let row = {
            Correct: scoreCorrect(student, key),
            Incorrect: scoreIncorrect(student, key),
            Passed: scorePassed(student, key),
            Missed: scoreMissed(student, key)
        };
        table.push(row);
    }
   
	console.table(table);
    return table;
}

/********************************************************************* 
FUNCTION NAME:  scoreCorrect
DESCRIPTION:    Creates a counter variable and add to it when an answer
                matches the parallel item in the correct array.
PARAMETERS:     ans  -  list of items of the answers read into the file
                        and function compared to the correct list.
                key  -  the declared, correct answer list that is being
                        compared to in the function.
RETURN VALUE:   result - The counter of how many number of items were
                         correct in this given list.
*********************************************************************/
function scoreCorrect(ans, key) {
    let result = 0;
    for (let i = 0; i < ans.length; i++) {
        if (ans[i] === key[i]) {
            result += 1;
        }
    }
    return result;
}

/********************************************************************* 
FUNCTION NAME:  scoreIncorrect
DESCRIPTION:    Creates a counter variable and add to it when an answer
                does not match the parallel item in the correct array.
PARAMETERS:     ans  -  list of items of the answers read into the file
                        and function compared to the correct list.
                key  -  the declared, correct answer list that is being
                        compared to in the function.
RETURN VALUE:   result - The counter of how many number of items were
                         incorrect in this given list.
*********************************************************************/
function scoreIncorrect(ans, key) {
    let result = 0;
    for (let i = 0; i < ans.length; i++) {
        if (ans[i] !== key[i]) {
            result += 1;
        }
    }
    return result;
}

/********************************************************************* 
FUNCTION NAME:  scorePassed
DESCRIPTION:    Creates a default 'yes' boolean variable and changes 
                it to 'no' if the score of incorrect is more than 5.
PARAMETERS:     ans  -  list of items of the answers read into the file
                        and function compared to the correct list.
                key  -  the declared, correct answer list that is being
                        compared to in the function.
RETURN VALUE:   result - The boolean variable of 'yes' or 'no'.
*********************************************************************/
function scorePassed(ans, key) {
    let result = "no"; 
    let score = scoreCorrect(ans, key);
    if (score >= 15) {
        result = "yes";
    }
    return result;
}

/********************************************************************* 
FUNCTION NAME:  scoreMissed
DESCRIPTION:    Creates an empty array and adds the incorrect question
                numbers to it after its compared to the reference list.
PARAMETERS:     ans  -  list of items of the answers read into the file
                        and function compared to the correct list.
                key  -  the declared, correct answer list that is being
                        compared to in the function.
RETURN VALUE:   result - The list of question numbers that the student
                         did not get right.
*********************************************************************/
function scoreMissed(ans, key) {
    let result = [];
    for (let i = 0; i < ans.length; i++) {
        if (ans[i] !== key[i]) {
            result.push(i+1);
        }
    }
    result = result.join(' ');
    return result;
}

// End of Dr. Schwesinger's code solution
//***********************************************************************************
