# Online Judge Backend

This repository contains the backend code for the Online Judge platform, a system designed to facilitate coding practice and competitive programming. The backend is responsible for handling user authentication, managing problems, evaluating code submissions, and providing real-time feedback.

## Features

- **User Authentication**: Secure login and registration system.
- **Problem Management**: Create, update, and delete coding problems.
- **Real-Time Feedback**: Instant feedback on code correctness and performance.
- **User Dashboard**: Manage users, problems, and view analytics.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB.
- **JSON Web Tokens (JWT)**: For secure authentication.
- **Zod**: For input validation.

## Getting Started

Follow these steps to set up and run the backend locally.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.x or later)

### Installation

1. **Clone the repository**:
    ```sh
    git clone [https://github.com/TarunDev1478/Online-Judge]
    cd Online-Judge
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/onlinejudge
    JWT_SECRET=your_jwt_secret
    ```

### Running the Server

1. **Start MongoDB**:
    Make sure MongoDB is running. If you have MongoDB installed locally, you can start it with:
    ```sh
    mongod
    ```

2. **Run the server**:
    ```sh
    npm start
    ```

    The server should now be running on `http://localhost:5000`.

### API Endpoints

- **Auth Routes**:
  - `POST /user/auth/signup`: Register a new user.
  - `POST /user/auth/login`: Log in an existing user.
  - `POST /admin/auth/signup`: Register a new admin.
  - `POST /admin/auth/login`: Log in an existing admin.

- **Problem Routes**:
  - `POST /problems`: Create a new problem.
  - `GET /problems`: Get all problems.
  - `GET /user/problems/:id`: Get a specific problem by ID.
  - `PUT /admin/problems/:id`: Update a problem by ID.

### Testing

To run tests, use the following command:
```sh
npm test
