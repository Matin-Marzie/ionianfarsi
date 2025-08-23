# IonianFarsi Backend

This is the backend for the IonianFarsi application, a platform for learning the Persian/Farsi language. It is a Node.js Express server that provides a RESTful API for managing users, lessons, sections, and vocabulary.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v14 or later)
*   [MySQL](https://www.mysql.com/)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/Matin-Marzie/ionianfarsi.git
    ```
2.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

## Running the Application

### Development

To run the server in development mode with hot-reloading, use:

```sh
npm run dev
```

The server will be available at `http://localhost:3500` by default.

### Production

To run the server in production mode, use:

```sh
npm start
```

## Environment Variables

This project uses a `.env` file to manage environment variables. Create a `.env` file in the `backend` directory and add the following variables:

```
# .env.example

# Server port
PORT=3500

# Database configuration
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=yourdatabase

# JWT secrets
ACCESS_TOKEN_SECRET=yoursecret
REFRESH_TOKEN_SECRET=yourrefreshsecret
```

*   `PORT`: The port on which the server will run.
*   `DATABASE_HOST`: The hostname of your MySQL database.
*   `DATABASE_USER`: The username for your MySQL database.
*   `DATABASE_PASSWORD`: The password for your MySQL database.
*   `DATABASE_NAME`: The name of the database to use.
*   `ACCESS_TOKEN_SECRET`: A secret key for signing access tokens.
*   `REFRESH_TOKEN_SECRET`: A secret key for signing refresh tokens.

## Project Structure

```
backend/
├── config/         # Configuration files (database, CORS)
├── controllers/    # Route handlers and business logic
├── middleware/     # Express middleware
├── models/         # Database models and queries
├── public/         # Static assets (images, audio)
├── routes/         # API route definitions
├── utils/          # Utility functions
├── validation/     # Joi validation schemas
├── views/          # HTML views for errors and root
├── package.json    # Project dependencies and scripts
└── server.js       # Application entry point
```

## API Reference

### Sections

#### Get all sections
```http
GET /api/sections
```

### Lessons

#### Get a particular lesson (Requires Authentication)
```http
GET /api/lessons?lesson_id=<lesson_id>
```
**Query Parameters:**
*   `lesson_id` (string, **required**): The ID of the lesson to fetch.

#### Get all lessons in a section
```http
GET /api/lessons?section_id=<section_id>
```
**Query Parameters:**
*   `section_id` (string, **required**): The ID of the section to fetch lessons from.

### Letters

#### Get pronunciation of each letter
```http
GET /api/letters/pronunciation
```


### Users

The base URL for user-related endpoints is `/api/users`.

#### Get all public profiles (Requires Authentication)
```http
GET /api/users
```
Returns a list of all users’ public profiles.

#### Get my private profile (Requires Authentication and Authorization)
```http
GET /api/users/me
```
Returns the authenticated user’s private profile information.

#### Update my private profile (Requires Authentication and Authorization)
```http
PUT /api/users/me
```
Updates the authenticated user’s profile fields. Only provided fields will be updated.

**Request Body:**
*   `name` (string, optional): 3-35 characters.
*   `email` (string, optional): A valid email address.
*   `experience` (number, optional): Integer >= 0.
*   `current_section` (number, optional): Integer >= 1.
*   `current_unit` (number, optional): Integer >= 1.
*   `current_repetition` (number, optional): Integer between 1-9.
*   `current_lesson` (number, optional): Integer >= 1.

#### Change my password (Requires Authentication and Authorization)
```http
PUT /api/users/me/changepassword
```
Changes the authenticated user’s password.

**Request Body:**
*   `old_password` (string, **required**)
*   `new_password` (string, **required**)

#### Change my username (Requires Authentication and Authorization)
```http
PUT /api/users/me/changeusername
```
Changes the authenticated user’s username. Requires the refresh token cookie to be sent with the request.

**Request Body:**
*   `new_username` (string, **required**): Must be different from the current username.

#### Delete my account (Requires Authentication and Authorization)
```http
DELETE /api/users/me
```
Deletes the authenticated user’s account.
&nbsp; 
&nbsp; 
&nbsp;
# under Developement routes
### Vocabulary (Requires Authentication and Authorization)

#### Get Vocabulary
```http
GET /api/vocabulary?id=<item_id>
```
**Query Parameters:**
*   `id` (string, **required**): The ID of the vocabulary item to fetch.
> **Note:** This route is currently under development.



## Testing

Tests for this application have not been implemented yet.
