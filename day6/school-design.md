# School Database System Design

This document details the relational database schema design for managing students, courses, and course enrolments.

## Table Explanations

- **`students`**: Stores core information about individual students, including `first_name`, `last_name`, and a unique `email` address.
- **`courses`**: Stores available academic courses, including unique `course_code` identifiers, `course_name`, and `credits`.
- **`enrolments`**: Acts as a join table linking students to courses, storing enrolment metadata and the `grade` earned by a student in a specific course.

## Database Relationships

- **One-to-Many Relationships**:
  - One student can have multiple enrolment records (`students` -> `enrolments`).
  - One course can have multiple enrolment records (`courses` -> `enrolments`).
- **Many-to-Many Relationship**:
  - The core relationship between `students` and `courses` is **Many-to-Many**, because a student can enroll in multiple courses, and a course can contain multiple enrolled students.
- **Why a Join Table is Needed**: Relational databases cannot natively represent many-to-many relationships directly without data redundancy or normalization violations. The `enrolments` join table decomposes the many-to-many relationship into two one-to-many relationships while providing a structured location to store relationship-specific attributes like `grade` and `enrolled_at`.

## Performance Indexing

- **Index Choice**: `CREATE INDEX idx_enrolments_student_id ON enrolments(student_id);`
- **Reasoning**: In school management systems, querying all courses taken by a specific student is an extremely frequent operation. Adding a secondary B-tree index on `enrolments.student_id` eliminates full table scans when joining `students` to `enrolments`, speeding up student transcript lookups significantly as the dataset scales.

## Database Choice: SQL vs. NoSQL

I would choose a relational **SQL** database (such as PostgreSQL or SQLite) for this system. Academic course registration systems rely heavily on strict data integrity, transactional consistency (ACID compliance during registration to prevent over-enrolment), and predefined schemas. Constraints such as foreign key cascades, unique student emails, and composite unique keys preventing double enrolments are enforced at the database level in SQL. A NoSQL approach could introduce data duplication or risk orphaned records during complex queries, making SQL the superior architectural choice.
