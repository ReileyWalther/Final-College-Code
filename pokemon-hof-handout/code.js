/* 
NAME:           REILEY WALTHER
Date:           February 14th, 2022
Due Date:       February 16th, 2022
Course:         CSC 342, Spring 2022
Assignment:     2 - JavaScript Higher Order Functions
Purpose:        This program uses JavaScript higher order functions to sort,
                filter, map, reduce, etc. information from a Pokemon .json
                file.
*/

"use strict";

const data = require('./data').data;

/**************************************************************************** 
FUNCTION NAME:  Main
DESCRIPTION:    Main function ran that calls each separate function for each
                question for the pokemon assignment.
PARAMETERS:     none
RETURN VALUE:   none - results and displays are written to the console
****************************************************************************/
function Main() {

    questionDisplay(highestHP,1);

    questionDisplay(lowSPA, 2);

    questionDisplay(types, 3);
    
    questionDisplay(speeds,4);
    
    questionDisplay(Attack3,5);

}//end Main


/**************************************************************************** 
FUNCTION NAME:  highestHP
DESCRIPTION:    A function that takes the Pokemon data, copies it to a temp
                array to manipulate, sorts the data according to the HP
                values (highest to lowest) and calls display to output the
                results.
PARAMETERS:     data -  The original Pokemon data containing all of the 
                        information for the assignment.
RETURN VALUE:   result -    results gathered from the function, sent to a 
                            formatting function and sent back to main to get
                            displayed.
****************************************************************************/
function highestHP(data) {
    let top = 5;
    let temp = data.slice();
    const HPsort = temp.sort((a ,b) => (a.base.HP < b.base.HP) ? 1 : -1).slice(0,top);

    let result = display(HPsort, "HP", '');
    return result;
}//end function


/**************************************************************************** 
FUNCTION NAME:  lowSPA
DESCRIPTION:    A function that takes the Pokemon data, copies it to a temp
                array to manipulate, sorts the data according to Sp. Attack
                (lowest to highest), filters out all the lowest matches to 
                the lowest Sp. Attack value and then sorts it via 
                alphabetic order in English.
PARAMETERS:     data -  The original Pokemon data containing all of the 
                        information for the assignment.
RETURN VALUE:   result -    results gathered from the function, sent to a 
                            formatting function and sent back to main to get
                            displayed.
****************************************************************************/
function lowSPA(data) {
    let temp = data.slice();
    const lowestA = temp.sort((a,b) => (a.base['Sp. Attack'] < b.base['Sp. Attack']) ? -1 : 1);
    
    let value = lowestA[0].base['Sp. Attack'];
    let result = lowestA.filter(lowestA => lowestA.base['Sp. Attack'] === value);
    
    result = result.sort((a,b) => (a.name.english.localeCompare(b.name.english)) ? -1 : 1);
    result = display(result, "Sp. Attack", '');

    return result;
}//end function


/**************************************************************************** 
FUNCTION NAME:  types
DESCRIPTION:    A function that takes the Pokemon data, copies it to a temp
                array to manipulate, sorts the data according to Attack
                (lowest to highest), filters out all the matches to "Grass"
                and "Poison" for type value and then sends it to get 
                formatted.
PARAMETERS:     data -  The original Pokemon data containing all of the 
                        information for the assignment.
RETURN VALUE:   result -    results gathered from the function, sent to a 
                            formatting function and sent back to main to get
                            displayed.
****************************************************************************/
function types(data) {
    let temp = data.slice();
    const typ = temp.sort((a,b) => (a.base.Attack < b.base.Attack) ? -1: 1);

    let result = typ.filter(typ => String(typ.type).includes("Grass") && String(typ.type).includes("Poison"));
    result = display(result, "Attack", '');

    return result;
}//end function


/**************************************************************************** 
FUNCTION NAME:  speeds
DESCRIPTION:    A function that takes the Pokemon data, copies it to a temp
                array to manipulate, sorts the data according to Speed
                (highest to lowest), and the matching filters are having
                "Rock" in the types, and the speed being higher than the 
                average speed of Pokemon whose types are "Electric".
PARAMETERS:     data -  The original Pokemon data containing all of the 
                        information for the assignment.
RETURN VALUE:   result -    results gathered from the function, sent to a 
                            formatting function and sent back to main to get
                            displayed.
****************************************************************************/
function speeds(data) {
    let temp = data.slice();
    const arr = temp.sort((a,b) => (a.base.Speed < b.base.Speed) ? 1: -1);

    let filt = arr.filter(arr => String(arr.type).includes("Rock"));

    let electric = arr.filter(arr => String(arr.type).includes("Electric"));
 
    let num = electric.map(x => x.base.Speed);
    let ave = (num.reduce((previous, current) => previous + current, 0))/num.length;

    let result = filt.filter(filt => filt.base.Speed > ave);
    result = display(result, "Speed", '');

    return result;
}//end function


/**************************************************************************** 
FUNCTION NAME:  Attack3
DESCRIPTION:    A function that takes the Pokemon data, copies it to a temp
                array to manipulate, sorts the data according to Attack
                (highest to lowest), and filters out Pokemon that have an
                Attack value that is at least 3 times greater than its 
                defense.
PARAMETERS:     data -  The original Pokemon data containing all of the 
                        information for the assignment.
RETURN VALUE:   result -    results gathered from the function, sent to a 
                            formatting function and sent back to main to get
                            displayed.
****************************************************************************/
function Attack3(data) {
    let temp = data.slice();
    const arr = temp.sort((a,b) => (a.base.Attack < b.base.Attack) ? 1: -1);

    let final = arr.filter(arr => arr.base.Attack >= (arr.base.Defense * 3));
    let result = display(final, "Attack", "Defense");

    return result;
}//end function


/**************************************************************************** 
FUNCTION NAME:  questionDisplay
DESCRIPTION:    A function that takes the arguments for the question numbers,
                displays the question number before the actual results for the 
                question, then an empty line.
PARAMETERS:     func -  This is the function that the specific question is
                        calling to be able to gather the necessary results.
                q - This is the question number that will be used in the 
                    output and display.
RETURN VALUE:   none - all output displayed to console 
****************************************************************************/
function questionDisplay(func, q) {
    console.log("Question " + q);
    console.log(func(data));
    console.log(" ");

}//end function


/**************************************************************************** 
FUNCTION NAME:  display
DESCRIPTION:    A function that takes the necessary results from all the 
                different questions functions and maps the data into a nice,
                well-formatted string to send back to the questions function.
PARAMETERS:     found - an array of the necessary results for each question
                        that will be used to map out a well-formatted string.
                query1 -    The first specific attribute that will be used 
                            to show what the figures are part of when 
                            displaying the output.
                query2 -    The second specific attribute that will be used 
                            to show what the figures are part of when 
                            displaying the output. If there is only one
                            (query1), then this will be ''.
RETURN VALUE:   final - this is an array that is being returned from being
                        mapped out for formatting. This uses .join() to pull
                        the lines out of the array and to match the given
                        output.
****************************************************************************/
function display(found, query1, query2) {
    if (query2 != '') {
        let final = found.map(x => x.name.english + 
                            "(" + query1 + ": " + x.base[query1] + 
                            ", " + query2 + ": " +x.base[query2] + ")");
        return final.join('\n');            
   }//end if
    else {
        let final = found.map(x => x.name.english + "(" + query1 + ": " + x.base[query1] + ")");
        return final.join('\n');
    }//end else
    
}//end function

Main();