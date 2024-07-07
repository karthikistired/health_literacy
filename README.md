#### Available Scripts
# In the project directory, Open the terminal and run:
### `npm start`
# Used to run your application in development mode.
# Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting
This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size
This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App
This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration
This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment
This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify
This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### About the Health Literacy Survey project
## Description
This project is a Survey Management API built using Node.js, Express, and MongoDB. It allows users to create and manage surveys, questions, and responses. The API provides endpoints for user authentication, survey creation, question management, and response collection.
### Note checkout the comments in the project, for the developers who want to further develop it
### `npm install` or else use `nmp install --force` command
1. So if you delete the node_modules folder by mistake or by purpose, then this will help us to install all the dependencies/packages mentioned in the package.json file

### In public folder 
1. There is a set of files, along with index.html. HTML files is useful to add the script tags, link tags related to your packages like bootstrap and so on.

### In api folder
1. This is the backend framework called ExpressJS that help us to perform CRUD operations on database.
2. In this index.js file is the main file where we refer all the working of the backend operations of this project.
## 3. Process of installation
3. 1. Created a folder named api. 
3. 2. Open the terminal and run the command `npm init --y` 
3. 3. Install the dependencies using command `npm install`. So So if you delete the node_modules folder by mistake or by purpose, then this will help us to install all the dependencies/packages mentioned in the package.json file.
3. 4. Now start working on the project. For more documentation of ExpressJS visit `https://expressjs.com/` or for installing packages visit `https://www.npmjs.com/`

### In src folder
1. There are list and directories and files related to the project. It includes components of UI like NavigationBar and the source codes.
### Files:
App.css, App.jsx, App.test.js: Main application component and its styles.
Footer.jsx: Component for the footer.
Home.jsx: Home page component.
index.css, index.jsx: Entry point of the application.
NotFound.jsx: Component for handling 404 errors.
reportWebVitals.jsx, setupTests.jsx: Utility files.


## Features
- User authentication and management
- Create, update, and delete surveys
- Add, update, and delete questions within surveys
- Collect and manage responses to surveys
- Middleware for handling JSON requests and enabling CORS
- MongoDB connection for data storage

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/survey-management-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd survey-management-api
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.wdrcuup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

2. Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. The server will run on `http://localhost:5000`.

## API Endpoints

### User Routes

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user

### Survey Routes

- `GET /api/survey` - Get all surveys
- `POST /api/survey` - Create a new survey
- `PUT /api/survey/:id` - Update a survey
- `DELETE /api/survey/:id` - Delete a survey

### Question Routes

- `GET /api/questions` - Get all questions
- `POST /api/questions` - Add a new question
- `PUT /api/questions/:id` - Update a question
- `DELETE /api/questions/:id` - Delete a question

### Response Routes

- `GET /api/responses` - Get all responses
- `POST /api/responses` - Submit a response
- `DELETE /api/responses/:id` - Delete a response

## Models

### User Model

- `username` - String
- `email` - String
- `password` - String

### Survey Model

- `title` - String
- `description` - String
- `questions` - Array of Question IDs

### Question Model

- `text` - String
- `type` - String (e.g., multiple choice, text)
- `options` - Array of options (for multiple choice questions)

### Response Model

- `surveyId` - Survey ID
- `userId` - User ID
- `answers` - Array of answers

## Middleware

- `bodyParser.json()` - Parses incoming JSON requests
- `cors()` - Enables Cross-Origin Resource Sharing

## Database Connection

The project uses MongoDB Atlas for data storage. The connection URI is specified in the `.env` file.

## Acknowledgements

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Body-Parser](https://www.npmjs.com/package/body-parser)
- [CORS](https://www.npmjs.com/package/cors)

## Project Structure

The project follows a standard MVC (Model-View-Controller) architecture:

- `api/`
  - `index.js` - The main entry point of the application.
  - `routes/` - Contains route definitions for different resources.
    - `userRoutes.js` - Routes related to user operations.
    - `surveyRoutes.js` - Routes related to survey operations.
    - `questionRoutes.js` - Routes related to question operations.
    - `responseRoutes.js` - Routes related to response operations.
  - `models/` - Contains Mongoose models for different resources.
    - `user.model.js` - Mongoose model for users.
    - `survey.model.js` - Mongoose model for surveys.
    - `question.model.js` - Mongoose model for questions.
    - `response.model.js` - Mongoose model for responses.
  - `config/` - Contains configuration files.
    - `db.js` - Database configuration file.

- `src/`
  - Contains the client-side source code 
  - `afterLogin/` - Components and pages accessible after user login.
  - `beforeLogin/` - Components and pages accessible before user login.
  - `images/` - Static image assets used in the application.
  - `createFromScratch/` - Components and utilities for creating surveys from scratch.

- `public/`
  - Contains static files such as HTML, CSS, and JavaScript that are served directly to the client.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:5000`

6. **API Endpoints:**
   - Users: `http://localhost:5000/api/users`
   - Surveys: `http://localhost:5000/api/survey`
   - Questions: `http://localhost:5000/api/questions`
   - Responses: `http://localhost:5000/api/responses`



### Directories: Files inside here are all the UI components and are used for performing certain operations
afterloggin/: Contains components and features accessible after logging in.
beforeLoggin/: Components related to login and registration.
createfromscratch/: Components and utilities for creating content from scratch.
images/: Image assets used in the project.