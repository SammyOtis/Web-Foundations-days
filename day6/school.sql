-- Disable foreign key checks while resetting tables
PRAGMA foreign_keys = ON;

-- Clean up existing tables if re-running script
DROP TABLE IF EXISTS enrolments;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS courses;

-- 1. CREATE TABLES

-- Students Table
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_code TEXT NOT NULL UNIQUE,
    course_name TEXT NOT NULL,
    credits INTEGER NOT NULL
);

-- Enrolments Join Table
CREATE TABLE enrolments (
    enrolment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade TEXT,
    enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    UNIQUE (student_id, course_id) -- Prevents duplicate enrolments for the same course
);


-- 2. INSERT SAMPLE DATA

-- Insert at least 3 students
INSERT INTO students (first_name, last_name, email) VALUES
('Alice', 'Smith', 'alice.smith@example.com'),
('Bob', 'Jones', 'bob.jones@example.com'),
('Charlie', 'Brown', 'charlie.brown@example.com'),
('Diana', 'Prince', 'diana.prince@example.com'); -- Student with no enrolments

-- Insert at least 3 courses
INSERT INTO courses (course_code, course_name, credits) VALUES
('CS101', 'Introduction to Computer Science', 4),
('MATH201', 'Calculus I', 3),
('ENG102', 'Academic Writing', 3);

-- Insert at least 5 enrolments
INSERT INTO enrolments (student_id, course_id, grade) VALUES
(1, 1, 'A'),  -- Alice enrolled in CS101
(1, 2, 'B+'), -- Alice enrolled in Calculus I
(2, 1, 'B'),  -- Bob enrolled in CS101
(2, 3, 'A-'), -- Bob enrolled in Academic Writing
(3, 2, 'C+'); -- Charlie enrolled in Calculus I


-- 3. FIVE REQUIRED QUERIES

-- Query 1: All courses for one student (by name: Alice Smith)
SELECT 
    s.first_name, 
    s.last_name, 
    c.course_code, 
    c.course_name, 
    e.grade
FROM students s
JOIN enrolments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE s.first_name = 'Alice' AND s.last_name = 'Smith';

-- Query 2: All students on one course (by course code: CS101)
SELECT 
    c.course_code, 
    c.course_name, 
    s.first_name, 
    s.last_name, 
    s.email, 
    e.grade
FROM courses c
JOIN enrolments e ON c.course_id = e.course_id
JOIN students s ON e.student_id = s.student_id
WHERE c.course_code = 'CS101';

-- Query 3: The number of students per course
SELECT 
    c.course_code, 
    c.course_name, 
    COUNT(e.student_id) AS student_count
FROM courses c
LEFT JOIN enrolments e ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_code, c.course_name;

-- Query 4: Students who have no enrolments
SELECT 
    s.student_id, 
    s.first_name, 
    s.last_name, 
    s.email
FROM students s
LEFT JOIN enrolments e ON s.student_id = e.student_id
WHERE e.enrolment_id IS NULL;

-- Query 5: Update of one enrolment's grade (updating Charlie's MATH201 grade from C+ to B)
UPDATE enrolments
SET grade = 'B'
WHERE student_id = 3 AND course_id = 2;

-- Verify update result
SELECT * FROM enrolments WHERE student_id = 3 AND course_id = 2;