-- Create Tables
CREATE TABLE students(
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR (255) NOT NULL,
    teacher_name VARCHAR (255) NOT NULL,
    grade_level VARCHAR (255),
    class_time VARCHAR (255) NOT NULL
);

CREATE TABLE master_assessment(
    assessment_id SERIAL PRIMARY KEY,
    assessment_title VARCHAR (255) NOT NULL,
    description VARCHAR (255),
    subject VARCHAR (255) NOT NULL,
    assessment_period INTEGER NOT NULL
);

CREATE TABLE master_question(
    question_id SERIAL PRIMARY KEY,
    assessment_id INTEGER REFERENCES master_assessment(assessment_id),
    description VARCHAR (255),
    subject VARCHAR (255) NOT NULL
);

CREATE TABLE assessment_score(
    student_id INTEGER REFERENCES students(student_id),
    assessment_id INTEGER REFERENCES master_assessment(assessment_id),
    score VARCHAR (255) NOT NULL,
    PRIMARY KEY (student_id, assessment_id)
);

CREATE TABLE question_score(
    student_id INTEGER REFERENCES students(student_id),
    question_id INTEGER REFERENCES master_question(question_id),
    score BOOLEAN NOT NULL,
    PRIMARY KEY (student_id, question_id)
);

--Populate Student Table
INSERT INTO students(student_id, student_name, teacher_name, grade_level, class_time)    
VALUES    
 	(DEFAULT, 'ma', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'eb', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'hc', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'ec', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'lc', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'jc', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'jd', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'le', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'ek', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'jm', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'nm', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'mn', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'ro', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'cr', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'ar', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'kr', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'bs', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'ms', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'ts', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'kt', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'kt', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'gw', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'pw', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'ew', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'oy', 'Jennica Harrison', 'Kindergarten', 'AM'),
 	(DEFAULT, 'eb', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'tb', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'bb', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'kb', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'cb', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'ec', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'ag', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'dg', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'agc','Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'jgc','Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'ah', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'aj', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'rk', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'el', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'om', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'ao', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'ap', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'es', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'rs', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'rs', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'tt', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'st', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'mt', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'xt', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'sw', 'Jennica Harrison', 'Kindergarten', 'PM'),
 	(DEFAULT, 'rm', 'Jennica Harrison', 'Kindergarten', 'PM');


-- Populate Assessment Master
INSERT INTO master_assessment(assessment_id, assessment_title, subject, assessment_period)
VALUES
    -- Period 1 ELA
    (DEFAULT, 'I can hear words that rhyme', 'ELA', 1),
    (DEFAULT, 'I can name the letters in my name out of order', 'ELA', 1),
    (DEFAULT, 'I can identify 26 letters', 'ELA', 1),
    (DEFAULT, 'I can identify 10 sounds', 'ELA', 1);

    -- Period 1 MATH
INSERT INTO master_assessment(assessment_id, assessment_title, subject, assessment_period)
VALUES    
    (DEFAULT, 'I can count to 10', 'MATH', 1),
    (DEFAULT, 'I can identify numbers 0-5', 'MATH', 1),
    (DEFAULT, 'I can count 5 objects using 1 to 1 correspondence', 'MATH', 1);


    -- Period 2
INSERT INTO master_assessment(assessment_id, assessment_title, subject, assessment_period)
VALUES    
    (DEFAULT, 'I can hear words that rhyme', 'ELA', 1),
    (DEFAULT, 'I can name the letters in my name out of order', 'ELA', 1),
    (DEFAULT, 'I can identify 26 letters', 'ELA', 1),
    (DEFAULT, 'I can identify 10 sounds', 'ELA', 1);  

INSERT INTO master_assessment(assessment_id, assessment_title, subject, assessment_period)
VALUES
    (DEFAULT, 'I can identify 26 letter names','ELA', 2),
    (DEFAULT, 'I can identify 6 sounds','ELA', 2),
    (DEFAULT, 'I can read 8 sight words','ELA', 2),
    (DEFAULT, 'I can break apart words into syllables','ELA', 2),
    (DEFAULT, 'I can identify beginning sounds of a word','ELA', 2),
    (DEFAULT, 'I can share my writing','ELA', 2),
    (DEFAULT, 'I can read a level A book fluently','ELA', 2),
    (DEFAULT, 'I can name 18 upper/lowercase letters out of order','ELA', 3),
    (DEFAULT, 'I can produce 9 sounds','ELA', 3),
    (DEFAULT, 'I can read 19 common sight words','ELA', 3),
    (DEFAULT, 'I can say a word that rhymes with my teachers word','ELA', 3),
    (DEFAULT, 'I can write the beginning sounds of words','ELA', 3),
    (DEFAULT, 'I can say the ending sound of a word','ELA', 3),
    (DEFAULT, 'I can retell the beginning, middle, and ending of a story','ELA', 3),
    (DEFAULT, 'I can name 40 upper/lowercase letters out of order','ELA', 4),
    (DEFAULT, 'I can produce 20 sounds','ELA', 4),
    (DEFAULT, 'I can read at least 22 sight words','ELA', 4),
    (DEFAULT, 'I can understand how to form an opinion and express it through writing','ELA', 4),
    (DEFAULT, 'I can read a level B book fluently','ELA', 4),
    (DEFAULT, 'I can name 52 upper/lowercase letters out of order','ELA', 5),
    (DEFAULT, 'I can produce 26 sounds','ELA', 5),
    (DEFAULT, 'I can read 32 sight words','ELA', 5),
    (DEFAULT, 'I can write the beginning, middle, and ending sounds of a word','ELA', 5),
    (DEFAULT, 'I can write a sentence','ELA', 5),
    (DEFAULT, 'I can change sounds in a word to make new words','ELA', 6),
    (DEFAULT, 'I can read a level c book fluently','ELA', 6),
    (DEFAULT, 'I can read 38 sight words','ELA', 6),
    (DEFAULT, 'I can use information to write an opinion','ELA', 6),
    (DEFAULT, 'I can gather and organize information about a topic, and use this information to write an informational piece','ELA', 6),
    (DEFAULT, 'I can participate in research and writing','ELA', 6),
    (DEFAULT, 'I can count to 20','MATH', 2),
    (DEFAULT, 'I can identify numbers 0-10','MATH', 2),
    (DEFAULT, 'I can count objects to 10 using 1:1 corresondence','MATH', 2),
    (DEFAULT, 'I can write my numbers 0-5','MATH', 2),
    (DEFAULT, 'I can sort objects into different groups by characteristics','MATH', 2),
    (DEFAULT, 'I can identify greater than/less than/equal to','MATH', 2),
    (DEFAULT, 'I can identify 2D shapes','MATH', 2),
    (DEFAULT, 'I can name 3D shapes','MATH', 3),
    (DEFAULT, 'I can count up to 10 objects in a scattered configuration','MATH', 3),
    (DEFAULT, 'I can compare and describe objects','MATH', 3),
    (DEFAULT, 'I can identify if a shape is flat or solid.','MATH', 3),
    (DEFAULT, 'I can count how many there are in each group','MATH', 3),
    (DEFAULT, 'I can sort objects into groups: flats and solids','MATH', 3),
    (DEFAULT, 'I can count to 50','MATH', 4),
    (DEFAULT, 'I can tell which number is greater than/less than','MATH', 4),
    (DEFAULT, 'I can add using objects','MATH', 4),
    (DEFAULT, 'I can subtract using objects','MATH', 4),
    (DEFAULT, 'I can show number partners of 5','MATH', 4),
    (DEFAULT, 'I can write the numbers 0-10 to show how many I see','MATH', 4),
    (DEFAULT, 'I can recognzie numbers 0-20','MATH', 5),
    (DEFAULT, 'I can write the numbers 0-20 to show how many I see','MATH', 5),
    (DEFAULT, 'I can count how many objects are in any given group up to 20','MATH', 5),
    (DEFAULT, 'I can show the tens and ones of any numbers 11-19 with drawings or by a number sentence','MATH', 5),
    (DEFAULT, 'I can count up to 70','MATH', 5),
    (DEFAULT, 'I can count to 100','MATH', 6),
    (DEFAULT, 'I can show number partners by breaking apart how many I have and record with a drawing or a number sentence','MATH', 6),
    (DEFAULT, 'I can add/subrract number combinations within 5 fluently','MATH', 6),
    (DEFAULT, 'I can add to a number (1-9), to make 10','MATH', 6),
    (DEFAULT, 'I can count to 100 by tens','MATH', 6);

SELECT count(students),  score, assessment_title
FROM master_assessment INNER JOIN assessment_score
ON master_assessment.assessment_id = assessment_score.assessment_id
INNER JOIN students ON students.student_id = assessment_score.student_id
GROUP BY sc;

SELECT count(score), assessment_title, score
FROM assessment_score  
INNER JOIN master_assessment ON master_assessment.assessment_id = assessment_score.assessment_id 
WHERE subject = 'ELA' AND assessment_period = '1'
GROUP BY assessment_title, score;
