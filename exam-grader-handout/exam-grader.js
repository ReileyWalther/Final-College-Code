/* 
NAME:           REILEY WALTHER
Date:           February 1st, 2022
Due Date:       February 9th, 2022
Course:         CSC 342, Spring 2022
Assignment:     1 - Exam Grader
Purpose:        This program uses JavaScript to grade a multiple choice exam.
                The program reports on the student, correctness, pass/fail as
                well as the questions they got wrong if applicable.
*/

"use strict";

const answers = require('./answers.js');

let correct = ['B','D','A','A','C','A','B','A','C','D','B','C','D','A','D','C','C','B','D','A'];
let incorrect = [];

//Create headings and displaying them for the relevant information to be put under them
headings();


//initialize running variables to default
let count = 0;
let pass = "yes";

//begin for loop
for(let i = 0 ; i < answers.answers.length ; i++) {
    for(let j = 0 ; j < correct.length ; j++) {
        if (answers.answers[i][j] === correct[j]) 
                { count += 1; } 
        else    { incorrect.push(j+1); }
    }//end for loop for 20 questions

    //check on pass/fail value
    if (incorrect.length > 5) { pass = "no"; }

    //adding results to console - function
    displayer(i,count,incorrect,pass);

    //resetting running variables for next iteration
    count = 0;
    incorrect = [];
    pass = "yes";

}//end for loop for all answers


/*********************************************************** 
FUNCTION NAME:  headings
DESCRIPTION:    Function creates relevant headings for the
                information calculated to be displayed 
                under. Variables are created and used 
                locally.
PARAMETERS:     none
RETURN VALUE:   none - Headings are written to the console
***********************************************************/
function headings() {
    let headings = "Student  " + "Correct  " + "Incorrect  " + "Passed  " + "Missed";
    let lines = "-------  -------  ---------  ------  ------";
    console.log(headings);
    console.log(lines);
}//end function


/***********************************************************
FUNCTION NAME:  displayer
DESCRIPTION:    Function takes the information given and, if
                necessary, changes a vaariable to a string 
                so that we can use 'padStart' to nicely
                format the output displayed in the console.
PARAMETERS:     i - the index of the array that we are using
                    to keep track of the student.
                counter - a number tracking how many correct 
                          answers a student has.
                incorrect - an array that stores the question
                            number that the student got wrong.
                passed - a string that says either 'yes' or 
                         'no' indicating if a student passed.
RETURN VALUE:   none - Information displayed in console.
***********************************************************/
function displayer( i, counter, incorrect, passed) {
    console.log((i+1).toString().padStart(7, ' ') + "  " 
                + counter.toString().padStart(7, " ") + "  " 
                + incorrect.length.toString().padStart(9, " ") + "  " 
                + passed.padStart(6, ' ') + "  " 
                + incorrect);
}//end function
