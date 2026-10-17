# Library Books REST API Design

A RESTful API specification for managing library book resources.

## Endpoints

- **List all books**
  - **Method:** `GET`
  - **Path:** `/api/books`
  - **Description:** Retrieves a list of all available books in the library catalog.
  - **Success Status Code:** `200 OK`

- **List books by author**
  - **Method:** `GET`
  - **Path:** `/api/books?author={authorName}`
  - **Description:** Retrieves all books written by a specific author using a query parameter.
  - **Success Status Code:** `200 OK`

- **Get one book**
  - **Method:** `GET`
  - **Path:** `/api/books/:id`
  - **Description:** Retrieves detailed information for a single book identified by its unique ID.
  - **Success Status Code:** `200 OK`

- **Create a book**
  - **Method:** `POST`
  - **Path:** `/api/books`
  - **Description:** Adds a new book entry to the library catalog.
  - **Example Request Body:**
    ```json
    {
      "title": "The Pragmatic Programmer",
      "author": "Andrew Hunt",
      "isbn": "978-0201616224",
      "publishedYear": 1999
    }
    ```
  - **Success Status Code:** `201 Created`

- **Update a book**
  - **Method:** `PUT`
  - **Path:** `/api/books/:id`
  - **Description:** Updates the existing details of a specific book by its ID.
  - **Example Request Body:**
    ```json
    {
      "title": "The Pragmatic Programmer: 20th Anniversary Edition",
      "author": "Andrew Hunt",
      "isbn": "978-0135957059",
      "publishedYear": 2019
    }
    ```
  - **Success Status Code:** `200 OK`

- **Delete a book**
  - **Method:** `DELETE`
  - **Path:** `/api/books/:id`
  - **Description:** Permanently removes a book record from the library catalog by its ID.
  - **Success Status Code:** `200 OK` (or `204 No Content`)

## Common Error Codes

- **400 Bad Request**
  - **When it happens:** Triggered when a request payload is missing mandatory fields (e.g., submitting a `POST /api/books` request without a `title` or `isbn`), or when data formats are invalid.
- **404 Not Found**
  - **When it happens:** Triggered when requesting, updating, or deleting a resource that does not exist in the database (e.g., calling `GET /api/books/99999` when no book exists with ID `99999`).
