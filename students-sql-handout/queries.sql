--------------------------------------------------------------------------------
-- Name: REILEY WALTHER
-- Professor: Dr. D Schwesinger
-- CSC 342, Spring 2022
-- Assignment 5
-- Purpose: This file contains questions and answers to different SQL questions
--          for the fifth assignment of CSC 342 - Web Technologies.
--------------------------------------------------------------------------------


--------------------------------------------------------------------------------
SELECT '
Question 1:';
-- Question 1 How many records are in the report table?
--------------------------------------------------------------------------------
--  3357 records
-- YOUR CODE HERE
    SELECT COUNT(*) FROM report;
--------------------------------------------------------------------------------
SELECT '
Question 2:';
-- Question 2: What are the first names of the students that have the last name
-- 'Parrish'?
--------------------------------------------------------------------------------
--  Krystal
--  Cedric
-- YOUR CODE HERE
    SELECT DISTINCT first_name FROM report WHERE last_name = 'Parrish';
--------------------------------------------------------------------------------
SELECT '
Question 3:';
-- Question 3: What were Cara Cain's exam grades in CSC136 030 sorted in item
-- order?
--------------------------------------------------------------------------------
--  exam|1|98.68
--  exam|2|99.98
--  exam|3|99.14
--  exam|4|100.0
-- YOUR CODE HERE
    SELECT category, item, grade FROM report WHERE first_name = 'Cara' AND 
    last_name = 'Cain' AND course = 'CSC136' AND category = 'exam' ORDER BY 
    item;
--------------------------------------------------------------------------------
SELECT '
Question 4:';
-- Question 4: What were the exam 2 grades for CSC237 020 in ascending order?
--------------------------------------------------------------------------------
--   51.49
--   61.37
--   61.71
--   66.11
--   70.02
--   73.26
--   73.47
--   74.68
--   80.01
--   80.39
--   83.14
--   85.07
--   85.5
--   85.82
--   89.46
--   94.66
--   99.89
--   100.0
-- YOUR CODE HERE
    SELECT grade FROM report WHERE course = 'CSC237' AND section = '020' AND 
    item = 2 AND category = 'exam' ORDER BY grade;
--------------------------------------------------------------------------------
SELECT '
Question 5:';
-- Question 5: How many students are there?
--------------------------------------------------------------------------------
--  291
-- YOUR CODE HERE
    SELECT count( distinct id ) FROM report;
--------------------------------------------------------------------------------
SELECT '
Question 6:';
-- Question 6: Which students in CSC125 010 received a 'B' on the first
-- homework? (Note: a B is from 83.5 to 86.49.)
--------------------------------------------------------------------------------
--    Louella|Bond
--    Neil|Valdez
-- YOUR CODE HERE
    SELECT first_name, last_name FROM report WHERE course = 'CSC125' AND 
    section = '010' AND category = 'homework' AND item = 1 AND 
    grade BETWEEN 83.5 AND 86.49;

--------------------------------------------------------------------------------
SELECT '
Question 7:';
-- Question 7: How many students are taking CSC 242?
--------------------------------------------------------------------------------
--  31
-- YOUR CODE HERE
    SELECT COUNT( distinct (first_name || last_name)) FROM report WHERE 
    course = 'CSC242';
--------------------------------------------------------------------------------
SELECT '
Question 8:';
-- Question 8: What is Sergio Valencia's average exam grade?
--------------------------------------------------------------------------------
--  79.4155555555555
-- YOUR CODE HERE
    SELECT AVG(grade) FROM report WHERE first_name = 'Sergio' AND 
    last_name = 'Valencia' AND category = 'exam';
--------------------------------------------------------------------------------
SELECT '
Question 9:';
-- Question 9: Which students received a passing exam 2 grade in CSC136 030
-- sorted by last name? (Note: a passing grade is above 60)
--------------------------------------------------------------------------------
--    Bud|Anthony
--    Gus|Barron
--    Bridget|Barry
--    Louella|Bond
--    Cara|Cain
--    Isabel|Carpenter
--    Fanny|Crosby
--    Bennett|Decker
--    Matthew|Dunn
--    Marion|Ellis
--    Priscilla|Fowler
--    Nita|Gibson
--    Vaughn|Gonzales
--    Young|Grimes
--    Charley|Hartman
--    Tracie|Higgins
--    May|Mccormick
--    Adan|Oneil
--    Krystal|Parrish
--    Cedric|Parrish
--    Timothy|Reed
--    Randal|Reilly
--    Marietta|Rollins
--    Fletcher|Rosales
--    Rita|Silva
--    Tracy|Walters
-- YOUR CODE HERE
    SELECT first_name, last_name FROM report WHERE category = 'exam' AND 
    item = 2 AND course = 'CSC136' AND section = '030' AND grade > 60 
    ORDER BY last_name;
--------------------------------------------------------------------------------
SELECT '
Question 10';
-- Question 10: What is the minimum homework grade in CSC125 010?
--------------------------------------------------------------------------------
--    48.65
-- YOUR CODE HERE
    SELECT MIN(grade) FROM report WHERE course = 'CSC125' AND section = '010' AND
    category = 'homework';
--------------------------------------------------------------------------------
SELECT '
Question 11:';
-- Question 11: What is the average exam 1 grade for all sections of CSC125?
--------------------------------------------------------------------------------
--    78.6889705882353
-- YOUR CODE HERE
    SELECT AVG(grade) FROM report WHERE category = 'exam' AND item = 1 AND 
    course = 'CSC125';
--------------------------------------------------------------------------------
SELECT '
Question 12:';
-- Question 12: Which students have a last name that starts with "W"?
--------------------------------------------------------------------------------
--    Jordan|Wynn
--    Clair|Wade
--    Trudy|Williamson
--    Velma|Williams
--    Lola|Walsh
--    Salvatore|Weiss
--    Dexter|Walter
--    Nathan|Wiggins
--    Edgardo|Webster
--    Tracy|Walters
-- YOUR CODE HERE
    SELECT distinct first_name, last_name FROM report WHERE last_name LIKE 'W%';
--------------------------------------------------------------------------------
SELECT '
Question 13:';
-- Question 13: How many homeworks were assigned in CSC 223 010?
--------------------------------------------------------------------------------
--    8
-- YOUR CODE HERE
    SELECT MAX(item) FROM report WHERE course = 'CSC223' AND section = '010' AND
    category = 'homework';
--------------------------------------------------------------------------------
SELECT '
Question 14:';
-- Question 14: How many sections of CSC135 are there?
--------------------------------------------------------------------------------
--    3
-- YOUR CODE HERE
    SELECT count(distinct section) FROM report WHERE course = 'CSC135';
--------------------------------------------------------------------------------
SELECT '
Question 15:';
-- Question 15: Which students have a first name that starts with the letter
-- "O" or ends with the letter "o" sorted by first name?
--------------------------------------------------------------------------------
--    Adolfo
--    Aldo
--    Aurelio
--    Edgardo
--    Eliseo
--    Eugenio
--    Leopoldo
--    Luciano
--    Olive
--    Porfirio
--    Rodrigo
--    Sergio
--    Waldo
-- YOUR CODE HERE
    SELECT distinct first_name FROM report WHERE first_name LIKE 'O%' OR 
    first_name LIKE '%o' ORDER BY first_name;
--------------------------------------------------------------------------------
SELECT '
Question 16:';
-- Question 16: Which students are taking CSC125 010 sorted in descending order
-- of last name?
--------------------------------------------------------------------------------
--    Neil|Valdez
--    Rocky|Spencer
--    Pearl|Shaffer
--    Gale|Pitts
--    Vivian|Patrick
--    Kirby|Parsons
--    Devin|Orr
--    Alison|Oneal
--    Reggie|Mcclure
--    Wayne|Koch
--    Bert|Knapp
--    Amie|Keith
--    Charley|Hartman
--    Nita|Gibson
--    Florence|Fulton
--    Priscilla|Fowler
--    Betty|Espinoza
--    Debora|English
--    Fanny|Crosby
--    Aldo|Cote
--    Tamara|Cochran
--    Cara|Cain
--    Noe|Burks
--    Jenna|Brown
--    Joy|Bradley
--    Louella|Bond
--    Aurelio|Best
--    Monroe|Bartlett
--    Bud|Anthony
--    Booker|Anderson
-- YOUR CODE HERE
    SELECT distinct first_name, last_name FROM report where course = 'CSC125' 
    AND section = '010' ORDER BY last_name DESC;
--------------------------------------------------------------------------------
SELECT '
Question 17:';
-- Question 17: What is the highest grade that Timothy Reed has on any grade
-- item from any course?
--------------------------------------------------------------------------------
--    72.87
-- YOUR CODE HERE
    SELECT MAX(grade) FROM report WHERE first_name = 'Timothy' AND 
    last_name = 'Reed';
--------------------------------------------------------------------------------
SELECT '
Question 18:';
-- Question 18: How many students have a 100 on at least one grade item?
--------------------------------------------------------------------------------
--    34
-- YOUR CODE HERE
    SELECT count( distinct id ) FROM report WHERE grade = 100.0;
--------------------------------------------------------------------------------
SELECT '
Question 19:';
-- Question 19: Which students failed the first exam in CSC136 010? (Note: a
-- failing grade is less than 60)
--------------------------------------------------------------------------------
--    Adolfo|Houston
--    Kirby|Parsons
--    Elias|Tyler
--    Eliseo|Morales
--    Kirby|Parsons
--    Nathan|Burns
-- YOUR CODE HERE
    SELECT first_name, last_name FROM report WHERE course = 'CSC136' AND 
    section = '010' AND category = 'exam' AND item = 1 AND grade < 60;
--------------------------------------------------------------------------------
SELECT '
Question 20:';
-- Question 20: What are the minimum, maximum, and average quiz grades for all
-- sections of CSC242?
--------------------------------------------------------------------------------
--    46.08|95.7|73.86875
-- YOUR CODE HERE
    SELECT MIN(grade), MAX(grade), AVG(grade) FROM report WHERE 
    category = 'quiz' AND course = 'CSC242';