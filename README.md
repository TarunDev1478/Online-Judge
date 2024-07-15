# Coding Judge: A Platform for Competitive Coding

Our Online Judge platform is an advanced and user-friendly system designed to facilitate coding practice and competitive programming. It offers an extensive problem set that spans from basic exercises to complex algorithmic challenges, catering to programmers of all skill levels. Users can submit their solutions in multiple programming languages and receive real-time feedback on correctness and efficiency through an automated evaluation system. Key features include detailed result analysis, comprehensive test cases, and a variety of difficulty levels, ensuring a thorough and engaging coding experience. Whether you're honing your skills, preparing for competitions, or simply enjoying the art of problem-solving, our platform provides the tools and environment to support your journey in the world of programming.

## Features

- **Extensive Problem Library**: Wide range of problems from beginner to advanced levels.
- **User Progress Dashboard**: Track your progress and performance over time.
- **Solution Submissions**: Submit solutions in multiple programming languages and receive instant feedback.
- **Built-In Test Cases**: Comprehensive and varied test cases to evaluate your solutions thoroughly.
- **Competitive Problems**: Participate in problems designed for competitive programming and improve your skills.
- **Code Editor**: Integrated code editor with syntax highlighting and autocompletion.
- **Problem Tags**: Filter problems by tags such as data structures, algorithms, and difficulty levels.
- **Achievements and Badges**: Earn badges and achievements as you solve problems and participate in contests.
- **Profile Customization**: Personalize your profile and showcase your achievements and skills.

## Getting Started

1. **Sign Up**: Create an account to get started.
2. **Explore Problems**: Browse through the extensive problem library and choose problems to solve.
3. **Submit Solutions**: Write and submit your solutions using the built-in code editor.
4. **Track Progress**: Use the dashboard to track your progress and improve over time.

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
```
## Community and Support

- **Discussion Forums**: Join the community to discuss problems, share solutions, and learn from others.
- **Support**: Contact our support team for any help or queries.
- **Blog**: Read articles and tutorials on coding and problem-solving techniques.

## Contributing

We welcome contributions from the community. If you have suggestions or want to contribute to the platform, please reach out to us.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Happy Coding! 🚀
